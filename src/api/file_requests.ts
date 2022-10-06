import { Request } from '@/api/request';

export class Find implements Request {
  constructor(
    id: number,
    public url = '/file/' + id,
    public method = 'get',
    public headers = { Accept: 'application/json' }
  ) {}
}

export class FindAll implements Request {
  constructor(
    public url = '/file',
    public method = 'get',
    public headers = { Accept: 'application/json' }
  ) {}
}

export class Delete implements Request {
  constructor(
    id: number,
    public url = '/file/' + id,
    public method = 'delete',
    public headers = { Accept: 'application/json' }
  ) {}
}

export class Create implements Request {
  constructor(
    public data: FormData,
    public url = '/file',
    public method = 'post',
    public headers = {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data'
    }
  ) {}
}
