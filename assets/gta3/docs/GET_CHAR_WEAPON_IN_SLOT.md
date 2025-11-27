This command returns the weapon type, ammo count, and model id for the weapon in a character's weapon slot. The model index corresponds to the model id defined in the `weapon.dat` file. If the slot is empty, the command returns `0` for the weapon type and `-1` for the model.

Despite the command’s name, the game does not use the WeaponSlot enum directly. Instead, the slot index must be provided as WeaponSlot+1. For example, for the melee slot, use `2` (WeaponSlot.Melee + 1).
