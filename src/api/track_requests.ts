import { Request } from '@/api/request';

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
    public url = '/track/' + id + '/medium',
    public method = 'get',
    public headers = { Accept: 'application/json' }
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
