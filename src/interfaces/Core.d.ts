export declare type Pack = {
  alias: string|string[];
  version: string;
  files: File[];
  availableVersions: string[];
};

export declare type File = {
  filename: string;
  path: string;
  symlink: boolean;
  removeIfVersionNotExists: boolean;
};
