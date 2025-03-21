newScriptPtrTo can be set to any constant value if this custom script's pointer isn't needed to be retrieved. Else, pass a variable to newScriptPtrTo parameter.
* `SF_START_NEW_CUSTOM_SCRIPT_AT_LABEL {newScriptPtrTo} 0 {scriptLabel} @MyRunnedScript` Runs the custom script without retrieving its pointer
* `SF_START_NEW_CUSTOM_SCRIPT_AT_LABEL {newScriptPtrTo} 5@ {scriptLabel} @MyRunnedScript` Runs the custom script then store its pointer to **5@**

The args parameter are optional and can be used to set the initial values for the local variables of the new custom script. For example:
* `SF_START_NEW_CUSTOM_SCRIPT_AT_LABEL {newScriptPtrTo} 0 {scriptLabel} @MyRunnedScript {args} 100 13.42 0x42352 18@` will start the custom script with `0@ = 100`, `1@ = 13.42`, `2@ = 0x42352`, and `3@ = starter's 18@ value`.

To terminate a custom script, either SF_TERMINATE_CUSTOM_SCRIPT or TERMINATE_ALL_CUSTOM_SCRIPTS_WITH_THIS_NAME can be used.

This command is similar to START_NEW_SCRIPT, but the latter are for non-cleo SCM scripts