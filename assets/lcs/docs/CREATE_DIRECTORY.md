If path is not absolute or not starts with CLEO5 virtual path prefix then final path will be resolved using script's current working directory. See SET_CURRENT_DIRECTORY.
Opcode is able to create only one directory at the time. To create directory tree CREATE_DIRECTORY has to be called for each element.
