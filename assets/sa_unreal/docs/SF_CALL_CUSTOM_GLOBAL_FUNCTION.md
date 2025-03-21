**Global Functions** are like Local Functions
* Has its own local variable space.
* Can optionally accept input parameters
* Can optionally return output parameters

Unlike Local Functions that can manually set *logical* parameter upon return via **CLEO_RETURN_WITH**, **Global Functions** doesn't support a *logical* parameter that can manually be set. Instead, this command does nothing if the specified name isn't a registered custom global function then evaluates as logical false if used as a condition.

**Global Functions** specifically:
* Requires **SF_CUSTOM_GLOBAL_FUNCTION_RETURN** command as its returning statement.
* Can only be called using **SF_CALL_CUSTOM_GLOBAL_FUNCTION** command.
* Crashes the game when this script(where this function is defined) executes this function via **CLEO_CALL**.