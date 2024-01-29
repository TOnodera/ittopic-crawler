import { DateTime, DateTimeJSOptions, Settings } from 'luxon';

export const localNow = (opts?: DateTimeJSOptions) => {
  return DateTime.local(opts);
};
