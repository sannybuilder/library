This command stores a vehicle handle along with the additional parameters into a special array in order to check if it is stuck. The game is constantly checking whether all the vehicles from this array meet the requirements. The `vehicle` is marked as stuck if it does not travel minimum `distance` set as the second parameter for the specified amount of `time` set as the third parameter. If the vehicle is destroyed, it is removed from the stuck cars array. The stuck cars array can hold up to `6` vehicle handles.