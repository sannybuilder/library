Definition:
```c
struct Vector {
    float X;
    float Y;
    float Z;
}; __attribute__((packed)) // size = 12

struct Matrix {
    struct Vector pitchAxisVector;
    uint32_t unusedPadding1;
    struct Vector rollAxisVector;
    uint32_t unusedPadding2;
    struct Vector yawAxisVector;
    uint32_t unusedPadding3;
}; __attribute__((packed)) // size = 48

struct Quaternion {
    float w;
    float x;
    float y;
    float z;
} __attribute__((packed)) // size = 16

struct Matrix*     matrix; // <----------- input
struct Quaternion* quaternionBuffer; // <- output
```

Matrix's Mathematical Representation:
```math
\bigg[\begin{smallmatrix}
\text{pitchAxisVector.X} & \text{pitchAxisVector.Y} & \text{pitchAxisVector.Z} & \text{unused} \\
\text{rollAxisVector.X} & \text{rollAxisVector.Y} & \text{rollAxisVector.Z} & \text{unused} \\
\text{yawAxisVector.X} & \text{yawAxisVector.Y} & \text{yawAxisVector.Z} & \text{unused}
\end{smallmatrix}\bigg]
```

* quaternionBuffer's size must be **at least** 16 bytes (Quaternion structure's size) to avoid memory corruption.