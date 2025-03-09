* When a callback is hooked on a chatcommand, then everytime we type this chatcommand, it will not be sent to the server. To reverse this behavior, execute **SAMP_UNREGISTER_CLIENTSIDE_COMMAND** for the affected chatcommand.
* The chat command trigger text will be **/\<chatcommand\>** . For example:
  * if chatcommand = **"killme"** then you need to type **/killme** in chat
  * if chatcommand = **"/killme"** then you need to type **//killme** in chat
* You must pass an offset label to callbacklabel. Like For example, **@ChatCallback_KillMe**
* Construct the callback's flow of execution with caution.
  * Callbacks have higher priority than the custom script's main thread. Meaning, eveytime the script encounters the **WAIT** command at the main thread, the script will execute all callbacks first(if interrupt flag was fired by a callback), then continues to execute the main thread's commands after where the **WAIT** command was encountered.
  * Avoid executing too much commands inside the callback. Doing so would lead to undersirable script behavior, like failing to detect interrupts from other registered callbacks or event handlers.
  * **WAIT** command inside a Callback **WILL NOT WORK!** Because callbacks are designed to finish as soon as possible.
* All callbacks hooked by this command must use **SAMP_CMD_RET** command as returning statement, indicating the end of callback.