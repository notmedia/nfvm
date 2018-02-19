# Node File Version Manager

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
- **Create readme**
  - Instalation guide
  - User guide
