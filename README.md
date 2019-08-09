<p align="center">
  <img src="doc/img/logo.png">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nfvm"><img src="https://img.shields.io/npm/v/nfvm.svg?style=flat-square" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/nfvm"><img src="https://img.shields.io/npm/dt/nfvm.svg?style=flat-square"></a>
  <a href="https://app.codacy.com/app/notmedia/nfvm"><img src="https://img.shields.io/codacy/grade/a81842a26143458abc7764c091c3f697.svg?style=flat-square"/></a>
</p>

## NFVM - Node File Version Manager
## Concept

While writing code I often run into problem of fast switching between versions of local files which are ignored by git. This files for security reason can't be in repository or they are individual for each server.
So when I want to start/test app in needed config (with specific set of files) the switching process is too slow.

The **nfvm** tool - is the try to solve the problem of my daily pain.
## Terminology
### Pack
Is a set of files for the project or the part of it. Every file in this pack can have as many versions as you want.  
For comfort controll of file versioning you can apply version **ONLY** for the pack. So when version of pack changes, all files in this pack switches to version of pack.

| Parameter     | Type    | Description                              | Default Value|
|---------------|---------|------------------------------------------|--------------|
|name|String|pack name|''|
|defaultVersion|String|name of default version|default|
|currentVersion|String|name of current version|default|
|versions|String[]|array of registered pack versions|[]|
|files|File[]|array of `File` objects|[]|
### File
| Parameter     | Type    | Description                              | Default Value|
|---------------|---------|------------------------------------------|--------------|
|filename|String|the name of file in destination folder|''|
|destinationPath|String|full path to destination folder|''|
|removeFileIfVersionNotExists|Boolean|if true then when file version does not exists removes the old version of file from the destination directory. Otherwise the old version stays.|true|
|symlink|Boolean|if true then creates symlink to file version in destination directory instead of replacing it.|true|
|versions|FileVersion[]|array of `File Version` objects|[]|

### File Version
| Parameter     | Type    | Description                              | Default Value|
|---------------|---------|------------------------------------------|--------------|
|name|String|file version name (also should be in Pack.versions)|''|
|path|String|full path to file|''|

## Installing nfvm
```bash
$ npm i nfvm -g
```
