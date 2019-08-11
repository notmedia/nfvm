export enum SwitchMode {
  DEFAULT = 'default',
  SYMLINK = 'symlink',
}

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
};
