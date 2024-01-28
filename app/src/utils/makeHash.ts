import { createHash } from 'crypto';

export function makeHashFromString(content: string): string {
  return createHash('md5').update(content).digest('hex');
}
