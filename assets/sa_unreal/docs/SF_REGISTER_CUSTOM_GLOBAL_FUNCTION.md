* label must contain the function's body
* If the name was already registered:
    * The registration is cancelled then evaluates as logical false if used as a condition
    * Separately execute SF_UNREGISTER_CUSTOM_GLOBAL_FUNCTION first before executing this command
* All functions registered by this command must have **SF_CUSTOM_GLOBAL_FUNCTION_RETURN** command as returning statement to the foreign callee. Can be in tandem with **CLEO_RETURN** command as conditional returning statement for **Hybrid Functions**(Function that can act like a Local Function or a Custom Global Function).