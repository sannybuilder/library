* This command follows the [GTA SA's Matrix Structure](https://github.com/DK22Pac/plugin-sdk/blob/master/plugin_sa/game_sa/CMatrix.h). But only requires the three direction vectors ***right** (Pitch Axis)*, ***up** (Roll Axis)*, and ***at** (Yaw Axis)*.
* Unlike [GTA SA's Quaternion Structure](https://github.com/DK22Pac/plugin-sdk/blob/master/plugin_sa/game_sa/CQuaternion.h), this command uses a different Quaternion Structure which the ordering of its members were interchanged:
```c
struct Quaternion{
    float real;
    CVector imag;
}
```
* quaternionBuffer's size must be **at least** 16 bytes (Quaternion structure's size) to avoid memory corruption.