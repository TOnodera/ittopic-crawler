import { deserialize, serialize } from 'v8';

export const clone = (object: Object): Object => {
  return deserialize(serialize(object));
};
