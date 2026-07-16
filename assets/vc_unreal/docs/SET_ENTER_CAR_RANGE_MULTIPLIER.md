This command sets the range multiplier to enter a vehicle. 

The value must be a floating-point but is stored as an integer so any digits after the decimal mark will be truncated. The command has no effect on the player. By default, characters willingly wanting to enter a vehicle (like through SET_CHAR_OBJ_ENTER_CAR_AS_DRIVER) will go towards it if the vehicle is within about `30` meters. Any further and the character do not go towards the vehicle until it is placed within range. The multiplier affects this distance, meaning a value of `2.0` will allow characters who are willingly wanting to enter a vehicle to go towards it if the vehicle is within `60` meters. 

The value set by this command will carry over when loading another save game (fixed in SilentPatch). The value is reset to `1.0` when a mission cleanup is being processed.
