import { Response } from '@/api/response';
import Track from '@/model/track';

export type Find = Pick<Response<Track>, 'data'>;

export type Data = Pick<Response<ArrayBuffer>, 'data'>;

export type Create = Pick<Response<Track>, 'data'>;

export type StartAnalysis = Pick<Response<number>, 'data'>;

export type StopAnalysis = Pick<Response<void>, 'data'>;
