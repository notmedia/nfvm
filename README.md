<p align="center">
  <img src="doc/img/logo.png">
</p>
<p align="center">
  <b> Node File Version Manager </b>
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nfvm"><img src="https://img.shields.io/npm/v/nfvm?color=50C72B&label=npm-version&style=flat-square" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/nfvm"><img src="https://img.shields.io/npm/dt/nfvm.svg?style=flat-square"></a>
  <a href="https://app.codacy.com/app/notmedia/nfvm"><img src="https://img.shields.io/codacy/coverage/a81842a26143458abc7764c091c3f697/v0.3?style=flat-square"></a>
  <a href="https://app.codacy.com/app/notmedia/nfvm"><img src="https://img.shields.io/codacy/grade/a81842a26143458abc7764c091c3f697.svg?style=flat-square"/></a>
  <img src="https://img.shields.io/github/license/notmedia/nfvm?color=50C72B&style=flat-square">
</p>

<img src="https://github.com/notmedia/nfvm/workflows/test/badge.svg">

## Installing
```bash
$ npm i nfvm -g
```

## Concept

While writing code I often run into problem of fast switching between versions of local files which are ignored by git. This files for security reason can't be in repository or they are individual for each server or app configuration.
So when I want to start/test app in needed config (with specific set of files) the switching process is too slow.

The **nfvm** tool solves the problem of my daily pain.
## Terminology
### Pack
Is a set of files for the project or the part of it. Every file in this pack can have as many versions as you want.  
For comfort controll of file versioning you can apply version **ONLY** for the pack. So when version of pack changes, all files in this pack switches to version of pack.

| Parameter     | Type    | Description                              | Default Value|
|---------------|---------|------------------------------------------|--------------|
|alias|string|pack name|''|
|version|string|name of current version|default|
|availableVersions|string[]|array of available pack versions|[]|
|files|File[]|array of `File` objects|[]|
### File
| Parameter     | Type    | Description                              | Default Value|
|---------------|---------|------------------------------------------|--------------|
|filename|string|the name of file in destination folder|''|
|path|String|path to destination folder|''|
|removeIfVersionNotExists|Boolean|if true then when file version does not exists removes the old version of file from the destination directory. Otherwise the old version stays.|true|
|mode|string|switch file mode, can be `symlink` or `mv`. In symlink mode tool creates `symlink` to file version in destination folder. In `mv` mode tool simply moves file in destination folder.|'symlink'|
|versions|FileVersion[]|`File Version` objects|[]|

### File Version
| Parameter     | Type    | Description                              | Default Value|
|---------------|---------|------------------------------------------|--------------|
|alias|string|file version alias (also should be in Pack.versions)|''|
|path|string|path to file|''|
