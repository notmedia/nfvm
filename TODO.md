# TODO List:

[x] Add progress info on switching version

**v0.2**

- ! use another args parser instead of caporal bcs its too slow.. Thinking about yargs.

- Create packs/files from folder

SYNC:
- Checksum version comparing on change?
- Option to check that pack version applied correctly (sync function?)
- Update files in work dir when add new file  
  This means add this new file of current version to work dir. Like sync function.
- Add sync command to pack

- Add version to pack when adding new version for file and this version does not exists.
- Update file version paths.  
  Idea: when user creates pack on first PC and move project to the second PC, paths to files may be incorrect. Add option to update this paths automatically.
- Add more info in list command.
- Add alias to version, file? Because sometimes filename too long
- Ability to use id's for packs and files
- Option to remove files from folder when removing pack/file/version

****
- Add completion to cli commands

- API + documentation
- Add additional options to get stream/buffer of file.

- Tests