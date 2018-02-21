# :traffic_light: Node File Version Manager

#### TODO:
- **Plan config file structure**
  
  ```json
  {
    "packs": [{
      "name": "String",
      "defaultVersion": "String",
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

- **Commands**
  - Config
    - init
  - Pack
    - new
    - remove
    - set
  - File
    - add
    - remove
- **Config file support**
- **API for use from code**
  When app starts from cmd the nfvm changes files in destination folders.
  When app works in API mode (when using nfvm from code), I think this is a good idea for return stream/buffer of requested version of file, without changing file in destination folder.
  Think about this differences, is it normal?
- **Create readme**
  - Instalation guide
  - User guide
