import { Core } from '../interfaces';

export async function setVersion(pack: Core.Pack, version: string): Promise<Core.Pack> {
  if (!pack.availableVersions || !pack.availableVersions.includes(version)) {
    throw new Error('Version does not exists.');
  }

  if (pack.files && pack.files.length) {
    await Promise.all(pack.files.map(file => setFileVersion(file, version)));
  }

  return {
    ...pack,
    version,
  };
}

export async function setFileVersion(_file: Core.File, _version: string) {}
