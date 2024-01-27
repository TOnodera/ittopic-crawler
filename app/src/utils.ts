import pino from 'pino';

export const logger = pino.pino({
  level: 'debug',
});
