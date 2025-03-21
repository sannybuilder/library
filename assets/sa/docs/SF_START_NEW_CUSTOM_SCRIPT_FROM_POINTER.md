Use this command with caution. The game will crash if scriptBin isn't a Custom Script Binary.

newScriptPtrTo can be set to any constant value if this custom script's pointer isn't needed to be retrieved. Else, pass a variable to newScriptPtrTo parameter.
* `SF_START_NEW_CUSTOM_SCRIPT_FROM_POINTER {newScriptPtrTo} 0 {scriptBin} csBin` Runs the custom script without retrieving its pointer
* `SF_START_NEW_CUSTOM_SCRIPT_FROM_POINTER {newScriptPtrTo} 5@ {scriptBin} csBin` Runs the custom script then store its pointer to **5@**

The args parameter are optional and can be used to set the initial values for the local variables of the new custom script. For example:
* `SF_START_NEW_CUSTOM_SCRIPT_FROM_POINTER {newScriptPtrTo} 0 {scriptBin} csBin {args} 100 13.42 0x42352 18@` will start the custom script with `0@ = 100`, `1@ = 13.42`, `2@ = 0x42352`, and `3@ = starter's 18@ value`.

To terminate a custom script, either SF_TERMINATE_CUSTOM_SCRIPT or TERMINATE_ALL_CUSTOM_SCRIPTS_WITH_THIS_NAME can be used.

This command is similar to SF_START_NEW_CUSTOM_SCRIPT_FROM_LABEL, but the latter requires a label offset instead of a pointer