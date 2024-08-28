This command loads the texture dictionary file for use in drawing sprites on the screen. The file must have the extension `.txd` and be located in the `models\txd` folder. If the file is not physically present in this folder, the game crashes.

Maximum length of the `name` argument is `8`.

After loading the dictionary, use LOAD_SPRITE to load individual sprites.
When no longer needed, the texture dictionary can be removed through REMOVE_TEXTURE_DICTIONARY.