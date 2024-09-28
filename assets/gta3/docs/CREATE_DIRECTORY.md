If path is not absolute or not starts with CLEO5 virtual path prefix then final path will be resolved using srcipt's current working directory. See set_current_directory.
Opcode is able to create only one directory at the time. To create directory tree create_directory has to be called for each element.
