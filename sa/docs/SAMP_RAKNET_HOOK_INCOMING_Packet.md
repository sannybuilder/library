* The callback will intercept RakNet's attempt to store the received Packet. This gives us the priviledge to either block the received RakNet Packet, or manipulate the Packet's data before being stored in our client's samp structure.
* When a callback is hooked by this command, there is no command unhook it. You need to terminate the script were the callback label is found.
* You must pass an offset label to callbacklabel. Like For example, **@Packet_In**
* Construct the callback's flow of execution with caution.
  * Like subroutines, callbacks uses the variable space of the script's main thread.
  * Callbacks have higher priority than the custom script's main thread. Meaning, eveytime the script encounters the **WAIT** command at the main thread, the script will execute all callbacks first(if interrupt flag was fired by a callback), then continues to execute the main thread's commands after where the **WAIT** command was encountered.
  * RakNet's functionality is temporarily stopped while a RakNet callback hook is executing. Meaning, all datas that were supposed to be transmitted/received during the callback's interruption will be wasted as if they were not transmitted/received in the first place. So Avoid executing too much work inside the callback. Doing so would lead to undersirable behavior.
  * **WAIT** command inside a Callback **WILL NOT WORK!** Because callbacks are designed to finish as soon as possible.
* All callbacks hooked by this command must use **RAKNET_HOOK_RETURN** command as returning statement, indicating the end of callback.
* Can be used as a condition which evaluates as true if the hook was successful.