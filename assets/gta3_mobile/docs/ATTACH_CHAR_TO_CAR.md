This command attaches the character to the vehicle. The weapon with `30,000` ammo is given to the character. The weapon must be loaded, usually through REQUEST_MODEL, in order for the weapon to appear. If used on the player character, it will place the player into first-person view. The range denotes the horizontal axis that the character can shoot from the direction it faces. For example, a value of `90.0` means the character can shoot up to `90` degrees to the left and up to `90` degrees to the right of its facing direction, for a total of `180` degrees movement. A range of `180.0` allows full `360` degrees movement. The following is a table of values denoting the direction the character faces relative to the vehicle. Any values outside the range will always point the character forward.

| Facing | Enum           |
| ------ | -------------- |
| 0      | FACING_FORWARD |
| 1      | FACING_LEFT    |
| 2      | FACING_BACK    |
| 3      | FACING_RIGHT   |

The character remains upright relative to the vehicle and will roll with the vehicle. If the character is killed, it will not drop any items and its collision remains unless the body touches the ground. Bullets fired by the character do not damage the vehicle but they do not go through it. For the player, weapons that do not fire single bullets behave oddly. Shotguns and the Flamethrower cannot be aimed along the vertical axis. The Rocket Launcher and sniper rifles do not work at all. Projectiles like grenades and Molotov Cocktail can be thrown at a very fast rate.
