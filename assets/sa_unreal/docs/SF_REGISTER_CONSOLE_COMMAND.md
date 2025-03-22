* You must pass an offset label as the callback parameter. Like For example, **@ConsoleCallback_SetHP**
* The callback label must contain the callback's body.
* Construct the callback's flow of execution with caution.
  * Like subroutines, callbacks uses the variable space of the script's main thread.
  * Callbacks have higher priority than the custom script's main thread. Meaning, eveytime the script encounters the **WAIT** command at the main thread, the script will execute all callbacks first(if interrupt flag was fired by a callback), then continues to execute the main thread's commands after where the **WAIT** command was encountered.
  * Avoid executing too much commands inside the callback. Doing so would lead to undersirable script behavior, like failing to detect interrupts from other registered callbacks or event handlers.
  * **WAIT** command inside a Callback **WILL NOT WORK!** Because callbacks are designed to finish as soon as possible.
  * All callbacks hooked by this command must use **SF_COMMAND_RETURN** command as returning statement, indicating the end of callback.