This command returns a pointer to a static `CWeaponInfo` struct that holds data from [`weapon.dat`](https://gtamods.com/wiki/Weapon.dat#San_Andreas) for the given weapontype and skill.

The `CWeaponInfo` struct has the following layout:

```
00000000 CWeaponInfo     struc
00000000 m_eFireType     dd ?
00000004 targetRange     dd ?
00000008 m_fWeaponRange  dd ?
0000000C dwModelId1      dd ?
00000010 dwModelId2      dd ?
00000014 nSlot           dd ?
00000018 m_nFlags        dd ?
0000001C AssocGroupId    dd ?
00000020 ammoClip        dw ?
00000022 damage          dw ?
00000024 fireOffset      RwV3d ?
00000030 skillLevel      dd ?
00000034 reqStatLevelToGetThisWeaponSkilLevel dd ?
00000038 m_fAccuracy     dd ?
0000003C moveSpeed       dd ?
00000040 animLoopStart   dd ?
00000044 animLoopEnd     dd ?
00000048 animLoopFire    dd ?
0000004C animLoop2Start  dd ?
00000050 animLoop2End    dd ?
00000054 animLoop2Fire   dd ?
00000058 breakoutTime    dd ?
0000005C speed           dd ?
00000060 radius          dd ?
00000064 lifespan        dd ?
00000068 spread          dd ?
0000006C AssocGroupId2   db ?
0000006D field_6D        db ?
0000006E baseCombo       db ?
0000006F m_nNumCombos    db ?
00000070 CWeaponInfo     ends
```

Individual fields can be read with READ_MEMORY or specialized commands, like GET_WEAPONINFO_ANIMGROUP or GET_WEAPONINFO_FLAGS.
