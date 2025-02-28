* Can be used as a condition which evaluated as true if the 3D Text has been created
* color variable must be in 0xAARRGGBB format.
* If this 3D text is attached to something, then the coord variables (coordx, coordy, coordz) must be offsets relative to this entity's position.
* If this 3D text isn't attached to something, then the coord variables (coordx, coordy, coordz) must be the 3D coordinates at the world where we want it to appear.
* if this 3D text isn't attached to a player, then attachedplayerid must set to -1
* if this 3D text isn't attached to a car, then attachedcarid must set to -1