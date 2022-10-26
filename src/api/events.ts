import Track from '@/model/track';
import TimedPowerSpectrum from '@/model/timed_power_spectrum';

const API_URL = import.meta.env.VITE_API_URL;

export function tracks(onMessage: (track: Track) => any): EventSource {
  console.log("subscribing to tracks!")
  const es = new EventSource(API_URL + '/track/subscribe');
  es.onmessage = (msg) => onMessage(<Track>JSON.parse(msg.data));
  return es;
}

export function powerSpectra(
  trackId: number,
  onMessage: (powerSpectrum: TimedPowerSpectrum) => any
): EventSource {
  const es = new EventSource(API_URL + '/track/' + trackId + '/analyze');
  es.onmessage = (msg) => onMessage(<TimedPowerSpectrum>JSON.parse(msg.data));
  es.onerror = () => es.close();
  return es;
}
