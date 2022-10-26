export default interface TimedPowerSpectrum {
  trackId: number;
  time: number;
  frequencies: Array<number>;
  amplitudes: Array<number>;
  peakAt: number;
}
