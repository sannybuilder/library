This command connects the object to the LOD object. Objects created by the script (e.g. CREATE_OBJECT) do not have an LOD associated to it, even if the object was assigned an LOD in the IPL file. The object is normally the one seen up close and its LOD is normally the one seen far away.  
  
The command adds a new entry to the **TheScripts::ScriptConnectLodsObjects** list. Deleting the object(s) does not remove their record from the list! The list is saved in the save game file and processed after the game loads, causing crashes if the object(s) no longer exists!  
By default, there is no way to remove record from the list. If an object with a registered LOD has to be removed, the **TheScripts::ScriptConnectLodsObjects** list entry must be removed manually with memory commands.
