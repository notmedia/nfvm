<div align="center">
  <img src="img/logo.png">
</div>

This tool is being developed, so wait some time please :)

### Concept

While writing code I often run into problem of fast switching between versions of local files which are ignored by git. This files for security reason can't be in repository or they are individual for each server.
So when I want to start/test app in needed config (with specific set of files) the switching process is too slow.

The **nfvm** tool - is the first try to solve the problem of my daily pain.

While planning how would it work, I thought that sometimes (I didn't have this case in real life, but probably it can be) we need to control version of local files from our code, therefore it is a good idea to write an API. 

### Installing nfvm
```bash
$ npm install nfvm -g
```
### CLI commands
  - :white_check_mark: `init` - creates local .nfvmrc.json config file
  - :white_check_mark: `create <pack>`
    - :white_check_mark: `-f, --file` - creates file for pack
    - :white_check_mark: `-v, --version <version>` - creates version of pack or file
    - `--folder <path>` - if specified creates pack from folder  
        Pack folder structure
        ```
          -pack
          --version1
          ---file1
          ---file2
          --version2
          ---file2
        ```    
    - `-g, --global` - create in global
  - `remove <pack>` - removes pack
    - `-f, --file <name>` - remove file from pack
    - `-v, --version <version>` - removes version of pack or file
    - `-g, --global` - removes from global
  - `set <pack> <version>`
    - `-g, --global` - sets in global
  - :white_check_mark: `list`
    - `-p, --pack <pack>` - files list in pack
    - `-g, --global` - list from global

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
- **API**
  When app starts from cmd the nfvm changes files in destination folders.
  When app works in API mode (when using nfvm from code), I think this is a good idea for return stream/buffer of requested version of file, without changing file in destination folder.
  Think about this differences, is it normal? Or add additional options to get stream/buffer.
- **SHA version comparing on change?**
- **Add completion to cli commands**
- **Create readme**
  - User guide
  - API documentation
