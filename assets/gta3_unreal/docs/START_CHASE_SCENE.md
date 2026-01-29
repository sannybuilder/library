This command starts the chase scene as seen in the introduction sequence of GTA III. The scene consists of 13 unique cars following paths defined in the CHASE*.DAT files. The minimum to get the chase scene to look decent is to start the cutscene "JB" with the appropriate cutscene objects, make the player safe using MAKE_PLAYER_SAFE_FOR_CUTSCENE, and load the level collision using LOAD_COLLISION. Depending on the implementation of the code, anything less can result in many undesirable behaviors, including crashing the game, cycling of colors on cars, creating random collisional damages on cars, making the cars not move, or inability for the player to enter any cars. The game performs the loading of all car models for the scene so you do not need to load the models yourself. During the scene, many parts of the city's collision unloads.

The following table is the initialization of cars and their properties when the command is called. The index corresponds to which chase path to use. The data is located in a function at memory address 0x435810 for US v1.0.

| Index | Model ID | Car      |        X |          Y |       Z | Angle | Carcols.dat | Color |
| ----: | -------: | -------- | -------: | ---------: | ------: | ----: | ----------: | ----: |
|     0 |      116 | Police   | 273.5422 | -1167.1907 | 24.9906 |  63.0 |           2 |     1 |
|     1 |      117 | Enforcer | 231.1783 | -1388.8322 | 25.9782 |  90.0 |           2 |     1 |
|     2 |      130 | Rumpo    | -28.9762 | -1031.3367 | 25.9781 | 242.0 |           1 |    75 |
|     3 |       96 | Patriot  | 114.1564 |  -796.6938 | 24.9782 | 180.0 |           0 |     0 |
|     4 |      110 | Taxi     | 184.3156 |  -1473.251 | 25.9782 |   0.0 |           6 |     6 |
|     6 |      105 | Cheetah  | 173.8868 | -1377.6514 | 25.9782 |   0.0 |           4 |     5 |
|     7 |       92 | Stinger  | 102.5946 |  -943.9363 | 25.9781 | 270.0 |          53 |    53 |
|    10 |      105 | Cheetah  | 177.7157 |  -862.1865 | 25.9782 | 155.0 |          41 |     1 |
|    11 |       92 | Stinger  | 170.5698 |  -889.0236 | 25.9782 | 154.0 |          10 |    10 |
|    14 |      111 | Kuruma   | 402.6081 |  -917.4963 | 37.3810 |  90.0 |          34 |     1 |
|    16 |      110 | Taxi     | -33.4962 |  -938.4563 | 25.9781 | 266.0 |           6 |     6 |
|    18 |      111 | Kuruma   |  49.3631 |  -987.6050 | 25.9781 |   0.0 |          51 |     1 |
|    19 |      110 | Taxi     | 179.0049 | -1154.6686 | 25.9781 |   0.0 |           6 |    76 |
