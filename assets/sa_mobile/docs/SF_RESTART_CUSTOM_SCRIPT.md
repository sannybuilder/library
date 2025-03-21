Use this command with caution.
    * **Script** vs **Custom_Script** are two different types. Do not use any **Custom_Script** related commands inside the scriptLabel's body

The passedValues parameter are optional and can be used to set the initial values for the local variables of the new script. For example:
* `SF_RESTART_CUSTOM_SCRIPT {address} csPtr {passedValues} 100 13.42 0x42352 18@` will start the script with `0@ = 100`, `1@ = 13.42`, `2@ = 0x42352`, and `3@ = starter's 18@ value`.

To terminate a script started by this command, use any on the following depending on the circumstances:
* TERMINATE_THIS_SCRIPT
* SF_TERMINATE_SCRIPT or TERMINATE_SCRIPT
* TERMINATE_ALL_SCRIPTS_WITH_THIS_NAME