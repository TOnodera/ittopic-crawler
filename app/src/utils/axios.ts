import { HTTP_RETRY_COUNT } from '@/config.js';
import axios from 'axios';
import axiosRetry from 'axios-retry';

const http = axios.create({
  baseURL: `http://${process.env.PRIVATE_API_DOMAIN_NAME}:${process.env.API_SERVICE_PORT}/api-private/`,
});

axiosRetry(axios, { retries: HTTP_RETRY_COUNT });

export { http };
