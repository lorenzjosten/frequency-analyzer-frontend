<script setup lang="ts">
import { reactive, watch, ref, onMounted, onBeforeUnmount } from 'vue';
import TimedPowerSpectrum from '@/model/timed_power_spectrum';
import * as Events from '@/api/events';
import * as Plotly from 'plotly.js-basic-dist';
import { computed } from '@vue/reactivity';

const chart = ref<HTMLDivElement>();
const analysisStarted = ref(false);
const timedPowerSpectrumSeries = reactive(new Array<TimedPowerSpectrum>())

const currentSpectrum = computed(() => {
    const outdated = timedPowerSpectrumSeries.findIndex(spectrum => spectrum.time >= props.trackPlayTime)
    timedPowerSpectrumSeries.splice(0, outdated)
    return timedPowerSpectrumSeries.shift()
})

const props = defineProps({
    trackId: {
        type: Number,
        required: false
    },
    trackPlayTime: {
        type: Number,
        required: true
    },
    startAnalysis: {
        type: Boolean,
        required: true
    },
    stopAnalysis: {
        type: Boolean,
        required: true
    }
})

onMounted(() => intializeChart())

onBeforeUnmount(() => stopAnalysis())

const emit = defineEmits(['analysis-started'])

watch(() => props.startAnalysis, (shouldStart) => {
    if (shouldStart) startAnalysis()
})

watch(() => props.stopAnalysis, (shouldStop) => {
    if (shouldStop) stopAnalysis()
})

watch(() => analysisStarted.value, (hasStarted) => {
    emit('analysis-started', hasStarted)
})

watch(() => props.trackPlayTime, () => {
    if (currentSpectrum.value && chart.value) {
        const max = currentSpectrum.value.peakAt
        Plotly.relayout(chart.value, { shapes: [{ type: 'line', x0: max, y0: 0, x1: max, y1: 1, line: { width: 1, color: 'red' } }] })
        Plotly.restyle(chart.value, { x: [currentSpectrum.value.frequencies] })
        Plotly.restyle(chart.value, { y: [currentSpectrum.value.amplitudes] })
    }
})

let source: EventSource | undefined = undefined

async function intializeChart() {
    const config: Partial<Plotly.Config> = { responsive: true }
    const trace: Plotly.Data = { type: 'scatter', mode: 'lines' }
    const layout: Partial<Plotly.Layout> = { 
        title: "Power Spectrum", 
        xaxis: { title: "frequency [Hz]", rangemode: 'nonnegative' }, 
        yaxis: { title: "Amplitude [a.u.]", rangemode: 'nonnegative', showticklabels: false } 
    }

    if (chart.value) Plotly.newPlot(chart.value, [trace], layout, config)
}

async function startAnalysis() {
    stopAnalysis()

    if (props.trackId) {
        source = Events.powerSpectra(props.trackId, (newSpectrum: TimedPowerSpectrum) => {
            if (props.trackId && newSpectrum.trackId == props.trackId) {
                analysisStarted.value = true
                timedPowerSpectrumSeries.push(newSpectrum)
            }
        })
    }
}

async function stopAnalysis() {
    analysisStarted.value = false

    source?.close()

    timedPowerSpectrumSeries.splice(0, timedPowerSpectrumSeries.length)

    intializeChart()
}
</script>

<template>
    <div class="chart d-inline-flex d-fill" ref="chart" id="chart" />
</template>