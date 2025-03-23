Use this command with caution.
    * **Script** vs **Custom_Script** are two different types. Do not use any **Custom_Script** related commands inside the scriptLabel's body

newScriptPtrTo can be set to any constant value if this script's pointer isn't needed to be retrieved. Else, pass a variable to newScriptPtrTo parameter.
* `SF_START_NEW_SCRIPT_FROM_LABEL {scriptLabel} @MyRunnedScript {newScriptPtrTo} 0 ` Runs the script without retrieving its pointer
* `SF_START_NEW_SCRIPT_FROM_LABEL {scriptLabel} @MyRunnedScript {newScriptPtrTo} 5@` Runs the script then store its pointer to **5@**

The passedValues parameter are optional and can be used to set the initial values for the local variables of the new script. For example:
* `SF_START_NEW_SCRIPT_FROM_LABEL {scriptLabel} @MyRunnedScript {newScriptPtrTo} 0 {passedValues} 100 13.42 0x42352 18@` will start the script with `0@ = 100`, `1@ = 13.42`, `2@ = 0x42352`, and `3@ = starter's 18@ value`.

To terminate a script started by this command, use any on the following depending on the circumstances:
* TERMINATE_THIS_SCRIPT
* SF_TERMINATE_SCRIPT or TERMINATE_SCRIPT
* TERMINATE_ALL_SCRIPTS_WITH_THIS_NAME

This command has the same effect as START_NEW_SCRIPT