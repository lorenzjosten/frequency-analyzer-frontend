import { Request } from '@/api/request';
import { ResponseType } from 'axios';

export class Find implements Request {
  constructor(
    id: number,
    public url = '/track/' + id,
    public method = 'get',
    public headers = { Accept: 'application/json' }
  ) {}
}

export class Data implements Request {
  constructor(
    id: number,
    public url = '/track/' + id + '/data',
    public method = 'get',
    public headers = { Accept: 'application/octet-stream' },
    public responseType = 'arraybuffer' as ResponseType
  ) {}
}

export class Delete implements Request {
  constructor(
    id: number,
    public url = '/track/' + id,
    public method = 'delete',
    public headers = { Accept: 'application/json' }
  ) {}
}

export class Create implements Request {
  constructor(
    public data: FormData,
    public url = '/upload',
    public method = 'post',
    public headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  ) {}
}

export class StartAnalysis implements Request {
  constructor(
    trackId: number,
    public url = '/power-spectrum/start-analysis/' + trackId,
    public method = 'get',
    public headers = { Accept: 'application/json' }
  ) {}
}

export class StopAnalysis implements Request {
  constructor(
    analysisId: number,
    public url = '/power-spectrum/stop-analysis/' + analysisId,
    public method = 'get',
    public headers = { Accept: 'application/json' }
  ) {}
}
