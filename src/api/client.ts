import axios from 'axios';
import { Request } from '@/api/request';
import { Response } from '@/api/response';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

export async function sendRequest<
  Req extends Request,
  Res extends Response<any>
>(request: Req, onSuccess: (response: Res) => any) {
  return axios
    .request(request)
    .then((response) => onSuccess(response as Res))
    .catch(console.error);
}
