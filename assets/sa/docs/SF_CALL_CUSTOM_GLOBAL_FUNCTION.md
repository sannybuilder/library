* **Global Functions** only supports the legacy function syntax. Specifically:
    * SB4's `function ... end` Syntax isn't supported. Doing so would lead to undesirable results.
    * Variable Names that are autoassigned to unused local variables such as **"int iValue"** or **"float fValue"** must not be used. Instead, use local variable indexes (12@, 25@, etc) or implicitly setup your variables in legacy way:
```
// Legacy Syntax
const inputValue1=0@,inputValue2=2@,retValue1=30@,retValue2=31@
var inputValue1:int,inputValue2:float,retValue1:int,retValue2:float
```
* **Global Functions** are like Local Functions
    * Has its own local variable space.
    * Can optionally accept input parameters
    * Can optionally return output parameters
* Unlike Local Functions that can manually set logical parameter upon return via **CLEO_RETURN_WITH**, **Global Functions** doesn't support a logical parameter that can manually be set. Instead, this command does nothing if the specified name isn't a registered custom global function then evaluates as logical false if used as a condition.
* **Global Functions** specifically:
    * Requires **SF_CUSTOM_GLOBAL_FUNCTION_RETURN** command as its returning statement.
    * Can only be called using **SF_CALL_CUSTOM_GLOBAL_FUNCTION** command.
    * Crashes the game when this script(where this function is defined) executes this function via **CLEO_CALL**.