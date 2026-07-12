### Bitflags
* PedRace_Black = 1
* PedRace_White = 2
* PedRace_Asian = 4
* PedRace_Hispanic = 8

A ped model's race is determined by the first letter of the ped ID.
* Black = `B`
* White = `W`
* Asian = `O`,`I`
* Hispanic = `H`

In a zone with a PedRace setting of `0`, only peds that are neither Black, White, Asian, nor Hispanic will spawn; like MALE01, SFYPRO, SMYST1, SMYST2.

### Dealer ped streamer logic:

1. current weather zone is 2 -> entry 3 from dealer ped group is selected (biker in SF)
2. population race & 1 != 0 -> entry 0 is selected (black)
3. population race & 2 != 0 -> entry 1 is selected (white)
4. otherwise, entry 2 is selected (hispanic)
