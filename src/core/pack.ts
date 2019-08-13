import { Core } from '../interfaces';

export function setVersion(pack: Core.Pack, version: string): Core.Pack {
  if (!pack.availableVersions.includes(version)) {
    throw new Error('Version does not exists.');
  }

  return {
    ...pack,
    version,
  };
}
