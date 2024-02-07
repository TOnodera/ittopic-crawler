import { HTTP_RETRY_COUNT, PRIVATE_TOKEN } from '@/config.js';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const baseURL = ['development', 'test'].includes(process.env.NODE_ENV as string)
  ? `http://${process.env.PRIVATE_API_DOMAIN_NAME}:3000/api-private/`
  : `http://${process.env.PRIVATE_API_DOMAIN_NAME}/api-private/`;
console.debug('baseURL: ', baseURL);
console.debug('NODE_ENV:', process.env.NODE_ENV);
const http = axios.create({
  baseURL,
  headers: {
    Authorization: `Bearer ${PRIVATE_TOKEN}`,
  },
});

axiosRetry(axios, { retries: HTTP_RETRY_COUNT });

export { http };
