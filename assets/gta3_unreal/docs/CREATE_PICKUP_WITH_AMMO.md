This command spawns a pickup at the coordinates point that can be "collected" by the player. It is almost equivalent to CREATE_PICKUP but with an additional parameter that sets the ammo count of the pickup. Using an ammo count of '0' creates a pickup equivalent to one created through CREATE_PICKUP. The additional parameter makes a pickup of type PICKUP_MONEY (`PickupType.Money`) useful &mdash; it sets the amount of money for the pickup type.