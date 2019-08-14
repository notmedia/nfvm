'use strict';

// import { Core } from '../../interfaces';

const jsonfile: any = jest.genMockFromModule('jsonfile');

let files: any[] = [];

function __setMockFiles(mockFiles: { data: object, path: string }[]) {
  files = [];
  for (const file of mockFiles) {
    files[file.path] = file.data;
  }
}

function readFile(path: string) {
  return Promise.resolve()
    .then(() => {
      if (files[path]) {
        return files[path];
      }

      throw new Error('File does not exists');
    });
}

// async function writeFile(config: Core.Config) {}

jsonfile.__setMockFiles = __setMockFiles;
jsonfile.readFile = readFile;

export = jsonfile;
