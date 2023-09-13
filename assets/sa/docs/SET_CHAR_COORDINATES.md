This command teleports the character at the given location. Before doing that it checks whether the char is driving a vehicle and, if yes, it teleports the vehicle.

If the char is a leader of a group on foot, it also teleports the group (not tested). 

Additionally it: 
- automatically calculates the ground position if the Z-coord was set to `-100.0` 
- interrupts any active task
- respawns the character or the vehicle (removes and creates a new entity in the game)
- resets any speed
