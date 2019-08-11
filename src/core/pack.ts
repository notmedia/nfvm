import { Core } from '../interfaces';

export function setVersion(pack: Core.Pack, version: string): Core.Pack {
  return {
    ...pack,
    version,
  };
}
