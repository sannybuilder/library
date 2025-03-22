* The handle parameter can be set to any constant value if the SfTimer object's handle isn't needed to be retrieved. Else, pass a variable to handle parameter:
  * `SF_CREATE_TIMER {interval} 500 {callback} @TimerCallback_DoSomething {handleTo} 0 // legacy syntax` creates an SfTimer **without** retrieving its handle
  * `5@ = SF_CREATE_TIMER {interval} 500 {callback} @TimerCallback_DoSomething` creates an SfTimer then stores the handle to **5@**
* The callback parameter must be an offset label. For example, **@TimerCallback_DoSomething**
* The callback label must contain the callback's body.
* Construct the callback's flow of execution with caution.
  * Like subroutines, callbacks uses the variable space of the script's main thread.
  * Callbacks have higher priority than the custom script's main thread. Meaning, eveytime the script encounters the **WAIT** command at the main thread, the script will execute all callbacks first(if interrupt flag was fired by a callback), then continues to execute the main thread's commands after where the **WAIT** command was encountered.
  * Avoid executing too much commands inside the callback. Doing so would lead to undersirable script behavior, like failing to detect interrupts from other registered callbacks or event handlers.
  * **WAIT** command inside a Callback **WILL NOT WORK!** Because callbacks are designed to finish as soon as possible.
  * All callbacks hooked by this command must use **SF_COMMAND_RETURN** command as returning statement, indicating the end of callback.