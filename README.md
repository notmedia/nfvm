# :traffic_light: Node File Version Manager

### Concept

While writing code I often run into problem of fast switching between versions of local files which are ignored by git. This files for security reason can't be in repository or they are individual for each server.
So when I want to start/test app in needed config (with specific set of files) the switching process is too slow.

The **nfvm** tool - is the first try to solve the problem of my daily pain.

While planning how would it work, I thought that sometimes (I didn't have this case in real life, but probably it can be) we need to control version of local files from our code, therefore it is a good idea to write an API. 

### In work

- **Plan config file structure**

  Last version:
  ```json
  {
    "packs": [{
      "name": "String",
      "defaultVersion": "String",
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
- **CLI Commands**
  - `init` - creates local .nfvmrc.json config file
  - `list` - list all packs
  - Pack
    - `new` - creates new pack or pack version
      - `-v <version>` - if specified creates new version
      - `-f <path>` - if specified init pack from folder
        
        Pack folder structure
        ```
          -pack
          --version1
          ---file1
          ---file2
          --version2
          ---file2
        ```
    - `remove` - remove pack or pack version
      - `-v <version>` - if specified removes pack version
    - `set <version>` - set pack version
    - `list` - list of all files
    - `v` - current pack version
  - File
    - `add` - add new version of file
    - `remove` - remove file version
- **Config file support**
- **API**
  When app starts from cmd the nfvm changes files in destination folders.
  When app works in API mode (when using nfvm from code), I think this is a good idea for return stream/buffer of requested version of file, without changing file in destination folder.
  Think about this differences, is it normal? Or add additional options to get stream/buffer.
- **Support .nfvmrc.json config file**
- **Create readme**
  - Instalation guide
  - User guide
  - API documentation
  