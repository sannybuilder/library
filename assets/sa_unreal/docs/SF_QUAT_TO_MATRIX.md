* Unlike [GTA SA's Quaternion Structure](https://github.com/DK22Pac/plugin-sdk/blob/master/plugin_sa/game_sa/CQuaternion.h), this command uses a different Quaternion Structure which the ordering of its members were interchanged:
```c
struct Quaternion{
    float real;
    CVector imag;
}
```
* This command follows the [GTA SA's Matrix Structure](https://github.com/DK22Pac/plugin-sdk/blob/master/plugin_sa/game_sa/CMatrix.h). But only requires the basis vectors ***right** (Pitch Axis)*, ***up** (Roll Axis)*, and ***at** (Yaw Axis)*.
* matrixBuffer's size must be **at least** 48 bytes (Matrix structure's size) to avoid memory corruption.