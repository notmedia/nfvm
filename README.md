# :traffic_light: Node File Version Manager

Changes reminder:
* Renamed termin "set of files" to "pack"

#### TODO:
- **Plan config file structure**
  
  Version 1:
   
  I think this is bad solution because with this stucture user can't use sets of files.
  ```json
    {
      "filename": "String",
      "path": "String",
      "versions": [{
        "name": "String",
        "path": "String"
      }]
    }
  ```

  Version 2:

  Idea - Use versioning for set of files and for files also.
  So, for files we have default version for apply when version
  of set changed.

  ```json
    {
      "fileSets": [{
        "setName": "String",
        "files": [{
          "filename": "String",
          "path": "String",
          "defaultVersion": "String",
          "versions": [{
            "name": "String",
            "path": "String"
          }]
        }]
      }]
    }
  ```

- **Add commands**
  - init config
  - add file
  - remove file
  - add version
  - remove version
  - select version
- **Config file support**
- **API for use from code**
  When app works in global mode when user change pack version nfvm simply changes files in destination folders.
  When app works in API mode, I think this is a good idea for return stream/buffer of requested version of file, without changing in destination folder.
  Think about this differences, is it normal?
- **Create readme**
  - Instalation guide
  - User guide
