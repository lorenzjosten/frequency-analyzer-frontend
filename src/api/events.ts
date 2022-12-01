import Track from '@/model/track';
import TimedPowerSpectrum from '@/model/timed_power_spectrum';

const API_URL = import.meta.env.VITE_API_URL;

export function tracks(onMessage: (track: Track) => any): EventSource {
  const es = new EventSource(`${API_URL}/track`);
  es.addEventListener('track', (event) =>
    onMessage(<Track>JSON.parse(event.data))
  );
  return es;
}

export function powerSpectra(
  trackId: number,
  onMessage: (powerSpectrum: TimedPowerSpectrum) => any
): EventSource {
  const es = new EventSource(`${API_URL}/track/${trackId}/analyze`);
  es.addEventListener('spectrum', (event) =>
    onMessage(<TimedPowerSpectrum>JSON.parse(event.data))
  );
  es.addEventListener('close', () => es.close());
  return es;
}
