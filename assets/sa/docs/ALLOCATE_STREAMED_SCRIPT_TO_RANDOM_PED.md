This command creates an association between an ambient script and the pedestrian model, allowing the game to start the script when a ped of that model is created. It only affects random peds spawned by the game.

```
allocate_streamed_script_to_random_ped {id} 19 (DEALER) {modelId} #BMYDRUG {priority} 100
```

It starts the script when the game spawns a random ped with the specified model ID, if the player is within the radius of `5.0` of the ped. The ped handle is passed to the script in the first local variable.


## Overview of Brain Types

San Andreas has multiple types of AI brains that can be assigned to pedestrians or objects to control their behavior.

| Type                       | Trigger                              | Purpose                                    | Related Command                              |
| -------------------------- | ------------------------------------ | ------------------------------------------ | -------------------------------------------- |
| PED_STREAMED (0)           | Ped with matching model created      | Auto-run ped behavior scripts              | ALLOCATE_STREAMED_SCRIPT_TO_RANDOM_PED       |
| OBJECT_STREAMED (1)        | Object with matching model created   | Auto-run object scripts                    | ALLOCATE_STREAMED_SCRIPT_TO_OBJECT           |
| PED_GENERATOR_STREAMED (2) | —                                    | Disabled debug leftover                    | —                                            |
| CODE_PED (3)               | Game code calls brain by string name | Interior / special AI behaviors            | REGISTER_SCRIPT_BRAIN_FOR_CODE_USE           |
| CODE_OBJECT (4)            | Unused                               | —                                          | REGISTER_OBJECT_SCRIPT_BRAIN_FOR_CODE_USE    |
| CODE_ATTRACTOR_PED (5)     | Ped uses map attractor               | Attractor behaviors (chairs, gym, dancing) | REGISTER_ATTRACTOR_SCRIPT_BRAIN_FOR_CODE_USE |
