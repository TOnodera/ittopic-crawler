import { HTTP_RETRY_COUNT } from '@/config.js';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const http = axios.create({
  baseURL: `http://${process.env.PRIVATE_DOMAIN_NAME}:3000/api-private/`,
});

axiosRetry(axios, { retries: HTTP_RETRY_COUNT });

export { http };
