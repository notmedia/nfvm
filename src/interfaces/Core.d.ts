export enum SwitchMode {
  MV = 'mv',
  SYMLINK = 'symlink',
}

export declare type Config = {
  packs: Pack[];
};

export declare type Pack = {
  alias: string|string[];
  version: string;
  files: File[];
  availableVersions: string[];
};

export declare type File = {
  filename: string;
  path: string;
  mode: SwitchMode;
  removeIfVersionNotExists: boolean;
  versions: FileVersion[];
};

export declare type FileVersion = {
  alias: string;
  path: string;
}