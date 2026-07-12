This command returns the address of a running script whose name, set with SCRIPT_NAME, matches the given string. Matching is case-insensitive. The command scans both game scripts and custom CLEO scripts. The address will be a valid pointer to a `CRunningScript` structure.

If no script is found, it returns 0.