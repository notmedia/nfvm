# :traffic_light: Node File Version Manager

### Concept

While writing code I often run into problem of fast switching local files which are ignored by git. This files for security reason can't be in repository. Or sometimes the files are individual for each server.
So when I want to start/test in needed config (with specific set of file) the switching process is too slow.

The **nfvm** tool - is the first try to solve the problem of my daily pain.

While planning how would it work, I thought that sometimes (I didn't have this case in real life, but probably it can be) we need to control version of local files from our code, therefore it is a good idea to write an API. 

#### In work

- **Plan config file structure**

  Last version:
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

#### TODO
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
