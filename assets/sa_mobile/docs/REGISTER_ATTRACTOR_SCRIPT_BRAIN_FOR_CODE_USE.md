This command creates an association between an ambient script and its name, allowing the game to start the script when a ped uses a corresponding attractor.

```
register_attractor_script_brain_for_code_use {id} 41 (PCHAIR) {_p2} 'PCHAIR'
```

The script starts when a ped is tasked to use an attractor defined in the map data. The ped handle is passed to the script in the first local variable.

```
task_use_closest_map_attractor {handle} ped {radius} 20.0 {modelId} #NULL {fromX} 0.0 {fromY} 0.0 {fromZ} 0.0 {name} "PCHAIR"
```

The game can also spawn peds that use attractors defined in the map data, such as gym equipment, chairs, and dance spots. In this case, the second local variable of the script will be set to `1` to indicate that the ped was spawned by the game.

**Overview of Brain Types**

San Andreas has multiple types of AI brains that can be assigned to pedestrians or objects to control their behavior.

| Type                       | Trigger                              | Purpose                                    | Related Command                              |
| -------------------------- | ------------------------------------ | ------------------------------------------ | -------------------------------------------- |
| PED_STREAMED (0)           | Ped with matching model created      | Auto-run ped behavior scripts              | ALLOCATE_STREAMED_SCRIPT_TO_RANDOM_PED       |
| OBJECT_STREAMED (1)        | Object with matching model created   | Auto-run object scripts                    | ALLOCATE_STREAMED_SCRIPT_TO_OBJECT           |
| PED_GENERATOR_STREAMED (2) | —                                    | Disabled debug leftover                    | —                                            |
| CODE_PED (3)               | Game code calls brain by string name | Interior / special AI behaviors            | REGISTER_SCRIPT_BRAIN_FOR_CODE_USE           |
| CODE_OBJECT (4)            | Unused                               | —                                          | REGISTER_OBJECT_SCRIPT_BRAIN_FOR_CODE_USE    |
| CODE_ATTRACTOR_PED (5)     | Ped uses map attractor               | Attractor behaviors (chairs, gym, dancing) | REGISTER_ATTRACTOR_SCRIPT_BRAIN_FOR_CODE_USE |
