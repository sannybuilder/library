* The passed ID will act as the 3D Text's handle as well.
* If an existing 3D Text has the same ID, this command will just replace the informations of that 3D Text.
* color variable must be in 0xAARRGGBB format.
* If this 3D text is attached to something, then the coord variables (coordx, coordy, coordz) must be offsets relative to this entity's position.
* If this 3D text isn't attached to something, then the coord variables (coordx, coordy, coordz) must be the 3D coordinates at the world where we want it to appear.
* if this 3D text isn't attached to a player, then attachedplayerid must set to -1.
* if this 3D text isn't attached to a car, then attachedcarid must set to -1.