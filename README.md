<p align="center">
  <img src="img/logo.png">
</p>
<p align="center">
  <a href="https://www.npmjs.com/package/nfvm"><img src="https://img.shields.io/npm/v/nfvm.svg?style=flat-square" alt="NPM version"></a>
  <a href="https://www.npmjs.com/package/nfvm"><img src="https://img.shields.io/npm/dt/nfvm.svg?style=flat-square"></a>
  <a href="https://app.codacy.com/app/notmedia/nfvm"><img src="https://img.shields.io/codacy/grade/a81842a26143458abc7764c091c3f697.svg?style=flat-square"/></a>
</p>

## NFVM - Node File Version Manager
### Concept

While writing code I often run into problem of fast switching between versions of local files which are ignored by git. This files for security reason can't be in repository or they are individual for each server.
So when I want to start/test app in needed config (with specific set of files) the switching process is too slow.

The **nfvm** tool - is the first try to solve the problem of my daily pain. 

### Installing nfvm
```bash
$ npm install nfvm -g
```
### CLI commands
  - :white_check_mark: `init` - create local .nfvmrc.json config file
  - :white_check_mark: `create <packname>`
    - :white_check_mark: `-f, --file <filename>` - create file
    - :white_check_mark: `-v <version>` - create version of pack or file
    - `--folder <path>` - create from folder  
        Pack folder structure
        ```
          -pack
          --version1
          ---file1
          ---file2
          --version2
          ---file2
        ```    
    - :white_check_mark: `-g, --global` - create in global
  - :white_check_mark: `remove <packname>` - remove pack
    - :white_check_mark: `-f, --file <filename>` - remove file
    - :white_check_mark: `-v <version>` - remove version of pack or file
    - :white_check_mark: `-g, --global` - remove from global
  - :white_check_mark: `set <packname> <version>`
    - :white_check_mark: `-g, --global` - sets in global
  - :white_check_mark: `list`
    - :white_check_mark: `-p, --pack <packname>` - files list in pack
    - :white_check_mark: `-g, --global` - list from global

### .nfvmrc.json structure:

  ```json
  {
    "packs": [{
      "name": "String",
      "defaultVersion": "String",
      "currentVersion": "String",
      "versions": "String[]",
      "removeFileIfVersionNotExists": "Boolean",
      "files": [{
        "filename": "String",
        "destinationPath": "String",
        "versions": [{
          "name": "String",
          "sourcePath": "String",
        }]
      }]
    }]
  }
  ```

### TODO
- **Ability to use id's for packs and files**
- **Option to remove files from folder when removing pack/pack version, file/file version**
- **Show warning on create when pack/file/version exists**
- **Destination path save like path to dir instead of path to file?**
- **Add constants file**
- **API**  
  - Add additional options to get stream/buffer of file.
- **SHA version comparing on change?**
- **Add completion to cli commands**
- **Write tests**
- **Create readme**
  - User guide
  - API documentation
