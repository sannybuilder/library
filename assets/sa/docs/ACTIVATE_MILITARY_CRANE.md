This command grabs and activates a crane that accepts emergency vehicles for exporting. Fans generally call this crane the emergency vehicle crane (or EV crane) because the vehicles it accepts are all the emergency vehicles in the game. The crane behaves similarly to ones activated by command 01EE with the following differences. The height of the pick up zone is set at 10.7862 units. If the crane has a magnet, the magnet is moved appropriately for that height. When you deliver a vehicle model it does not accept at all, a message with GXT key `GA_19` ("We're not interested in that model.") is displayed and the crane refuses the vehicle. The following vehicle models based on their IDE values are accepted by cranes activated with this command:

- 97 (Firetruck)
- 106 (Ambulance)
- 107 (Fbi Car)
- 116 (Police)
- 117 (Enforcer)
- 122 (Rhino)
- 123 (Barracks OL)

When the crane drops off the vehicle, the vehicle disappears immediately. On all but the seventh and last vehicle, you are then rewarded $1,500 and a message with GXT key `GA_10` ("Nice one. Here's your $1500") is displayed. Regardless of order, the last vehicle delivered yields nothing. The crane accepts vehicles of the same model only once. If you attempt to deliver it again, a message with GXT key `GA_20` ("We got more of these than we can shift. Sorry man, no deal.") is displayed and the crane refuses the vehicle. This refusal applies globally if you have more than one military cranes. Command 03EC can be used to check if all vehicles have been collected by the crane.
