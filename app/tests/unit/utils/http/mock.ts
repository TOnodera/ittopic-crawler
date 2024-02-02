import { http,  HttpResponse, HttpHandler } from 'msw';
import { setupServer } from 'msw/node';

const baseURL = 'http://api.private-service:3000/api-private';
const handlers: HttpHandler[] = [
  http.post(`${baseURL}/scceeded`, () => {
    return HttpResponse.json({id: 1});
  }),
];

export const server = setupServer(...handlers);