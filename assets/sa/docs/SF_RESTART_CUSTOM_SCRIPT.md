Use this command with caution. The game will crash if the specified address isn't a Custom Script Binary.

The args parameter are optional and can be used to set the initial values for the local variables of the new custom script. For example:
* `SF_RESTART_CUSTOM_SCRIPT {address} csPtr {args} 100 13.42 0x42352 18@` will start the custom script with `0@ = 100`, `1@ = 13.42`, `2@ = 0x42352`, and `3@ = restarter's 18@ value`.

To terminate a custom script, either SF_TERMINATE_CUSTOM_SCRIPT or TERMINATE_ALL_CUSTOM_SCRIPTS_WITH_THIS_NAME can be used.