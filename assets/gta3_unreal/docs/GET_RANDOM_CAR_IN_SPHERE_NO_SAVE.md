Use -1 as model argument to search for any vehicle.

Returns -1 if nothing was found.

Result is closest vehicle in specified radius meeting the criteria:
* has model index equal to model argument, or any vehicle model (ignored if model argument is -1 or lesser)
* is type of car or bike
* is not created by mission or script
* has no player or mission created characters inside
* no character is currently entering or exiting the vehicle
* is not police vehicle currently chasing player or another criminal
