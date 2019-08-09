# User Guide

1. Clone repo.
2. Open `/doc/examples` folder

    `files/` - this folder contains files of current pack. Each version of pack have own folder with files versions. I recommend to group files by versions, like here. Or if you want to use few packs in one folder you can firstly group them by packs.

    `workflow/` - in real project it's a root folder for pack. The nfvm works with current versions here.

    `.nfvmrc.json` - config file, see [structure](https://github.com/notmedia/nfvm#config-file)

3. Open .nfvmrc.json file and replace `/path/to/repo/` to the full path of repository folder on your PC.
4. Now, you can try the nfvm tool:

Installing it:
```bash
$ npm i nfvm -g
```

Switch pack "example" version to "test":
```bash
nfvm set example test
```

All files are switched in `/doc/examples/workflow` folder.

The full list of CLI commands with examples you can see [here](https://github.com/notmedia/nfvm#cli-commands)
