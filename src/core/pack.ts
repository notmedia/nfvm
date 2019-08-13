import { Core } from '../interfaces';

export async function setVersion(pack: Core.Pack, version: string): Promise<Core.Pack> {
  if (!pack.availableVersions.includes(version)) {
    throw new Error('Version does not exists.');
  }

  for (const file of pack.files) {
    // TODO: Add parallel set file version
    await setFileVersion(file, version);
  }

  return {
    ...pack,
    version,
  };
}

export async function setFileVersion(_file: Core.File, _version: string) {}
