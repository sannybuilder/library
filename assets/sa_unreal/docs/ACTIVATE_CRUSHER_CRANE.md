This command grabs and activates a crane that accepts vehicles for the crusher. The crane behaves similarly to ones activated by command 01EE with the following differences. The height of the pick up zone is set at -0.95099998 units. If the crane has a magnet, the magnet is moved appropriately for that height. When you deliver a vehicle model it does not accept, a message with GXT key `CR_1` ("Crane cannot lift this vehicle.") is displayed and the crane refuses the vehicle. The following vehicle models based on their IDE values are rejected by cranes activated with this command:

- 97 (Firetruck)
- 98 (Trashmaster)
- 102 (Blista)
- 118 (Securicar)
- 121 (Bus)
- 122 (Rhino)
- 126 (Dodo)

The crusher itself is separate from the crane and is not tied to this restriction or the crane. It is technically considered a garage and its creation is hardcoded.
