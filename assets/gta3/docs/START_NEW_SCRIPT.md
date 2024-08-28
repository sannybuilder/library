This command initiates the execution of a new script from a specific label.

The first argument is the offset within the main.scm from where the execution starts. Other arguments are optional and can be used to set the initial values for the local variables of the new script. For example, `START_NEW_SCRIPT label 100 200 300` will start the script with 0@ set to `100`, 1@ set to `200`, and 2@ set to `300`. The total number of extra parameters varies depending on the game, with `16` for GTA III and Vice City and `32` for San Andreas.

To terminate the script, either TERMINATE_THIS_SCRIPT or TERMINATE_ALL_SCRIPTS_WITH_THIS_NAME can be used.

This command is similar to LAUNCH_MISSION, but the latter does not allow for extra arguments.