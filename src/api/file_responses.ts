import { Response } from '@/api/response';
import Track from '@/model/track';

export type Find = Pick<Response<Track>, 'data'>;

export type FindAll = Pick<Response<Track[]>, 'data'>;

export type Create = Pick<Response<Track>, 'data'>;
