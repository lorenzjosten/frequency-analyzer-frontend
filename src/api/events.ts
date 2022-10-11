import Track from '@/model/track';

const API_URL = import.meta.env.VITE_API_URL;

export function allFiles(onMessage: (track: Track) => any): EventSource {
  const es = new EventSource(API_URL + '/track');
  es.onmessage = (msg) => {
    onMessage(JSON.parse(msg.data) as Track);
  };
  return es;
}
