This opcode adds a square blip in the radar denoting the location of the character and a blue arrow (marker) above the character. The opcode is almost equivalent to ADD_BLIP_FOR_CHAR_OLD but the properties of the blip are preset. The default properties of the blip, which can be changed using other opcodes, are:

- Color: 4 (yellow)
- Scale: 3
- Display: 3 (both blip and marker)

Both the blip and marker can be removed using REMOVE_BLIP.
