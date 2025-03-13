* This will tell the server that our local player got killed by the specified player using a specific weapon.
* Set PlayerID = 0xFFFF to indicate that our local player died by natural means (falling, drowned/toxicated).
* Take note that this command will not actually kill our local character (Fake RPC). Use Separate command to do so, like:
    * TASK_DIE
    * EXPLODE_CHAR_HEAD