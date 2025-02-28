* This command will send SampRpc.DialogResponse to the Server as well.
* Can be used as a condition which evaluates as true if the dialog is opened before being closed by this command.
* Most servers commonly interprets:
    * buttonid = 0 as cancel/no/reject
    * buttonid = 1 as submit/yes/accept