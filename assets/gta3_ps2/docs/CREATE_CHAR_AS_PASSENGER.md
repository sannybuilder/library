Similar to CREATE_CHAR, this command creates a character in the passenger seat of a vehicle. Using this command requires an existing vehicle and REQUEST_MODEL to load the model of the character or else the game could crash. Characters can even be created in wrecked vehicles as long as the vehicle exists. Without further additions, if the player enters the vehicle with the character, the character will exit the vehicle. Additional commands like SET_CHAR_STAY_IN_CAR_WHEN_JACKED are needed to prevent them from doing that.

If you create a character in a non-existent seat, the character will still be created inside the vehicle but it will be invisible. Certain actions that would normally make the character voluntarily exit the vehicle won't work but commands can force the character to exit the vehicle.

If the pedtype is `cop` (6), the model id must one of the police enforcement models, otherwise the game will crash. Valid models are: cop, swat, fbi, army.
