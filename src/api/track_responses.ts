import { Response } from '@/api/response';
import Track from '@/model/track';
import TrackData from '@/model/track_data';

export type Find = Pick<Response<Track>, 'data'>;

export type Data = Pick<Response<TrackData>, 'data'>;

export type Create = Pick<Response<Track>, 'data'>;
