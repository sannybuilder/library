|Opcode | Command Name | Class | Modifier
|-------|--------------|-------|---------|
| 0000 | NOP | | nop
| 0001 | WAIT | keyword
| 0002 | GOTO | keyword
| 0003 | SHAKE_CAM | Camera.Shake | static
| 0004 | SET_VAR_INT | built-in
| 0005 | SET_VAR_FLOAT | built-in
| 0006 | SET_LVAR_INT | built-in
| 0007 | SET_LVAR_FLOAT | built-in
| 0008 | ADD_VAL_TO_INT_VAR | built-in
| 0009 | ADD_VAL_TO_FLOAT_VAR | built-in
| 000A | ADD_VAL_TO_INT_LVAR | built-in
| 000B | ADD_VAL_TO_FLOAT_LVAR | built-in
| 000C | SUB_VAL_FROM_INT_VAR | built-in
| 000D | SUB_VAL_FROM_FLOAT_VAR | built-in
| 000E | SUB_VAL_FROM_INT_LVAR | built-in
| 000F | SUB_VAL_FROM_FLOAT_LVAR | built-in
| 0010 | MULT_INT_VAR_BY_VAL | built-in
| 0011 | MULT_FLOAT_VAR_BY_VAL | built-in
| 0012 | MULT_INT_LVAR_BY_VAL | built-in
| 0013 | MULT_FLOAT_LVAR_BY_VAL | built-in
| 0014 | DIV_INT_VAR_BY_VAL | built-in
| 0015 | DIV_FLOAT_VAR_BY_VAL | built-in
| 0016 | DIV_INT_LVAR_BY_VAL | built-in
| 0017 | DIV_FLOAT_LVAR_BY_VAL | built-in
| 0018 | IS_INT_VAR_GREATER_THAN_NUMBER | built-in
| 0019 | IS_INT_LVAR_GREATER_THAN_NUMBER | built-in
| 001A | IS_NUMBER_GREATER_THAN_INT_VAR | built-in
| 001B | IS_NUMBER_GREATER_THAN_INT_LVAR | built-in
| 001C | IS_INT_VAR_GREATER_THAN_INT_VAR | built-in
| 001D | IS_INT_LVAR_GREATER_THAN_INT_LVAR | built-in
| 001E | IS_INT_VAR_GREATER_THAN_INT_LVAR | built-in
| 001F | IS_INT_LVAR_GREATER_THAN_INT_VAR | built-in
| 0020 | IS_FLOAT_VAR_GREATER_THAN_NUMBER | built-in
| 0021 | IS_FLOAT_LVAR_GREATER_THAN_NUMBER | built-in
| 0022 | IS_NUMBER_GREATER_THAN_FLOAT_VAR | built-in
| 0023 | IS_NUMBER_GREATER_THAN_FLOAT_LVAR | built-in
| 0024 | IS_FLOAT_VAR_GREATER_THAN_FLOAT_VAR | built-in
| 0025 | IS_FLOAT_LVAR_GREATER_THAN_FLOAT_LVAR | built-in
| 0026 | IS_FLOAT_VAR_GREATER_THAN_FLOAT_LVAR | built-in
| 0027 | IS_FLOAT_LVAR_GREATER_THAN_FLOAT_VAR | built-in
| 0028 | IS_INT_VAR_GREATER_OR_EQUAL_TO_NUMBER | built-in
| 0029 | IS_INT_LVAR_GREATER_OR_EQUAL_TO_NUMBER | built-in
| 002A | IS_NUMBER_GREATER_OR_EQUAL_TO_INT_VAR | built-in
| 002B | IS_NUMBER_GREATER_OR_EQUAL_TO_INT_LVAR | built-in
| 002C | IS_INT_VAR_GREATER_OR_EQUAL_TO_INT_VAR | built-in
| 002D | IS_INT_LVAR_GREATER_OR_EQUAL_TO_INT_LVAR | built-in
| 002E | IS_INT_VAR_GREATER_OR_EQUAL_TO_INT_LVAR | built-in
| 002F | IS_INT_LVAR_GREATER_OR_EQUAL_TO_INT_VAR | built-in
| 0030 | IS_FLOAT_VAR_GREATER_OR_EQUAL_TO_NUMBER | built-in
| 0031 | IS_FLOAT_LVAR_GREATER_OR_EQUAL_TO_NUMBER | built-in
| 0032 | IS_NUMBER_GREATER_OR_EQUAL_TO_FLOAT_VAR | built-in
| 0033 | IS_NUMBER_GREATER_OR_EQUAL_TO_FLOAT_LVAR | built-in
| 0034 | IS_FLOAT_VAR_GREATER_OR_EQUAL_TO_FLOAT_VAR | built-in
| 0035 | IS_FLOAT_LVAR_GREATER_OR_EQUAL_TO_FLOAT_LVAR | built-in
| 0036 | IS_FLOAT_VAR_GREATER_OR_EQUAL_TO_FLOAT_LVAR | built-in
| 0037 | IS_FLOAT_LVAR_GREATER_OR_EQUAL_TO_FLOAT_VAR | built-in
| 0038 | IS_INT_VAR_EQUAL_TO_NUMBER | built-in
| 0039 | IS_INT_LVAR_EQUAL_TO_NUMBER | built-in
| 003A | IS_INT_VAR_EQUAL_TO_INT_VAR | built-in
| 003B | IS_INT_LVAR_EQUAL_TO_INT_LVAR | built-in
| 003C | IS_INT_VAR_EQUAL_TO_INT_LVAR | built-in
| 003D | IS_INT_VAR_NOT_EQUAL_TO_NUMBER | built-in
| 003E | IS_INT_LVAR_NOT_EQUAL_TO_NUMBER | built-in
| 003F | IS_INT_VAR_NOT_EQUAL_TO_INT_VAR | built-in
| 0040 | IS_INT_LVAR_NOT_EQUAL_TO_INT_LVAR | built-in
| 0041 | IS_INT_VAR_NOT_EQUAL_TO_INT_LVAR | built-in
| 0042 | IS_FLOAT_VAR_EQUAL_TO_NUMBER | built-in
| 0043 | IS_FLOAT_LVAR_EQUAL_TO_NUMBER | built-in
| 0044 | IS_FLOAT_VAR_EQUAL_TO_FLOAT_VAR | built-in
| 0045 | IS_FLOAT_LVAR_EQUAL_TO_FLOAT_LVAR | built-in
| 0046 | IS_FLOAT_VAR_EQUAL_TO_FLOAT_LVAR | built-in
| 0047 | IS_FLOAT_VAR_NOT_EQUAL_TO_NUMBER | built-in
| 0048 | IS_FLOAT_LVAR_NOT_EQUAL_TO_NUMBER | built-in
| 0049 | IS_FLOAT_VAR_NOT_EQUAL_TO_FLOAT_VAR | built-in
| 004A | IS_FLOAT_LVAR_NOT_EQUAL_TO_FLOAT_LVAR | built-in
| 004B | IS_FLOAT_VAR_NOT_EQUAL_TO_FLOAT_LVAR | built-in
| 004C | GOTO_IF_TRUE | keyword
| 004D | GOTO_IF_FALSE | keyword
| 004E | TERMINATE_THIS_SCRIPT | keyword
| 004F | START_NEW_SCRIPT | keyword
| 0050 | GOSUB | keyword
| 0051 | RETURN | keyword
| 0052 | LINE | | nop
| 0053 | CREATE_PLAYER |  Player.Create | constructor
| 0054 | GET_PLAYER_COORDINATES | Player.GetCoordinates |
| 0055 | SET_PLAYER_COORDINATES | Player.SetCoordinates |
| 0056 | IS_PLAYER_IN_AREA_2D | Player.IsInArea2d
| 0057 | IS_PLAYER_IN_AREA_3D | Player.IsInArea3d
| 0058 | ADD_INT_VAR_TO_INT_VAR | built-in
| 0059 | ADD_FLOAT_VAR_TO_FLOAT_VAR | built-in
| 005A | ADD_INT_LVAR_TO_INT_LVAR | built-in
| 005B | ADD_FLOAT_LVAR_TO_FLOAT_LVAR | built-in
| 005C | ADD_INT_VAR_TO_INT_LVAR | built-in
| 005D | ADD_FLOAT_VAR_TO_FLOAT_LVAR | built-in
| 005E | ADD_INT_LVAR_TO_INT_VAR | built-in
| 005F | ADD_FLOAT_LVAR_TO_FLOAT_VAR | built-in
| 0060 | SUB_INT_VAR_FROM_INT_VAR | built-in
| 0061 | SUB_FLOAT_VAR_FROM_FLOAT_VAR | built-in
| 0062 | SUB_INT_LVAR_FROM_INT_LVAR | built-in
| 0063 | SUB_FLOAT_LVAR_FROM_FLOAT_LVAR | built-in
| 0064 | SUB_INT_VAR_FROM_INT_LVAR | built-in
| 0065 | SUB_FLOAT_VAR_FROM_FLOAT_LVAR | built-in
| 0066 | SUB_INT_LVAR_FROM_INT_VAR | built-in
| 0067 | SUB_FLOAT_LVAR_FROM_FLOAT_VAR | built-in
| 0068 | MULT_INT_VAR_BY_INT_VAR | built-in
| 0069 | MULT_FLOAT_VAR_BY_FLOAT_VAR | built-in
| 006A | MULT_INT_LVAR_BY_INT_LVAR | built-in
| 006B | MULT_FLOAT_LVAR_BY_FLOAT_LVAR | built-in
| 006C | MULT_INT_VAR_BY_INT_LVAR | built-in
| 006D | MULT_FLOAT_VAR_BY_FLOAT_LVAR | built-in
| 006E | MULT_INT_LVAR_BY_INT_VAR | built-in
| 006F | MULT_FLOAT_LVAR_BY_FLOAT_VAR | built-in
| 0070 | DIV_INT_VAR_BY_INT_VAR | built-in
| 0071 | DIV_FLOAT_VAR_BY_FLOAT_VAR | built-in
| 0072 | DIV_INT_LVAR_BY_INT_LVAR | built-in
| 0073 | DIV_FLOAT_LVAR_BY_FLOAT_LVAR | built-in
| 0074 | DIV_INT_VAR_BY_INT_LVAR | built-in
| 0075 | DIV_FLOAT_VAR_BY_FLOAT_LVAR | built-in
| 0076 | DIV_INT_LVAR_BY_INT_VAR | built-in
| 0077 | DIV_FLOAT_LVAR_BY_FLOAT_VAR | built-in
| 0078 | ADD_TIMED_VAL_TO_FLOAT_VAR | built-in
| 0079 | ADD_TIMED_VAL_TO_FLOAT_LVAR | built-in
| 007A | ADD_TIMED_FLOAT_VAR_TO_FLOAT_VAR | built-in
| 007B | ADD_TIMED_FLOAT_LVAR_TO_FLOAT_LVAR | built-in
| 007C | ADD_TIMED_FLOAT_VAR_TO_FLOAT_LVAR | built-in
| 007D | ADD_TIMED_FLOAT_LVAR_TO_FLOAT_VAR | built-in
| 007E | SUB_TIMED_VAL_FROM_FLOAT_VAR | built-in
| 007F | SUB_TIMED_VAL_FROM_FLOAT_LVAR | built-in
| 0080 | SUB_TIMED_FLOAT_VAR_FROM_FLOAT_VAR | built-in
| 0081 | SUB_TIMED_FLOAT_LVAR_FROM_FLOAT_LVAR | built-in
| 0082 | SUB_TIMED_FLOAT_VAR_FROM_FLOAT_LVAR | built-in
| 0083 | SUB_TIMED_FLOAT_LVAR_FROM_FLOAT_VAR | built-in
| 0084 | SET_VAR_INT_TO_VAR_INT | built-in
| 0085 | SET_LVAR_INT_TO_LVAR_INT | built-in
| 0086 | SET_VAR_FLOAT_TO_VAR_FLOAT | built-in
| 0087 | SET_LVAR_FLOAT_TO_LVAR_FLOAT | built-in
| 0088 | SET_VAR_FLOAT_TO_LVAR_FLOAT | built-in
| 0089 | SET_LVAR_FLOAT_TO_VAR_FLOAT | built-in
| 008A | SET_VAR_INT_TO_LVAR_INT | built-in
| 008B | SET_LVAR_INT_TO_VAR_INT | built-in
| 008C | CSET_VAR_INT_TO_VAR_FLOAT | built-in
| 008D | CSET_VAR_FLOAT_TO_VAR_INT | built-in
| 008E | CSET_LVAR_INT_TO_VAR_FLOAT | built-in
| 008F | CSET_LVAR_FLOAT_TO_VAR_INT | built-in
| 0090 | CSET_VAR_INT_TO_LVAR_FLOAT | built-in
| 0091 | CSET_VAR_FLOAT_TO_LVAR_INT | built-in
| 0092 | CSET_LVAR_INT_TO_LVAR_FLOAT | built-in
| 0093 | CSET_LVAR_FLOAT_TO_LVAR_INT | built-in
| 0094 | ABS_VAR_INT | built-in
| 0095 | ABS_LVAR_INT | built-in
| 0096 | ABS_VAR_FLOAT | built-in
| 0097 | ABS_LVAR_FLOAT | built-in
| 0098 | GENERATE_RANDOM_FLOAT | built-in
| 0099 | GENERATE_RANDOM_INT | built-in
| 009A | CREATE_CHAR | Char.Create | constructor
| 009B | DELETE_CHAR | Char.Delete | destructor
| 009C | CHAR_WANDER_DIR | Char.WanderDir
| 009D | CHAR_WANDER_RANGE | | nop
| 009E | CHAR_FOLLOW_PATH | Char.FollowPath
| 009F | CHAR_SET_IDLE | Char.SetIdle
| 00A0 | GET_CHAR_COORDINATES | Char.GetCoordinates |
| 00A1 | SET_CHAR_COORDINATES | Char.SetCoordinates |
| 00A2 | IS_CHAR_STILL_ALIVE | Char.IsStillAlive
| 00A3 | IS_CHAR_IN_AREA_2D | Char.IsInArea2d
| 00A4 | IS_CHAR_IN_AREA_3D | Char.IsInArea3d
| 00A5 | CREATE_CAR | Car.Create | constructor
| 00A6 | DELETE_CAR | Car.Delete | destructor
| 00A7 | CAR_GOTO_COORDINATES | Car.Goto
| 00A8 | CAR_WANDER_RANDOMLY | Car.WanderRandomly
| 00A9 | CAR_SET_IDLE | Car.SetIdle
| 00AA | GET_CAR_COORDINATES | Car.GetCoordinates |
| 00AB | SET_CAR_COORDINATES | Car.SetCoordinates |
| 00AC | IS_CAR_STILL_ALIVE | Car.IsStillAlive
| 00AD | SET_CAR_CRUISE_SPEED | Car.SetCruiseSpeed
| 00AE | SET_CAR_DRIVING_STYLE | Car.SetDrivingStyle
| 00AF | SET_CAR_MISSION | Car.SetMission
| 00B0 | IS_CAR_IN_AREA_2D | Car.IsInArea2d
| 00B1 | IS_CAR_IN_AREA_3D | Car.IsInArea3d
| 00B2 | SPECIAL_0 | | nop
| 00B3 | SPECIAL_1 | | nop
| 00B4 | SPECIAL_2 | | nop
| 00B5 | SPECIAL_3 | | nop
| 00B6 | SPECIAL_4 | | nop
| 00B7 | SPECIAL_5 | | nop
| 00B8 | SPECIAL_6 | | nop
| 00B9 | SPECIAL_7 | | nop
| 00BA | PRINT_BIG | Text.PrintBig | static
| 00BB | PRINT | Text.Print | static
| 00BC | PRINT_NOW | Text.PrintNow | static
| 00BD | PRINT_SOON | Text.PrintSoon | static
| 00BE | CLEAR_PRINTS | Text.Clear | static
| 00BF | GET_TIME_OF_DAY | Clock.GetTimeOfDay | static,
| 00C0 | SET_TIME_OF_DAY | Clock.SetTimeOfDay | static,
| 00C1 | GET_MINUTES_TO_TIME_OF_DAY | Clock.GetMinutesToTimeOfDay | static
| 00C2 | IS_POINT_ON_SCREEN | Camera.IsPointOnScreen | static
| 00C3 | DEBUG_ON | | nop
| 00C4 | DEBUG_OFF | | nop
| 00C5 | RETURN_TRUE | | nop
| 00C6 | RETURN_FALSE | | nop
| 00C7 | VAR_INT | | nop
| 00C8 | VAR_FLOAT | | nop
| 00C9 | LVAR_INT | | nop
| 00CA | LVAR_FLOAT | | nop
| 00CB | { | | nop
| 00CC | } | | nop
| 00CD | REPEAT | | nop
| 00CE | ENDREPEAT | | nop
| 00CF | IF | | nop
| 00D0 | IFNOT | | nop
| 00D1 | ELSE | | nop
| 00D2 | ENDIF | | nop
| 00D3 | WHILE | | nop
| 00D4 | WHILENOT | | nop
| 00D5 | ENDWHILE | | nop
| 00D6 | IF | keyword
| 00D7 | LAUNCH_MISSION | keyword
| 00D8 | MISSION_HAS_FINISHED | keyword
| 00D9 | STORE_CAR_CHAR_IS_IN | Char.StoreCarIsIn |
| 00DA | STORE_CAR_PLAYER_IS_IN | Player.StoreCarIsIn |
| 00DB | IS_CHAR_IN_CAR | Char.IsInCar
| 00DC | IS_PLAYER_IN_CAR | Player.IsInCar
| 00DD | IS_CHAR_IN_MODEL | Char.IsInModel
| 00DE | IS_PLAYER_IN_MODEL | Player.IsInModel
| 00DF | IS_CHAR_IN_ANY_CAR | Char.IsInAnyCar
| 00E0 | IS_PLAYER_IN_ANY_CAR | Player.IsInAnyCar
| 00E1 | IS_BUTTON_PRESSED | Pad.IsButtonPressed | static
| 00E2 | GET_PAD_STATE | Pad.GetState | static
| 00E3 | LOCATE_PLAYER_ANY_MEANS_2D | Player.LocateAnyMeans2d
| 00E4 | LOCATE_PLAYER_ON_FOOT_2D | Player.LocateOnFoot2d
| 00E5 | LOCATE_PLAYER_IN_CAR_2D | Player.LocateInCar2d
| 00E6 | LOCATE_STOPPED_PLAYER_ANY_MEANS_2D | Player.LocateStoppedAnyMeans2d
| 00E7 | LOCATE_STOPPED_PLAYER_ON_FOOT_2D | Player.LocateStoppedOnFoot2d
| 00E8 | LOCATE_STOPPED_PLAYER_IN_CAR_2D | Player.LocateStoppedInCar2d
| 00E9 | LOCATE_PLAYER_ANY_MEANS_CHAR_2D | Player.LocateAnyMeansChar2d
| 00EA | LOCATE_PLAYER_ON_FOOT_CHAR_2D | Player.LocateOnFootChar2d
| 00EB | LOCATE_PLAYER_IN_CAR_CHAR_2D | Player.LocateInCarChar2d
| 00EC | LOCATE_CHAR_ANY_MEANS_2D | Char.LocateAnyMeans2d
| 00ED | LOCATE_CHAR_ON_FOOT_2D | Char.LocateOnFoot2d
| 00EE | LOCATE_CHAR_IN_CAR_2D | Char.LocateInCar2d
| 00EF | LOCATE_STOPPED_CHAR_ANY_MEANS_2D | Char.LocateStoppedAnyMeans2d
| 00F0 | LOCATE_STOPPED_CHAR_ON_FOOT_2D | Char.LocateStoppedOnFoot2d
| 00F1 | LOCATE_STOPPED_CHAR_IN_CAR_2D | Char.LocateStoppedInCar2d
| 00F2 | LOCATE_CHAR_ANY_MEANS_CHAR_2D | Char.LocateAnyMeansChar2d
| 00F3 | LOCATE_CHAR_ON_FOOT_CHAR_2D | Char.LocateOnFootChar2d
| 00F4 | LOCATE_CHAR_IN_CAR_CHAR_2D | Char.LocateInCarChar2d
| 00F5 | LOCATE_PLAYER_ANY_MEANS_3D | Player.LocateAnyMeans3d
| 00F6 | LOCATE_PLAYER_ON_FOOT_3D | Player.LocateOnFoot3d
| 00F7 | LOCATE_PLAYER_IN_CAR_3D | Player.LocateInCar3d
| 00F8 | LOCATE_STOPPED_PLAYER_ANY_MEANS_3D | Player.LocateStoppedAnyMeans3d
| 00F9 | LOCATE_STOPPED_PLAYER_ON_FOOT_3D | Player.LocateStoppedOnFoot3d
| 00FA | LOCATE_STOPPED_PLAYER_IN_CAR_3D | Player.LocateStoppedInCar3d
| 00FB | LOCATE_PLAYER_ANY_MEANS_CHAR_3D | Player.LocateAnyMeansChar3d
| 00FC | LOCATE_PLAYER_ON_FOOT_CHAR_3D | Player.LocateOnFootChar3d
| 00FD | LOCATE_PLAYER_IN_CAR_CHAR_3D | Player.LocateInCarChar3d
| 00FE | LOCATE_CHAR_ANY_MEANS_3D | Char.LocateAnyMeans3d
| 00FF | LOCATE_CHAR_ON_FOOT_3D | Char.LocateOnFoot3d
| 0100 | LOCATE_CHAR_IN_CAR_3D | Char.LocateInCar3d
| 0101 | LOCATE_STOPPED_CHAR_ANY_MEANS_3D | Char.LocateStoppedAnyMeans3d
| 0102 | LOCATE_STOPPED_CHAR_ON_FOOT_3D | Char.LocateStoppedOnFoot3d
| 0103 | LOCATE_STOPPED_CHAR_IN_CAR_3D | Char.LocateStoppedInCar3d
| 0104 | LOCATE_CHAR_ANY_MEANS_CHAR_3D | Char.LocateAnyMeansChar3d
| 0105 | LOCATE_CHAR_ON_FOOT_CHAR_3D | Char.LocateOnFootChar3d
| 0106 | LOCATE_CHAR_IN_CAR_CHAR_3D | Char.LocateInCarChar3d
| 0107 | CREATE_OBJECT | Object.Create | constructor
| 0108 | DELETE_OBJECT | Object.Delete | destructor
| 0109 | ADD_SCORE | Player.AddScore
| 010A | IS_SCORE_GREATER | Player.IsScoreGreater | 
| 010B | STORE_SCORE | Player.StoreScore |
| 010C | GIVE_REMOTE_CONTROLLED_CAR_TO_PLAYER | Rc.GiveCarToPlayer
| 010D | ALTER_WANTED_LEVEL | Player.AlterWantedLevel
| 010E | ALTER_WANTED_LEVEL_NO_DROP | Player.AlterWantedLevelNoDrop
| 010F | IS_WANTED_LEVEL_GREATER | Player.IsWantedLevelGreater
| 0110 | CLEAR_WANTED_LEVEL | Player.ClearWantedLevel
| 0111 | SET_DEATHARREST_STATE | DeathArrest.SetState
| 0112 | HAS_DEATHARREST_BEEN_EXECUTED | DeathArrest.HasBeenExecuted
| 0113 | ADD_AMMO_TO_PLAYER | Player.AddAmmo
| 0114 | ADD_AMMO_TO_CHAR | Char.AddAmmo
| 0115 | ADD_AMMO_TO_CAR | | nop
| 0116 | IS_PLAYER_STILL_ALIVE | | nop
| 0117 | IS_PLAYER_DEAD | Player.IsDead
| 0118 | IS_CHAR_DEAD | Char.IsDead
| 0119 | IS_CAR_DEAD | Car.IsDead
| 011A | SET_CHAR_THREAT_SEARCH | Char.SetThreatSearch
| 011B | SET_CHAR_THREAT_REACTION | | nop
| 011C | SET_CHAR_OBJ_NO_OBJ | Char.SetObjNoObj
| 011D | ORDER_DRIVER_OUT_OF_CAR | | nop
| 011E | ORDER_CHAR_TO_DRIVE_CAR | | nop
| 011F | ADD_PATROL_POINT | | nop
| 0120 | IS_PLAYER_IN_GANGZONE | | nop
| 0121 | IS_PLAYER_IN_ZONE | Player.IsInZone
| 0122 | IS_PLAYER_PRESSING_HORN | Player.IsPressingHorn
| 0123 | HAS_CHAR_SPOTTED_PLAYER | Char.HasSpottedPlayer
| 0124 | ORDER_CHAR_TO_BACKDOOR | | nop
| 0125 | ADD_CHAR_TO_GANG | | nop
| 0126 | IS_CHAR_OBJECTIVE_PASSED | Char.IsObjectivePassed
| 0127 | SET_CHAR_DRIVE_AGGRESSION | | nop
| 0128 | SET_CHAR_MAX_DRIVESPEED | | nop
| 0129 | CREATE_CHAR_INSIDE_CAR | Char.CreateInsideCar | constructor
| 012A | WARP_PLAYER_FROM_CAR_TO_COORD | Player.WarpFromCarToCoord
| 012B | MAKE_CHAR_DO_NOTHING | | nop
| 012C | SET_CHAR_INVINCIBLE | | nop
| 012D | SET_PLAYER_INVINCIBLE | | nop
| 012E | SET_CHAR_GRAPHIC_TYPE | | nop
| 012F | SET_PLAYER_GRAPHIC_TYPE | | nop
| 0130 | HAS_PLAYER_BEEN_ARRESTED | Player.HasBeenArrested
| 0131 | STOP_CHAR_DRIVING | | nop
| 0132 | KILL_CHAR | | nop
| 0133 | SET_FAVOURITE_CAR_MODEL_FOR_CHAR | | nop
| 0134 | SET_CHAR_OCCUPATION | | nop
| 0135 | CHANGE_CAR_LOCK | Car.ChangeLock
| 0136 | SHAKE_CAM_WITH_POINT | Camera.ShakeWithPoint | static
| 0137 | IS_CAR_MODEL | Car.IsModel
| 0138 | IS_CAR_REMAP | | nop
| 0139 | HAS_CAR_JUST_SUNK | | nop
| 013A | SET_CAR_NO_COLLIDE | | nop
| 013B | IS_CAR_DEAD_IN_AREA_2D | Car.IsDeadInArea2d
| 013C | IS_CAR_DEAD_IN_AREA_3D | Car.IsDeadInArea3d
| 013D | IS_TRAILER_ATTACHED | | nop
| 013E | IS_CAR_ON_TRAILER | | nop
| 013F | HAS_CAR_GOT_WEAPON | | nop
| 0140 | PARK | | nop
| 0141 | HAS_PARK_FINISHED | | nop
| 0142 | KILL_ALL_PASSENGERS | | nop
| 0143 | SET_CAR_BULLETPROOF | | nop
| 0144 | SET_CAR_FLAMEPROOF | | nop
| 0145 | SET_CAR_ROCKETPROOF | | nop
| 0146 | IS_CARBOMB_ACTIVE | | nop
| 0147 | GIVE_CAR_ALARM | | nop
| 0148 | PUT_CAR_ON_TRAILER | | nop
| 0149 | IS_CAR_CRUSHED | Car.IsCrushed
| 014A | CREATE_GANG_CAR | | nop
| 014B | CREATE_CAR_GENERATOR | CarGenerator.Create | constructor
| 014C | SWITCH_CAR_GENERATOR | CarGenerator.Switch
| 014D | ADD_PAGER_MESSAGE | Pager.AddMessage | static
| 014E | DISPLAY_ONSCREEN_TIMER | Screen.DisplayTimer | static
| 014F | CLEAR_ONSCREEN_TIMER | Screen.ClearTimer | static
| 0150 | DISPLAY_ONSCREEN_COUNTER | Screen.DisplayCounter | static
| 0151 | CLEAR_ONSCREEN_COUNTER | Screen.ClearCounter | static
| 0152 | SET_ZONE_CAR_INFO | Zone.SetCarInfo | static
| 0153 | IS_CHAR_IN_GANG_ZONE | | nop
| 0154 | IS_CHAR_IN_ZONE | Char.IsInZone
| 0155 | SET_CAR_DENSITY | Zone.SetCarDensity | static
| 0156 | SET_PED_DENSITY | Zone.SetPedDensity | static
| 0157 | POINT_CAMERA_AT_PLAYER | Camera.PointAtPlayer | static
| 0158 | POINT_CAMERA_AT_CAR | Camera.PointAtCar | static
| 0159 | POINT_CAMERA_AT_CHAR | Camera.PointAtChar | static
| 015A | RESTORE_CAMERA | Camera.Restore | static
| 015B | SHAKE_PAD | Pad.Shake | static
| 015C | SET_ZONE_PED_INFO | Zone.SetPedInfo | static
| 015D | SET_TIME_SCALE | Clock.SetTimeScale | static
| 015E | IS_CAR_IN_AIR | Car.IsInAir
| 015F | SET_FIXED_CAMERA_POSITION | Camera.SetFixedPosition | static
| 0160 | POINT_CAMERA_AT_POINT | Camera.PointAtPoint | static
| 0161 | ADD_BLIP_FOR_CAR_OLD | Blip.AddForCarOld | constructor
| 0162 | ADD_BLIP_FOR_CHAR_OLD | Blip.AddForCharOld | constructor
| 0163 | ADD_BLIP_FOR_OBJECT_OLD | Blip.AddForObjectOld | constructor
| 0164 | REMOVE_BLIP | Blip.Remove
| 0165 | CHANGE_BLIP_COLOUR | Blip.ChangeColour
| 0166 | DIM_BLIP | Blip.Dim
| 0167 | ADD_BLIP_FOR_COORD_OLD | Blip.AddForCoordOld | constructor
| 0168 | CHANGE_BLIP_SCALE | Blip.ChangeScale
| 0169 | SET_FADING_COLOUR | Camera.SetFadingColour | static
| 016A | DO_FADE | Camera.DoFade | static
| 016B | GET_FADING_STATUS | Camera.GetFadingStatus | static
| 016C | ADD_HOSPITAL_RESTART | Restart.AddHospitalRestart | static
| 016D | ADD_POLICE_RESTART | Restart.AddPoliceRestart | static
| 016E | OVERRIDE_NEXT_RESTART | Restart.OverrideNextRestart | static
| 016F | DRAW_SHADOW | Shadow.Draw
| 0170 | GET_PLAYER_HEADING | Player.GetHeading |
| 0171 | SET_PLAYER_HEADING | Player.SetHeading | 
| 0172 | GET_CHAR_HEADING | Char.GetHeading | 
| 0173 | SET_CHAR_HEADING | Char.SetHeading | 
| 0174 | GET_CAR_HEADING | Car.GetHeading |
| 0175 | SET_CAR_HEADING | Car.SetHeading |
| 0176 | GET_OBJECT_HEADING | Object.GetHeading |
| 0177 | SET_OBJECT_HEADING | Object.SetHeading | 
| 0178 | IS_PLAYER_TOUCHING_OBJECT | Player.IsTouchingObject 
| 0179 | IS_CHAR_TOUCHING_OBJECT | Char.IsTouchingObject
| 017A | SET_PLAYER_AMMO | Player.SetAmmo
| 017B | SET_CHAR_AMMO | Char.SetAmmo
| 017C | SET_CAR_AMMO | | nop
| 017D | LOAD_CAMERA_SPLINE | | nop
| 017E | MOVE_CAMERA_ALONG_SPLINE | | nop
| 017F | GET_CAMERA_POSITION_ALONG_SPLINE | | nop
| 0180 | DECLARE_MISSION_FLAG | keyword
| 0181 | DECLARE_MISSION_FLAG_FOR_CONTACT | keyword
| 0182 | DECLARE_BASE_BRIEF_ID_FOR_CONTACT | keyword
| 0183 | IS_PLAYER_HEALTH_GREATER | Player.IsHealthGreater
| 0184 | IS_CHAR_HEALTH_GREATER | Char.IsHealthGreater
| 0185 | IS_CAR_HEALTH_GREATER | Car.IsHealthGreater
| 0186 | ADD_BLIP_FOR_CAR | Blip.AddForCar | constructor
| 0187 | ADD_BLIP_FOR_CHAR | Blip.AddForChar | constructor
| 0188 | ADD_BLIP_FOR_OBJECT | Blip.AddForObject | constructor
| 0189 | ADD_BLIP_FOR_CONTACT_POINT | Blip.AddForContactPoint | constructor
| 018A | ADD_BLIP_FOR_COORD | Blip.AddForCoord | constructor
| 018B | CHANGE_BLIP_DISPLAY | Blip.ChangeDisplay
| 018C | ADD_ONE_OFF_SOUND | Audio.AddOneOffSound | static
| 018D | ADD_CONTINUOUS_SOUND | Audio.AddContinuousSound | static
| 018E | REMOVE_SOUND | Audio.RemoveSound | static
| 018F | IS_CAR_STUCK_ON_ROOF | Car.IsStuckOnRoof
| 0190 | ADD_UPSIDEDOWN_CAR_CHECK | Car.AddUpsidedownCheck
| 0191 | REMOVE_UPSIDEDOWN_CAR_CHECK | Car.RemoveUpsidedownCheck
| 0192 | SET_CHAR_OBJ_WAIT_ON_FOOT | Char.SetObjWaitOnFoot
| 0193 | SET_CHAR_OBJ_FLEE_ON_FOOT_TILL_SAFE | Char.SetObjFleeOnFootTillSafe
| 0194 | SET_CHAR_OBJ_GUARD_SPOT | Char.SetObjGuardSpot
| 0195 | SET_CHAR_OBJ_GUARD_AREA | Char.SetObjGuardArea
| 0196 | SET_CHAR_OBJ_WAIT_IN_CAR | Char.ObjWaitInCar
| 0197 | IS_PLAYER_IN_AREA_ON_FOOT_2D | Player.IsInAreaOnFoot2d
| 0198 | IS_PLAYER_IN_AREA_IN_CAR_2D | Player.IsInAreaInCar2d
| 0199 | IS_PLAYER_STOPPED_IN_AREA_2D | Player.IsStoppedInArea2d
| 019A | IS_PLAYER_STOPPED_IN_AREA_ON_FOOT_2D | Player.IsStoppedInAreaOnFoot2d
| 019B | IS_PLAYER_STOPPED_IN_AREA_IN_CAR_2D | Player.IsStoppedInAreaInCar2d
| 019C | IS_PLAYER_IN_AREA_ON_FOOT_3D | Player.IsInAreaOnFoot3d
| 019D | IS_PLAYER_IN_AREA_IN_CAR_3D | Player.IsInAreaInCar3d 
| 019E | IS_PLAYER_STOPPED_IN_AREA_3D | Player.IsStoppedInArea3
| 019F | IS_PLAYER_STOPPED_IN_AREA_ON_FOOT_3D | Player.IsStoppedInAreaOnFoot3d
| 01A0 | IS_PLAYER_STOPPED_IN_AREA_IN_CAR_3D | Player.IsStoppedInAreaInCar3d
| 01A1 | IS_CHAR_IN_AREA_ON_FOOT_2D | Char.IsInAreaOnFoot2d
| 01A2 | IS_CHAR_IN_AREA_IN_CAR_2D | Char.IsInAreaInCar2d
| 01A3 | IS_CHAR_STOPPED_IN_AREA_2D | Char.IsStoppedInArea2d
| 01A4 | IS_CHAR_STOPPED_IN_AREA_ON_FOOT_2D | Char.IsStoppedInAreaOnFoot2d
| 01A5 | IS_CHAR_STOPPED_IN_AREA_IN_CAR_2D | Char.IsStoppedInAreaInCar2d 
| 01A6 | IS_CHAR_IN_AREA_ON_FOOT_3D | Char.IsInAreaOnFoot3d 
| 01A7 | IS_CHAR_IN_AREA_IN_CAR_3D | Char.IsInAreaInCar3d
| 01A8 | IS_CHAR_STOPPED_IN_AREA_3D | Char.IsStoppedInArea3d
| 01A9 | IS_CHAR_STOPPED_IN_AREA_ON_FOOT_3D | Char.IsStoppedInAreaOnFoot3d
| 01AA | IS_CHAR_STOPPED_IN_AREA_IN_CAR_3D | Char.IsStoppedInAreaInCar3d
| 01AB | IS_CAR_STOPPED_IN_AREA_2D | Car.IsStoppedInArea2d
| 01AC | IS_CAR_STOPPED_IN_AREA_3D | Car.IsStoppedInArea3d
| 01AD | LOCATE_CAR_2D | Car.Locate2d
| 01AE | LOCATE_STOPPED_CAR_2D | Car.LocateStopped2d
| 01AF | LOCATE_CAR_3D | Car.Locate3d
| 01B0 | LOCATE_STOPPED_CAR_3D | Car.LocateStopped3d
| 01B1 | GIVE_WEAPON_TO_PLAYER | Player.GiveWeapon
| 01B2 | GIVE_WEAPON_TO_CHAR | Char.GiveWeapon
| 01B3 | GIVE_WEAPON_TO_CAR | | nop
| 01B4 | SET_PLAYER_CONTROL | Player.SetControl
| 01B5 | FORCE_WEATHER | Weather.Force | static
| 01B6 | FORCE_WEATHER_NOW | Weather.ForceNow | static
| 01B7 | RELEASE_WEATHER | Weather.Release | static
| 01B8 | SET_CURRENT_PLAYER_WEAPON | Player.SetCurrentWeapon
| 01B9 | SET_CURRENT_CHAR_WEAPON | Char.SetCurrentWeapon
| 01BA | SET_CURRENT_CAR_WEAPON | | nop
| 01BB | GET_OBJECT_COORDINATES | Object.GetCoordinates |
| 01BC | SET_OBJECT_COORDINATES | Object.SetCoordinates |
| 01BD | GET_GAME_TIMER | Clock.GetGameTimer | static
| 01BE | TURN_CHAR_TO_FACE_COORD | Char.TurnToFaceCoord
| 01BF | TURN_PLAYER_TO_FACE_COORD | Player.TurnToFaceCoord
| 01C0 | STORE_WANTED_LEVEL | Player.StoreWantedLevel |
| 01C1 | IS_CAR_STOPPED | Car.IsStopped
| 01C2 | MARK_CHAR_AS_NO_LONGER_NEEDED | Char.MarkAsNoLongerNeeded
| 01C3 | MARK_CAR_AS_NO_LONGER_NEEDED | Car.MarkAsNoLongerNeeded
| 01C4 | MARK_OBJECT_AS_NO_LONGER_NEEDED | Object.MarkAsNoLongerNeeded
| 01C5 | DONT_REMOVE_CHAR | Char.DontRemove
| 01C6 | DONT_REMOVE_CAR | Car.DontRemove
| 01C7 | DONT_REMOVE_OBJECT | Object.DontRemove
| 01C8 | CREATE_CHAR_AS_PASSENGER | Char.CreateAsPassenger | constructor
| 01C9 | SET_CHAR_OBJ_KILL_CHAR_ON_FOOT | Char.SetObjKillCharOnFoot
| 01CA | SET_CHAR_OBJ_KILL_PLAYER_ON_FOOT | Char.SetObjKillPlayerOnFoot
| 01CB | SET_CHAR_OBJ_KILL_CHAR_ANY_MEANS | Char.SetObjKillAnyMeans
| 01CC | SET_CHAR_OBJ_KILL_PLAYER_ANY_MEANS | Char.SetObjKillPlayerAnyMeans
| 01CD | SET_CHAR_OBJ_FLEE_CHAR_ON_FOOT_TILL_SAFE | Char.SetObjFleeOnFootTillSafe
| 01CE | SET_CHAR_OBJ_FLEE_PLAYER_ON_FOOT_TILL_SAFE | Char.SetObjFleePlayerOnFootTillSafe
| 01CF | SET_CHAR_OBJ_FLEE_CHAR_ON_FOOT_ALWAYS | Char.SetObjFleeOnFootAlways
| 01D0 | SET_CHAR_OBJ_FLEE_PLAYER_ON_FOOT_ALWAYS | Char.SetObjFleePlayerOnFootAlways
| 01D1 | SET_CHAR_OBJ_GOTO_CHAR_ON_FOOT | Char.SetObjGotoOnFoot
| 01D2 | SET_CHAR_OBJ_GOTO_PLAYER_ON_FOOT | Char.SetObjGotoPlayerOnFoot
| 01D3 | SET_CHAR_OBJ_LEAVE_CAR | Char.SetObjLeaveCar
| 01D4 | SET_CHAR_OBJ_ENTER_CAR_AS_PASSENGER | Char.SetObjEnterCarAsPassenger
| 01D5 | SET_CHAR_OBJ_ENTER_CAR_AS_DRIVER | Char.SetObjEnterCarAsDriver
| 01D6 | SET_CHAR_OBJ_FOLLOW_CAR_IN_CAR | | nop
| 01D7 | SET_CHAR_OBJ_FIRE_AT_OBJECT_FROM_VEHICLE | | nop
| 01D8 | SET_CHAR_OBJ_DESTROY_OBJECT | | nop
| 01D9 | SET_CHAR_OBJ_DESTROY_CAR | Char.SetObjDestroyCar
| 01DA | SET_CHAR_OBJ_GOTO_AREA_ON_FOOT | Char.SetObjGotoAreaOnFoot
| 01DB | SET_CHAR_OBJ_GOTO_AREA_IN_CAR | | nop
| 01DC | SET_CHAR_OBJ_FOLLOW_CAR_ON_FOOT_WITH_OFFSET | | nop
| 01DD | SET_CHAR_OBJ_GUARD_ATTACK | | nop
| 01DE | SET_CHAR_AS_LEADER | Char.SetAsLeader
| 01DF | SET_PLAYER_AS_LEADER | Player.SetAsLeader
| 01E0 | LEAVE_GROUP | Char.LeaveGroup
| 01E1 | SET_CHAR_OBJ_FOLLOW_ROUTE | Char.SetObjFollowRoute
| 01E2 | ADD_ROUTE_POINT | Paths.AddRoutePoint | static
| 01E3 | PRINT_WITH_NUMBER_BIG | Text.PrintWithNumberBig | static
| 01E4 | PRINT_WITH_NUMBER | Text.PrintWithNumber | static
| 01E5 | PRINT_WITH_NUMBER_NOW | Text.PrintWithNumberNow | static
| 01E6 | PRINT_WITH_NUMBER_SOON | Text.PrintWithNumberSoon | static
| 01E7 | SWITCH_ROADS_ON | Paths.SwitchRoadsOn | static
| 01E8 | SWITCH_ROADS_OFF | Paths.SwitchRoadsOff | static
| 01E9 | GET_NUMBER_OF_PASSENGERS | Car.GetNumberOfPassengers |
| 01EA | GET_MAXIMUM_NUMBER_OF_PASSENGERS | Car.GetMaximumNumberOfPassengers | 
| 01EB | SET_CAR_DENSITY_MULTIPLIER | World.SetCarDensityMultiplier | static
| 01EC | SET_CAR_HEAVY | Car.SetHeavy
| 01ED | CLEAR_CHAR_THREAT_SEARCH | Char.ClearThreatSearch
| 01EE | ACTIVATE_CRANE | Crane.Activate | static
| 01EF | DEACTIVATE_CRANE | Crane.Deactivate | static
| 01F0 | SET_MAX_WANTED_LEVEL | Game.SetMaxWantedLevel | static
| 01F1 | SAVE_VAR_INT | | nop
| 01F2 | SAVE_VAR_FLOAT | | nop
| 01F3 | IS_CAR_IN_AIR_PROPER | Car.IsInAirProper
| 01F4 | IS_CAR_UPSIDEDOWN | Car.IsUpsidedown
| 01F5 | GET_PLAYER_CHAR | Player.GetChar |
| 01F6 | CANCEL_OVERRIDE_RESTART | Restart.CancelOverride | static
| 01F7 | SET_POLICE_IGNORE_PLAYER | Player.SetIgnorePolice
| 01F8 | ADD_PAGER_MESSAGE_WITH_NUMBER | Pager.AddMessageWithNumber | static
| 01F9 | START_KILL_FRENZY | Rampage.Start | static
| 01FA | READ_KILL_FRENZY_STATUS | Rampage.ReadStatus
| 01FB | SQRT | keyword
| 01FC | LOCATE_PLAYER_ANY_MEANS_CAR_2D | Player.LocateAnyMeansCar2d
| 01FD | LOCATE_PLAYER_ON_FOOT_CAR_2D | Player.LocateOnFootCar2d
| 01FE | LOCATE_PLAYER_IN_CAR_CAR_2D | Player.LocateInCarCar2d
| 01FF | LOCATE_PLAYER_ANY_MEANS_CAR_3D | Player.LocateAnyMeansCar3d
| 0200 | LOCATE_PLAYER_ON_FOOT_CAR_3D | Player.LocateOnFootCar3d
| 0201 | LOCATE_PLAYER_IN_CAR_CAR_3D | Player.LocateInCarCar3d
| 0202 | LOCATE_CHAR_ANY_MEANS_CAR_2D | Char.LocateAnyMeansCar2d
| 0203 | LOCATE_CHAR_ON_FOOT_CAR_2D | Char.LocateOnFootCar2d
| 0204 | LOCATE_CHAR_IN_CAR_CAR_2D | Char.LocateInCarCar2d
| 0205 | LOCATE_CHAR_ANY_MEANS_CAR_3D | Char.LocateAnyMeansCar3d
| 0206 | LOCATE_CHAR_ON_FOOT_CAR_3D | Char.LocateOnFootCar3d
| 0207 | LOCATE_CHAR_IN_CAR_CAR_3D | Char.LocateInCarCar3d
| 0208 | GENERATE_RANDOM_FLOAT_IN_RANGE | keyword
| 0209 | GENERATE_RANDOM_INT_IN_RANGE | keyword
| 020A | LOCK_CAR_DOORS | Car.LockDoors
| 020B | EXPLODE_CAR | Car.Explode
| 020C | ADD_EXPLOSION | World.AddExplosion | static
| 020D | IS_CAR_UPRIGHT | Car.IsUpright
| 020E | TURN_CHAR_TO_FACE_CHAR | Char.TurnToFaceChar
| 020F | TURN_CHAR_TO_FACE_PLAYER | Char.TurnToFacePlayer
| 0210 | TURN_PLAYER_TO_FACE_CHAR | Player.TurnToFaceChar
| 0211 | SET_CHAR_OBJ_GOTO_COORD_ON_FOOT | Char.SetObjGotoCoordOnFoot
| 0212 | SET_CHAR_OBJ_GOTO_COORD_IN_CAR | | nop
| 0213 | CREATE_PICKUP | Pickup.Create | constructor
| 0214 | HAS_PICKUP_BEEN_COLLECTED | Pickup.HasBeenCollected
| 0215 | REMOVE_PICKUP | Pickup.Remove | destructor
| 0216 | SET_TAXI_LIGHTS | Car.SetTaxiLight
| 0217 | PRINT_BIG_Q | Text.PrintBigQ
| 0218 | PRINT_WITH_NUMBER_BIG_Q | Text.PrintWithNumberBigQ
| 0219 | SET_GARAGE | Garage.Create | constructor
| 021A | SET_GARAGE_WITH_CAR_MODEL | Garage.CreateWithCarModel | constructor
| 021B | SET_TARGET_CAR_FOR_MISSION_GARAGE | Garage.SetTargetCar
| 021C | IS_CAR_IN_MISSION_GARAGE | Garage.IsCarIn
| 021D | SET_FREE_BOMBS | Game.SetFreeBombs | static
| 021E | SET_POWERPOINT | Game.SetPowerpoint
| 021F | SET_ALL_TAXI_LIGHTS | Game.SetAllTaxiLights | static
| 0220 | IS_CAR_ARMED_WITH_ANY_BOMB | Car.IsArmedWithAnyBomb
| 0221 | APPLY_BRAKES_TO_PLAYERS_CAR | Pad.ApplyBrakesToPlayersCar | static
| 0222 | SET_PLAYER_HEALTH | Player.SetHealth |
| 0223 | SET_CHAR_HEALTH | Char.SetHealth |
| 0224 | SET_CAR_HEALTH | Car.SetHealth |
| 0225 | GET_PLAYER_HEALTH | Player.GetHealth |
| 0226 | GET_CHAR_HEALTH | Char.GetHealth |
| 0227 | GET_CAR_HEALTH | Car.GetHealth |
| 0228 | IS_CAR_ARMED_WITH_BOMB | Car.IsArmedWithBomb
| 0229 | CHANGE_CAR_COLOUR | Car.ChangeColour
| 022A | SWITCH_PED_ROADS_ON | Paths.SwitchPedRoadsOn | static
| 022B | SWITCH_PED_ROADS_OFF | Paths.SwitchPedRoadsOff | static
| 022C | CHAR_LOOK_AT_CHAR_ALWAYS | Char.LookAtCharAlways
| 022D | CHAR_LOOK_AT_PLAYER_ALWAYS | Char.LookAtPlayerAlways
| 022E | PLAYER_LOOK_AT_CHAR_ALWAYS | Player.LookAtCharAlways
| 022F | STOP_CHAR_LOOKING | Char.StopLooking
| 0230 | STOP_PLAYER_LOOKING | Player.StopLooking
| 0231 | SET_SCRIPT_POLICE_HELI_TO_CHASE_CHAR | Game.SetScriptPoliceHeliToChaseChar
| 0232 | SET_GANG_ATTITUDE | | nop
| 0233 | SET_GANG_GANG_ATTITUDE | | nop
| 0234 | SET_GANG_PLAYER_ATTITUDE | | nop
| 0235 | SET_GANG_PED_MODELS | Gang.SetPedModels | static
| 0236 | SET_GANG_CAR_MODEL | Gang.SetCarModel | static
| 0237 | SET_GANG_WEAPONS | Gang.SetWeapons | static
| 0238 | SET_CHAR_OBJ_RUN_TO_AREA | Char.SetObjRunToArea
| 0239 | SET_CHAR_OBJ_RUN_TO_COORD | Char.SetObjRunToCoord
| 023A | IS_PLAYER_TOUCHING_OBJECT_ON_FOOT | Player.IsTouchingObjectOnFoot
| 023B | IS_CHAR_TOUCHING_OBJECT_ON_FOOT | Char.IsTouchingObjectOnFoot
| 023C | LOAD_SPECIAL_CHARACTER | Streaming.LoadSpecialCharacter | static
| 023D | HAS_SPECIAL_CHARACTER_LOADED | Streaming.HasSpecialCharacterLoaded | static
| 023E | FLASH_CAR | Car.Flash
| 023F | FLASH_CHAR | Char.Flash
| 0240 | FLASH_OBJECT | Object.Flash
| 0241 | IS_PLAYER_IN_REMOTE_MODE | Player.IsInRemoteMode
| 0242 | ARM_CAR_WITH_BOMB | Car.ArmWithBomb
| 0243 | SET_CHAR_PERSONALITY | Char.SetPersonality
| 0244 | SET_CUTSCENE_OFFSET | Cutscene.SetOffset | static
| 0245 | SET_ANIM_GROUP_FOR_CHAR | Char.SetAnimGroup
| 0246 | SET_ANIM_GROUP_FOR_PLAYER | Player.SetAnimGroup
| 0247 | REQUEST_MODEL | Streaming.RequestModel
| 0248 | HAS_MODEL_LOADED | Streaming.HasModelLoaded
| 0249 | MARK_MODEL_AS_NO_LONGER_NEEDED | Streaming.MarkModelAsNoLongerNeeded
| 024A | GRAB_PHONE | PhoneInfo.Grab | static
| 024B | SET_REPEATED_PHONE_MESSAGE | PhoneInfo.SetRepeatedMessage | static
| 024C | SET_PHONE_MESSAGE | PhoneInfo.SetMessage | static
| 024D | HAS_PHONE_DISPLAYED_MESSAGE | PhoneInfo.HasDisplayedMessage | static
| 024E | TURN_PHONE_OFF | PhoneInfo.TurnOff | static
| 024F | DRAW_CORONA | Corona.Draw | static
| 0250 | DRAW_LIGHT | Light.Draw | static
| 0251 | STORE_WEATHER | Weather.Store | static
| 0252 | RESTORE_WEATHER | Weather.Restore | static
| 0253 | STORE_CLOCK | Clock.Store | static
| 0254 | RESTORE_CLOCK | Clock.Restore | static
| 0255 | RESTART_CRITICAL_MISSION | keyword
| 0256 | IS_PLAYER_PLAYING | Player.IsPlaying
| 0257 | SET_COLL_OBJ_NO_OBJ | | nop
| 0258 | SET_COLL_OBJ_WAIT_ON_FOOT | | nop
| 0259 | SET_COLL_OBJ_FLEE_ON_FOOT_TILL_SAFE | | nop
| 025A | SET_COLL_OBJ_GUARD_SPOT | | nop
| 025B | SET_COLL_OBJ_GUARD_AREA | | nop
| 025C | SET_COLL_OBJ_WAIT_IN_CAR | | nop
| 025D | SET_COLL_OBJ_KILL_CHAR_ON_FOOT | | nop
| 025E | SET_COLL_OBJ_KILL_PLAYER_ON_FOOT | | nop
| 025F | SET_COLL_OBJ_KILL_CHAR_ANY_MEANS | | nop
| 0260 | SET_COLL_OBJ_KILL_PLAYER_ANY_MEANS | | nop
| 0261 | SET_COLL_OBJ_FLEE_CHAR_ON_FOOT_TILL_SAFE | | nop
| 0262 | SET_COLL_OBJ_FLEE_PLAYER_ON_FOOT_TILL_SAFE | | nop
| 0263 | SET_COLL_OBJ_FLEE_CHAR_ON_FOOT_ALWAYS | | nop
| 0264 | SET_COLL_OBJ_FLEE_PLAYER_ON_FOOT_ALWAYS | | nop
| 0265 | SET_COLL_OBJ_GOTO_CHAR_ON_FOOT | | nop
| 0266 | SET_COLL_OBJ_GOTO_PLAYER_ON_FOOT | | nop
| 0267 | SET_COLL_OBJ_LEAVE_CAR | | nop
| 0268 | SET_COLL_OBJ_ENTER_CAR_AS_PASSENGER | | nop
| 0269 | SET_COLL_OBJ_ENTER_CAR_AS_DRIVER | | nop
| 026A | SET_COLL_OBJ_FOLLOW_CAR_IN_CAR | | nop
| 026B | SET_COLL_OBJ_FIRE_AT_OBJECT_FROM_VEHICLE | | nop
| 026C | SET_COLL_OBJ_DESTROY_OBJECT | | nop
| 026D | SET_COLL_OBJ_DESTROY_CAR | | nop
| 026E | SET_COLL_OBJ_GOTO_AREA_ON_FOOT | | nop
| 026F | SET_COLL_OBJ_GOTO_AREA_IN_CAR | | nop
| 0270 | SET_COLL_OBJ_FOLLOW_CAR_ON_FOOT_WITH_OFFSET | | nop
| 0271 | SET_COLL_OBJ_GUARD_ATTACK | | nop
| 0272 | SET_COLL_OBJ_FOLLOW_ROUTE | | nop
| 0273 | SET_COLL_OBJ_GOTO_COORD_ON_FOOT | | nop
| 0274 | SET_COLL_OBJ_GOTO_COORD_IN_CAR | | nop
| 0275 | SET_COLL_OBJ_RUN_TO_AREA | | nop
| 0276 | SET_COLL_OBJ_RUN_TO_COORD | | nop
| 0277 | ADD_PEDS_IN_AREA_TO_COLL | | nop
| 0278 | ADD_PEDS_IN_VEHICLE_TO_COLL | | nop
| 0279 | CLEAR_COLL | | nop
| 027A | IS_COLL_IN_CARS | | nop
| 027B | LOCATE_COLL_ANY_MEANS_2D | | nop
| 027C | LOCATE_COLL_ON_FOOT_2D | | nop
| 027D | LOCATE_COLL_IN_CAR_2D | | nop
| 027E | LOCATE_STOPPED_COLL_ANY_MEANS_2D | | nop
| 027F | LOCATE_STOPPED_COLL_ON_FOOT_2D | | nop
| 0280 | LOCATE_STOPPED_COLL_IN_CAR_2D | | nop
| 0281 | LOCATE_COLL_ANY_MEANS_CHAR_2D | | nop
| 0282 | LOCATE_COLL_ON_FOOT_CHAR_2D | | nop
| 0283 | LOCATE_COLL_IN_CAR_CHAR_2D | | nop
| 0284 | LOCATE_COLL_ANY_MEANS_CAR_2D | | nop
| 0285 | LOCATE_COLL_ON_FOOT_CAR_2D | | nop
| 0286 | LOCATE_COLL_IN_CAR_CAR_2D | | nop
| 0287 | LOCATE_COLL_ANY_MEANS_PLAYER_2D | | nop
| 0288 | LOCATE_COLL_ON_FOOT_PLAYER_2D | | nop
| 0289 | LOCATE_COLL_IN_CAR_PLAYER_2D | | nop
| 028A | IS_COLL_IN_AREA_2D | | nop
| 028B | IS_COLL_IN_AREA_ON_FOOT_2D | | nop
| 028C | IS_COLL_IN_AREA_IN_CAR_2D | | nop
| 028D | IS_COLL_STOPPED_IN_AREA_2D | | nop
| 028E | IS_COLL_STOPPED_IN_AREA_ON_FOOT_2D | | nop
| 028F | IS_COLL_STOPPED_IN_AREA_IN_CAR_2D | | nop
| 0290 | GET_NUMBER_OF_PEDS_IN_COLL | | nop
| 0291 | SET_CHAR_HEED_THREATS | Char.SetHeedThreats
| 0292 | SET_PLAYER_HEED_THREATS | Player.SetHeedThreats
| 0293 | GET_CONTROLLER_MODE | Pad.GetControllerMode | static
| 0294 | SET_CAN_RESPRAY_CAR | Car.SetCanRespray
| 0295 | IS_TAXI | Car.IsTaxi
| 0296 | UNLOAD_SPECIAL_CHARACTER | Streaming.UnloadSpecialCharacter | static
| 0297 | RESET_NUM_OF_MODELS_KILLED_BY_PLAYER | Rampage.ResetNumOfModelsKilledByPlayer | static
| 0298 | GET_NUM_OF_MODELS_KILLED_BY_PLAYER | Rampage.GetNumOfModelsKilledByPlayer | static
| 0299 | ACTIVATE_GARAGE | Garage.Activate
| 029A | SWITCH_TAXI_TIMER | | nop
| 029B | CREATE_OBJECT_NO_OFFSET | Object.CreateNoOffset | constructor
| 029C | IS_BOAT | Car.IsBoat
| 029D | SET_CHAR_OBJ_GOTO_AREA_ANY_MEANS | Char.SetObjGotoAreaAnyMeans
| 029E | SET_COLL_OBJ_GOTO_AREA_ANY_MEANS | | nop
| 029F | IS_PLAYER_STOPPED | Player.IsStopped
| 02A0 | IS_CHAR_STOPPED | Char.IsStopped
| 02A1 | MESSAGE_WAIT | keyword
| 02A2 | ADD_PARTICLE_EFFECT | Particles.AddEffect | static
| 02A3 | SWITCH_WIDESCREEN | Screen.SwitchWidescreen
| 02A4 | ADD_SPRITE_BLIP_FOR_CAR | Blip.AddSpriteForCar
| 02A5 | ADD_SPRITE_BLIP_FOR_CHAR | Blip.AddSpriteForChar
| 02A6 | ADD_SPRITE_BLIP_FOR_OBJECT | Blip.AddSpriteForObject
| 02A7 | ADD_SPRITE_BLIP_FOR_CONTACT_POINT | Blip.AddSpriteForContactPoint
| 02A8 | ADD_SPRITE_BLIP_FOR_COORD | Blip.AddSpriteForCoord
| 02A9 | SET_CHAR_ONLY_DAMAGED_BY_PLAYER | Char.SetOnlyDamagedByPlayer
| 02AA | SET_CAR_ONLY_DAMAGED_BY_PLAYER | Car.SetOnlyDamagedByPlayer
| 02AB | SET_CHAR_PROOFS | Char.SetProofs
| 02AC | SET_CAR_PROOFS | Car.SetProofs
| 02AD | IS_PLAYER_IN_ANGLED_AREA_2D | Player.IsInAngledArea2d
| 02AE | IS_PLAYER_IN_ANGLED_AREA_ON_FOOT_2D | Player.IsInAngledAreaOnFoot2d
| 02AF | IS_PLAYER_IN_ANGLED_AREA_IN_CAR_2D | Player.IsInAngledAreaInCar2d
| 02B0 | IS_PLAYER_STOPPED_IN_ANGLED_AREA_2D | Player.IsStoppedInAngledArea2d
| 02B1 | IS_PLAYER_STOPPED_IN_ANGLED_AREA_ON_FOOT_2D | Player.IsStoppedInAngledAreaOnFoot2d
| 02B2 | IS_PLAYER_STOPPED_IN_ANGLED_AREA_IN_CAR_2D | Player.IsStoppedInAngledAreaInCar2d
| 02B3 | IS_PLAYER_IN_ANGLED_AREA_3D | Player.IsInAngledArea3d
| 02B4 | IS_PLAYER_IN_ANGLED_AREA_ON_FOOT_3D | Player.IsInAngledAreaOnFoot3d
| 02B5 | IS_PLAYER_IN_ANGLED_AREA_IN_CAR_3D | Player.IsInAngledAreaInCar3d
| 02B6 | IS_PLAYER_STOPPED_IN_ANGLED_AREA_3D | Player.IsStoppedInAngledArea3d
| 02B7 | IS_PLAYER_STOPPED_IN_ANGLED_AREA_ON_FOOT_3D | Player.IsStoppedInAngledAreaOnFoot3d
| 02B8 | IS_PLAYER_STOPPED_IN_ANGLED_AREA_IN_CAR_3D | Player.IsStoppedInAngledAreaInCar3d
| 02B9 | DEACTIVATE_GARAGE | Garage.Deactivate
| 02BA | GET_NUMBER_OF_CARS_COLLECTED_BY_GARAGE | Garage.GetNumberOfCarsCollected
| 02BB | HAS_CAR_BEEN_TAKEN_TO_GARAGE | Garage.HasCarBeenTaken
| 02BC | SET_SWAT_REQUIRED | Game.SetSwatRequired | static
| 02BD | SET_FBI_REQUIRED | Game.SetFbiRequired | static
| 02BE | SET_ARMY_REQUIRED | Game.SetArmytRequired | static
| 02BF | IS_CAR_IN_WATER | Car.IsInWater
| 02C0 | GET_CLOSEST_CHAR_NODE | Paths.GetClosestCharNode | static
| 02C1 | GET_CLOSEST_CAR_NODE | Paths.GetClosestCarNode | static
| 02C2 | CAR_GOTO_COORDINATES_ACCURATE | Car.GotoCoordinatesAccurate
| 02C3 | START_PACMAN_RACE | Pacman.StartRace | static
| 02C4 | START_PACMAN_RECORD | Pacman.StartRecord | static
| 02C5 | GET_NUMBER_OF_POWER_PILLS_EATEN | Pacman.GetNumberOfPowerPillsEaten | static
| 02C6 | CLEAR_PACMAN | Pacman.Clear | static
| 02C7 | START_PACMAN_SCRAMBLE | Pacman.StartScramble | static
| 02C8 | GET_NUMBER_OF_POWER_PILLS_CARRIED | Pacman.GetNumberOfPowerPillsCarried | static
| 02C9 | CLEAR_NUMBER_OF_POWER_PILLS_CARRIED | Pacman.ClearNumberOfPowerPillsCarried | static
| 02CA | IS_CAR_ON_SCREEN | Car.IsOnScreen
| 02CB | IS_CHAR_ON_SCREEN | Char.IsOnScreen
| 02CC | IS_OBJECT_ON_SCREEN | Object.IsOnScreen
| 02CD | GOSUB_FILE | keyword
| 02CE | GET_GROUND_Z_FOR_3D_COORD | World.GetGroundZFor3dCoord | static
| 02CF | START_SCRIPT_FIRE | ScriptFire.Start | constructor
| 02D0 | IS_SCRIPT_FIRE_EXTINGUISHED | ScriptFire.IsExtinguished
| 02D1 | REMOVE_SCRIPT_FIRE | ScriptFire.Remove
| 02D2 | SET_COMEDY_CONTROLS | Car.SetComedyControls
| 02D3 | BOAT_GOTO_COORDS | Boat.GotoCoords
| 02D4 | BOAT_STOP | Boat.Stop
| 02D5 | IS_PLAYER_SHOOTING_IN_AREA | Player.IsShootingInArea
| 02D6 | IS_CHAR_SHOOTING_IN_AREA | Char.IsShootingInArea
| 02D7 | IS_CURRENT_PLAYER_WEAPON | Player.IsCurrentWeapon
| 02D8 | IS_CURRENT_CHAR_WEAPON | Char.IsCurrentWeapon
| 02D9 | CLEAR_NUMBER_OF_POWER_PILLS_EATEN | Pacman.ClearNumberOfPowerPillsEaten | static
| 02DA | ADD_POWER_PILL | Pacman.AddPowerPill | static
| 02DB | SET_BOAT_CRUISE_SPEED | Boat.SetCruiseSpeed
| 02DC | GET_RANDOM_CHAR_IN_AREA | World.GetRandomCharInArea | constructor
| 02DD | GET_RANDOM_CHAR_IN_ZONE | World.GetRandomCharInZone | constructor
| 02DE | IS_PLAYER_IN_TAXI | Player.IsInTaxi
| 02DF | IS_PLAYER_SHOOTING | Player.IsShooting
| 02E0 | IS_CHAR_SHOOTING | Char.IsShooting
| 02E1 | CREATE_MONEY_PICKUP | Pickup.CreateMoneyPickup | constructor
| 02E2 | SET_CHAR_ACCURACY | Char.SetAccuracy
| 02E3 | GET_CAR_SPEED | Car.GetSpeed
| 02E4 | LOAD_CUTSCENE | Cutscene.Load | static
| 02E5 | CREATE_CUTSCENE_OBJECT | Cutscene.CreateObject | constructor
| 02E6 | SET_CUTSCENE_ANIM | Cutscene.SetAnim | static
| 02E7 | START_CUTSCENE | Cutscene.Start | static
| 02E8 | GET_CUTSCENE_TIME | Cutscene.GetTime | static
| 02E9 | HAS_CUTSCENE_FINISHED | Cutscene.HasFinished | static
| 02EA | CLEAR_CUTSCENE | Cutscene.Clear | static
| 02EB | RESTORE_CAMERA_JUMPCUT | Camera.RestoreJumpcut | static
| 02EC | CREATE_COLLECTABLE1 | Pickup.CreateCollectable1 | constructor
| 02ED | SET_COLLECTABLE1_TOTAL | Game.SetCollectable1Total | static
| 02EE | IS_PROJECTILE_IN_AREA | World.IsProjectileInArea | static
| 02EF | DESTROY_PROJECTILES_IN_AREA | World.DestroyProjectilesInArea | static
| 02F0 | DROP_MINE | Pickup.DropMine | static
| 02F1 | DROP_NAUTICAL_MINE | Pickup.DropNauticalMine | static
| 02F2 | IS_CHAR_MODEL | Char.IsModel
| 02F3 | LOAD_SPECIAL_MODEL | Streaming.LoadSpecialModel | static
| 02F4 | CREATE_CUTSCENE_HEAD | Cutscene.CreateHead | constructor
| 02F5 | SET_CUTSCENE_HEAD_ANIM | Cutscene.SetHeadAnim | static
| 02F6 | SIN | keyword
| 02F7 | COS | keyword
| 02F8 | GET_CAR_FORWARD_X | Car.GetForwardX
| 02F9 | GET_CAR_FORWARD_Y | Car.GetForwardY
| 02FA | CHANGE_GARAGE_TYPE | Garage.ChangeType
| 02FB | ACTIVATE_CRUSHER_CRANE | Crane.ActivateCrusherCrane | static
| 02FC | PRINT_WITH_2_NUMBERS | Text.PrintWith2Numbers | static
| 02FD | PRINT_WITH_2_NUMBERS_NOW | Text.PrintWith2NumbersNow | static
| 02FE | PRINT_WITH_2_NUMBERS_SOON | Text.PrintWith2NumbersSoon | static
| 02FF | PRINT_WITH_3_NUMBERS | Text.PrintWith3Numbers | static
| 0300 | PRINT_WITH_3_NUMBERS_NOW | Text.PrintWith3NumbersNow | static
| 0301 | PRINT_WITH_3_NUMBERS_SOON | Text.PrintWith3NumbersSoon | static
| 0302 | PRINT_WITH_4_NUMBERS | Text.PrintWith4Numbers | static
| 0303 | PRINT_WITH_4_NUMBERS_NOW | Text.PrintWith4NumbersNow | static
| 0304 | PRINT_WITH_4_NUMBERS_SOON | Text.PrintWith4NumbersSoon | static
| 0305 | PRINT_WITH_5_NUMBERS | Text.PrintWith5Numbers | static
| 0306 | PRINT_WITH_5_NUMBERS_NOW | Text.PrintWith5NumbersNow | static
| 0307 | PRINT_WITH_5_NUMBERS_SOON | Text.PrintWith5NumbersSoon | static
| 0308 | PRINT_WITH_6_NUMBERS | Text.PrintWith6Numbers | static
| 0309 | PRINT_WITH_6_NUMBERS_NOW | Text.PrintWith6NumbersNow | static
| 030A | PRINT_WITH_6_NUMBERS_SOON | Text.PrintWith6NumbersSoon | static
| 030B | SET_CHAR_OBJ_FOLLOW_CHAR_IN_FORMATION | Char.SetObjFollowCharInFormation
| 030C | PLAYER_MADE_PROGRESS | Stat.PlayerMadeProgress | static
| 030D | SET_PROGRESS_TOTAL | Stat.SetProgressTotal | static
| 030E | REGISTER_JUMP_DISTANCE | Stat.RegisterJumpDistance | static
| 030F | REGISTER_JUMP_HEIGHT | Stat.RegisterJumpHeight | static
| 0310 | REGISTER_JUMP_FLIPS | Stat.RegisterJumpFlips | static
| 0311 | REGISTER_JUMP_SPINS | Stat.RegisterJumpSpins | static
| 0312 | REGISTER_JUMP_STUNT | Stat.RegisterJumpStunt | static
| 0313 | REGISTER_UNIQUE_JUMP_FOUND | Stat.RegisterUniqueJumpFound | static
| 0314 | SET_UNIQUE_JUMPS_TOTAL | Stat.SetUniqueJumpsTotal | static
| 0315 | REGISTER_PASSENGER_DROPPED_OFF_TAXI | Stat.RegisterPassengerDroppedOffTaxi | static
| 0316 | REGISTER_MONEY_MADE_TAXI | Stat.RegisterMoneyMadeTaxi | static
| 0317 | REGISTER_MISSION_GIVEN | Stat.RegisterMissionGiven | static
| 0318 | REGISTER_MISSION_PASSED | Stat.RegisterMissionPassed | static
| 0319 | SET_CHAR_RUNNING | Char.SetRunning
| 031A | REMOVE_ALL_SCRIPT_FIRES | ScriptFire.RemoveAll | static
| 031B | IS_FIRST_CAR_COLOUR | Car.IsFirstColour
| 031C | IS_SECOND_CAR_COLOUR | Car.IsSecondColour
| 031D | HAS_CHAR_BEEN_DAMAGED_BY_WEAPON | Char.HasBeenDamagedByWeapon
| 031E | HAS_CAR_BEEN_DAMAGED_BY_WEAPON | Car.HasBeenDamagedByWeapon
| 031F | IS_CHAR_IN_CHARS_GROUP | Char.IsInCharsGroup
| 0320 | IS_CHAR_IN_PLAYERS_GROUP | Char.IsInPlayersGroup
| 0321 | EXPLODE_CHAR_HEAD | Char.ExplodeHead
| 0322 | EXPLODE_PLAYER_HEAD | Player.ExplodeHead
| 0323 | ANCHOR_BOAT | Boat.Anchor
| 0324 | SET_ZONE_GROUP | Zone.SetGroup | static
| 0325 | START_CAR_FIRE | ScriptFire.StartCarFire | constructor
| 0326 | START_CHAR_FIRE | ScriptFire.StartCharFire | constructor
| 0327 | GET_RANDOM_CAR_OF_TYPE_IN_AREA | World.GetRandomCarOfTypeInArea | constructor
| 0328 | GET_RANDOM_CAR_OF_TYPE_IN_ZONE | World.GetRandomCarOfTypeInZone | constructor
| 0329 | HAS_RESPRAY_HAPPENED | Game.HasResprayHappened
| 032A | SET_CAMERA_ZOOM | Camera.SetZoom
| 032B | CREATE_PICKUP_WITH_AMMO | Pickup.CreateWithAmmo
| 032C | SET_CAR_RAM_CAR | Car.SetRamCar
| 032D | SET_CAR_BLOCK_CAR | Car.SetBlockCar
| 032E | SET_CHAR_OBJ_CATCH_TRAIN | Char.SetObjCatchTrain
| 032F | SET_COLL_OBJ_CATCH_TRAIN | | nop
| 0330 | SET_PLAYER_NEVER_GETS_TIRED | Player.SetNeverGetsTired
| 0331 | SET_PLAYER_FAST_RELOAD | Player.SetFastReload
| 0332 | SET_CHAR_BLEEDING | Char.SetBleeding
| 0333 | SET_CAR_FUNNY_SUSPENSION | Car.SetFunnySuspension
| 0334 | SET_CAR_BIG_WHEELS | Car.SetBigWheels
| 0335 | SET_FREE_RESPRAYS | Game.SetFreeResprays
| 0336 | SET_PLAYER_VISIBLE | Player.SetVisible
| 0337 | SET_CHAR_VISIBLE | Char.SetVisible
| 0338 | SET_CAR_VISIBLE | Car.SetVisible
| 0339 | IS_AREA_OCCUPIED | World.IsAreaOccupied | static
| 033A | START_DRUG_RUN | DrugRun.Start | static
| 033B | HAS_DRUG_RUN_BEEN_COMPLETED | DrugRun.HasBeenCompleted | static
| 033C | HAS_DRUG_PLANE_BEEN_SHOT_DOWN | DrugRun.HasDrugPlaneBeenShotDown | static
| 033D | SAVE_PLAYER_FROM_FIRES | Player.SaveFromFires
| 033E | DISPLAY_TEXT | Text.Display | static
| 033F | SET_TEXT_SCALE | Text.SetScale | static
| 0340 | SET_TEXT_COLOUR | Text.SetColour | static
| 0341 | SET_TEXT_JUSTIFY | Text.SetJustify | static
| 0342 | SET_TEXT_CENTRE | Text.SetCentre | static
| 0343 | SET_TEXT_WRAPX | Text.SetWrapx | static
| 0344 | SET_TEXT_CENTRE_SIZE | Text.SetCentreSize | static
| 0345 | SET_TEXT_BACKGROUND | Text.SetBackground | static
| 0346 | SET_TEXT_BACKGROUND_COLOUR | Text.SetBackgroundColour | static
| 0347 | SET_TEXT_BACKGROUND_ONLY_TEXT | Text.SetBackgroundOnlyText | static
| 0348 | SET_TEXT_PROPORTIONAL | Text.SetProportional | static
| 0349 | SET_TEXT_FONT | Text.SetFont | static
| 034A | INDUSTRIAL_PASSED | Stat.SetIndustrialPassed | static
| 034B | COMMERCIAL_PASSED | Stat.SetCommercialPassed | static
| 034C | SUBURBAN_PASSED | Stat.SetSuburbanPassed | static
| 034D | ROTATE_OBJECT | Object.Rotate
| 034E | SLIDE_OBJECT | Object.Slide
| 034F | REMOVE_CHAR_ELEGANTLY | Char.RemoveElegantly
| 0350 | SET_CHAR_STAY_IN_SAME_PLACE | Char.SetStayInSamePlace
| 0351 | IS_NASTY_GAME | Game.IsNasty
| 0352 | UNDRESS_CHAR | Char.Undress
| 0353 | DRESS_CHAR | Char.Dress
| 0354 | START_CHASE_SCENE | ChaseScene.Start |static
| 0355 | STOP_CHASE_SCENE | ChaseScene.Stop | static
| 0356 | IS_EXPLOSION_IN_AREA | World.IsExplosionInArea | static
| 0357 | IS_EXPLOSION_IN_ZONE | World.IsExplosionInZone | static
| 0358 | START_DRUG_DROP_OFF | DrugRun.StartDrugDropOff | static
| 0359 | HAS_DROP_OFF_PLANE_BEEN_SHOT_DOWN | DrugRun.HasDropOffPlaneBeenShotDown | static
| 035A | FIND_DROP_OFF_PLANE_COORDINATES | DrugRun.FindDropOffPlaneCoordinates | static
| 035B | CREATE_FLOATING_PACKAGE | DrugRun.CreateFloatingPackage | constructor
| 035C | PLACE_OBJECT_RELATIVE_TO_CAR | Object.PlaceRelativeToCar
| 035D | MAKE_OBJECT_TARGETTABLE | Object.MakeTargettable
| 035E | ADD_ARMOUR_TO_PLAYER | Player.AddArmour
| 035F | ADD_ARMOUR_TO_CHAR | Char.AddArmour
| 0360 | OPEN_GARAGE | Garage.Open
| 0361 | CLOSE_GARAGE | Garage.Close
| 0362 | WARP_CHAR_FROM_CAR_TO_COORD | Char.WarpFromCarToCoord
| 0363 | SET_VISIBILITY_OF_CLOSEST_OBJECT_OF_TYPE | World.SetVisibilityOfClosestObjectOfType | static
| 0364 | HAS_CHAR_SPOTTED_CHAR | Char.HasSpottedChar
| 0365 | SET_CHAR_OBJ_HAIL_TAXI | Char.SetObjHailTaxi
| 0366 | HAS_OBJECT_BEEN_DAMAGED | Object.HasBeenDamaged
| 0367 | START_KILL_FRENZY_HEADSHOT | Rampage.StartHeadshot | static
| 0368 | ACTIVATE_MILITARY_CRANE | Crane.ActivateMilitaryCrane | static
| 0369 | WARP_PLAYER_INTO_CAR | Player.WarpIntoCar
| 036A | WARP_CHAR_INTO_CAR | Char.WarpIntoCar
| 036B | SWITCH_CAR_RADIO | | nop
| 036C | SET_AUDIO_STREAM | | nop
| 036D | PRINT_WITH_2_NUMBERS_BIG | Text.PrintWith2NumbersBig | static
| 036E | PRINT_WITH_3_NUMBERS_BIG | Text.PrintWith3NumbersBig | static
| 036F | PRINT_WITH_4_NUMBERS_BIG | Text.PrintWith4NumbersBig | static
| 0370 | PRINT_WITH_5_NUMBERS_BIG | Text.PrintWith5NumbersBig | static
| 0371 | PRINT_WITH_6_NUMBERS_BIG | Text.PrintWith6NumbersBig | static
| 0372 | SET_CHAR_WAIT_STATE | Char.SetWaitState
| 0373 | SET_CAMERA_BEHIND_PLAYER | Camera.SetBehindPlayer | static
| 0374 | SET_MOTION_BLUR | Camera.SetMotionBlur | static
| 0375 | PRINT_STRING_IN_STRING | Text.PrintStringInString | static
| 0376 | CREATE_RANDOM_CHAR | Char.CreateRandomChar | constructor
| 0377 | SET_CHAR_OBJ_STEAL_ANY_CAR | SetCharObjStealAnyCar
| 0378 | SET_2_REPEATED_PHONE_MESSAGES | PhoneInfo.Set2RepeatedMessages
| 0379 | SET_2_PHONE_MESSAGES | PhoneInfo.Set2Messages
| 037A | SET_3_REPEATED_PHONE_MESSAGES | PhoneInfo.Set3RepeatedMessages
| 037B | SET_3_PHONE_MESSAGES | PhoneInfo.Set3Messages
| 037C | SET_4_REPEATED_PHONE_MESSAGES | PhoneInfo.Set4RepeatedMessages
| 037D | SET_4_PHONE_MESSAGES | PhoneInfo.Set4Messages
| 037E | IS_SNIPER_BULLET_IN_AREA | World.IsSniperBulletInArea | static
| 037F | GIVE_PLAYER_DETONATOR | Player.GiveDetonator | static
| 0380 | SET_COLL_OBJ_STEAL_ANY_CAR | | nop
| 0381 | SET_OBJECT_VELOCITY | Object.SetVelocity
| 0382 | SET_OBJECT_COLLISION | Object.SetCollision
| 0383 | IS_ICECREAM_JINGLE_ON | Car.IsIcecreamJingleOn
| 0384 | PRINT_STRING_IN_STRING_NOW | Text.PrintStringInStringNow | static
| 0385 | PRINT_STRING_IN_STRING_SOON | Text.PrintStringInStringSoon | static
| 0386 | SET_5_REPEATED_PHONE_MESSAGES | PhoneInfo.Set5RepeatedPhoneMessages | static
| 0387 | SET_5_PHONE_MESSAGES | PhoneInfo.Set5PhoneMessages | static
| 0388 | SET_6_REPEATED_PHONE_MESSAGES | PhoneInfo.Set6RepeatedPhoneMessages | static
| 0389 | SET_6_PHONE_MESSAGES | PhoneInfo.Set6PhoneMessages | static
| 038A | IS_POINT_OBSCURED_BY_A_MISSION_ENTITY | World.IsPointObscuredByAMissionEntity | static
| 038B | LOAD_ALL_MODELS_NOW | Streaming.LoadAllModelsNow | static
| 038C | ADD_TO_OBJECT_VELOCITY | Object.AddToVelocity
| 038D | DRAW_SPRITE | Sprite.Draw | static
| 038E | DRAW_RECT | Screen.DrawRect | static 
| 038F | LOAD_SPRITE | Sprite.Load | static
| 0390 | LOAD_TEXTURE_DICTIONARY | Txd.Load | static
| 0391 | REMOVE_TEXTURE_DICTIONARY | Txd.Remove | static
| 0392 | SET_OBJECT_DYNAMIC | Object.SetDynamic
| 0393 | SET_CHAR_ANIM_SPEED | Char.SetAnimSpeed
| 0394 | PLAY_MISSION_PASSED_TUNE | Audio.PlayMissionPassedTune
| 0395 | CLEAR_AREA | World.ClearArea | static
| 0396 | FREEZE_ONSCREEN_TIMER | Screen.FreezeOnscreenTimer | static
| 0397 | SWITCH_CAR_SIREN | Car.SwitchSiren
| 0398 | SWITCH_PED_ROADS_ON_ANGLED | Paths.SwitchPedRoadsOnAngled | static
| 0399 | SWITCH_PED_ROADS_OFF_ANGLED | Paths.SwitchPedRoadsOffAngled | static
| 039A | SWITCH_ROADS_ON_ANGLED | Paths.SwitchRoadsOnAngled | static
| 039B | SWITCH_ROADS_OFF_ANGLED | Paths.SwitchRoadsOffAngled | static
| 039C | SET_CAR_WATERTIGHT | Car.SetWatertight
| 039D | ADD_MOVING_PARTICLE_EFFECT | Particles.AddMovingEffect | static
| 039E | SET_CHAR_CANT_BE_DRAGGED_OUT | Char.SetCantBeDraggedOut
| 039F | TURN_CAR_TO_FACE_COORD | Car.TurnToFaceCoord
| 03A0 | IS_CRANE_LIFTING_CAR | Crane.IsLiftingCar | static
| 03A1 | DRAW_SPHERE | Sphere.Draw
| 03A2 | SET_CAR_STATUS | Car.SetStatus
| 03A3 | IS_CHAR_MALE | Char.IsMale
| 03A4 | SCRIPT_NAME | keyword
| 03A5 | CHANGE_GARAGE_TYPE_WITH_CAR_MODEL | Garage.ChangeTypeWithCarModel
| 03A6 | FIND_DRUG_PLANE_COORDINATES | DrugRun.FindDrugPlaneCoordinates | static
| 03A7 | SAVE_INT_TO_DEBUG_FILE | keyword
| 03A8 | SAVE_FLOAT_TO_DEBUG_FILE | keyword
| 03A9 | SAVE_NEWLINE_TO_DEBUG_FILE | keyword
| 03AA | POLICE_RADIO_MESSAGE | Audio.PoliceRadioMessage | static
| 03AB | SET_CAR_STRONG | Car.SetStrong
| 03AC | REMOVE_ROUTE | Paths.RemoveRoute | static
| 03AD | SWITCH_RUBBISH | World.SwitchRubbish | static
| 03AE | REMOVE_PARTICLE_EFFECTS_IN_AREA | World.RemoveParticleEffectsInArea | static
| 03AF | SWITCH_STREAMING | Streaming.Switch | static
| 03B0 | IS_GARAGE_OPEN | Garage.IsOpen
| 03B1 | IS_GARAGE_CLOSED | Garage.IsClosed
| 03B2 | START_CATALINA_HELI | CatalinaHeli.Start | static
| 03B3 | CATALINA_HELI_TAKE_OFF | CatalinaHeli.TakeOff | static
| 03B4 | REMOVE_CATALINA_HELI | CatalinaHeli.Remove | static
| 03B5 | HAS_CATALINA_HELI_BEEN_SHOT_DOWN | CatalinaHeli.HasBeenShotDown | static
| 03B6 | SWAP_NEAREST_BUILDING_MODEL | World.SwapNearestBuildingModel | static
| 03B7 | SWITCH_WORLD_PROCESSING | World.SwitchProcessing | static
| 03B8 | REMOVE_ALL_PLAYER_WEAPONS | Player.RemoveAllWeapons
| 03B9 | GRAB_CATALINA_HELI | CatalinaHeli.Grab | static
| 03BA | CLEAR_AREA_OF_CARS | World.ClearAreaOfCars | static
| 03BB | SET_ROTATING_GARAGE_DOOR | Garage.SetRotatingDoor
| 03BC | ADD_SPHERE | Sphere.Add | constructor
| 03BD | REMOVE_SPHERE | Sphere.Remove
| 03BE | CATALINA_HELI_FLY_AWAY | CatalinaHeli.FlyAway | static
| 03BF | SET_EVERYONE_IGNORE_PLAYER | Game.SetEveryoneIgnorePlayer | static
| 03C0 | STORE_CAR_CHAR_IS_IN_NO_SAVE | Car.StoreCharIsInNoSave
| 03C1 | STORE_CAR_PLAYER_IS_IN_NO_SAVE | Car.StorePlayerIsInNoSave
| 03C2 | IS_PHONE_DISPLAYING_MESSAGE | PhoneInfo.IsDisplayingMessage
| 03C3 | DISPLAY_ONSCREEN_TIMER_WITH_STRING | Screen.DisplayOnscreenTimerWithString | static
| 03C4 | DISPLAY_ONSCREEN_COUNTER_WITH_STRING | Screen.DisplayOnscreenCounterWithString | static
| 03C5 | CREATE_RANDOM_CAR_FOR_CAR_PARK | World.CreateRandomCarForCarPark | static
| 03C6 | IS_COLLISION_IN_MEMORY | Streaming.IsCollisionInMemory | static
| 03C7 | SET_WANTED_MULTIPLIER | Player.SetWantedMultiplier | static
| 03C8 | SET_CAMERA_IN_FRONT_OF_PLAYER | Camera.SetInFrontOfPlayer | static
| 03C9 | IS_CAR_VISIBLY_DAMAGED | Car.IsVisiblyDamaged
| 03CA | DOES_OBJECT_EXIST | Object.DoesExist
| 03CB | LOAD_SCENE | Streaming.LoadScene | static
| 03CC | ADD_STUCK_CAR_CHECK | StuckCarCheck.Add | static
| 03CD | REMOVE_STUCK_CAR_CHECK | StuckCarCheck.Remove | static
| 03CE | IS_CAR_STUCK | StuckCarCheck.IsCarStuck | static
| 03CF | LOAD_MISSION_AUDIO | Audio.LoadMissionAudio | static
| 03D0 | HAS_MISSION_AUDIO_LOADED | Audio.HasMissionAudioLoaded | static
| 03D1 | PLAY_MISSION_AUDIO | Audio.PlayMissionAudio | static
| 03D2 | HAS_MISSION_AUDIO_FINISHED | Audio.HasMissionAudioFinished | static
| 03D3 | GET_CLOSEST_CAR_NODE_WITH_HEADING | Paths.GetClosestCarNodeWithHeading | static
| 03D4 | HAS_IMPORT_GARAGE_SLOT_BEEN_FILLED | Garage.HasSlotBeenFilled
| 03D5 | CLEAR_THIS_PRINT | Text.ClearThisPrint | static
| 03D6 | CLEAR_THIS_BIG_PRINT | Text.ClearThisBigPrint | static
| 03D7 | SET_MISSION_AUDIO_POSITION | Audio.SetMissionAudioPosition | static
| 03D8 | ACTIVATE_SAVE_MENU | Menu.ActivateSaveMenu | static
| 03D9 | HAS_SAVE_GAME_FINISHED | Menu.HasSaveGameFinished | static
| 03DA | NO_SPECIAL_CAMERA_FOR_THIS_GARAGE | Garage.NoSpecialCameraForThisGarage
| 03DB | ADD_BLIP_FOR_PICKUP_OLD | Blip.AddForPickupOld | constructor
| 03DC | ADD_BLIP_FOR_PICKUP | Blip.AddForPickup | constructor
| 03DD | ADD_SPRITE_BLIP_FOR_PICKUP | Blip.AddSpriteForPickup | constructor
| 03DE | SET_PED_DENSITY_MULTIPLIER | World.SetPedDensityMultiplier | static
| 03DF | FORCE_RANDOM_PED_TYPE | World.ForceRandomPedType | static
| 03E0 | SET_TEXT_DRAW_BEFORE_FADE | Text.SetDrawBeforeFade | static
| 03E1 | GET_COLLECTABLE1S_COLLECTED | World.GetCollectable1SCollected | static
| 03E2 | REGISTER_EL_BURRO_TIME | Stat.RegisterElBurroTime | static
| 03E3 | SET_SPRITES_DRAW_BEFORE_FADE | Screen.SetSpritesDrawBeforeFade
| 03E4 | SET_TEXT_RIGHT_JUSTIFY | Text.SetRightJustify | static
| 03E5 | PRINT_HELP | Text.PrintHelp | static
| 03E6 | CLEAR_HELP | Text.ClearHelp | static
| 03E7 | FLASH_HUD_OBJECT | Screen.FlashHudObject | static
| 03E8 | FLASH_RADAR_BLIP | Screen.FlashRadarBlip | static
| 03E9 | IS_CHAR_IN_CONTROL | Char.IsInControl
| 03EA | SET_GENERATE_CARS_AROUND_CAMERA | Camera.SetGenerateCarsAround | static
| 03EB | CLEAR_SMALL_PRINTS | Text.ClearSmallPrints
| 03EC | HAS_MILITARY_CRANE_COLLECTED_ALL_CARS | Crane.HasMilitaryCraneCollectedAllCars | static
| 03ED | SET_UPSIDEDOWN_CAR_NOT_DAMAGED | Car.SetUpsidedownNotDamaged
| 03EE | CAN_PLAYER_START_MISSION | Player.CanStartMission
| 03EF | MAKE_PLAYER_SAFE_FOR_CUTSCENE | Player.MakeSafeForCutscene
| 03F0 | USE_TEXT_COMMANDS | Screen.UseTextCommands | static
| 03F1 | SET_THREAT_FOR_PED_TYPE | Game.SetThreatForPedType | static
| 03F2 | CLEAR_THREAT_FOR_PED_TYPE | Game.ClearThreatForPedType | static
| 03F3 | GET_CAR_COLOURS | Car.GetColours
| 03F4 | SET_ALL_CARS_CAN_BE_DAMAGED | Game.SetAllCarsCanBeDamaged | static
| 03F5 | SET_CAR_CAN_BE_DAMAGED | Car.SetCanBeDamaged
| 03F6 | MAKE_PLAYER_UNSAFE | Player.MakeUnsafe
| 03F7 | LOAD_COLLISION | Streaming.LoadCollision | static
| 03F8 | GET_BODY_CAST_HEALTH | Object.GetBodyCastHealth
| 03F9 | SET_CHARS_CHATTING | Char.ChatWith | ?
| 03FA | MAKE_PLAYER_SAFE | Player.MakeSafe
| 03FB | SET_CAR_STAYS_IN_CURRENT_LEVEL | Car.SetStaysInCurrentLevel
| 03FC | SET_CHAR_STAYS_IN_CURRENT_LEVEL | Char.SetStaysInCurrentLevel
| 03FD | REGISTER_4X4_ONE_TIME | Stat.Register4X4OneTime | static
| 03FE | REGISTER_4X4_TWO_TIME | Stat.Register4X4TwoTime | static
| 03FF | REGISTER_4X4_THREE_TIME | Stat.Register4X4ThreeTime | static
| 03FE | SET_CHAR_MONEY | Char.SetMoney
| 0400 | REGISTER_4X4_MAYHEM_TIME | Stat.Register4X4MayhemTime | static
| 0401 | REGISTER_LIFE_SAVED | Stat.RegisterLifeSaved | static
| 0402 | REGISTER_CRIMINAL_CAUGHT | Stat.RegisterCriminalCaught | static
| 0403 | REGISTER_AMBULANCE_LEVEL | Stat.RegisterAmbulanceLevel | static
| 0404 | REGISTER_FIRE_EXTINGUISHED | Stat.RegisterFireExtinguished | static
| 0405 | TURN_PHONE_ON | PhoneInfo.TurnPhoneOn | static
| 0406 | REGISTER_LONGEST_DODO_FLIGHT | Stat.RegisterLongestDodoFlight | static
| 0407 | COMMAND_REGISTER_DEFUSE_BOMB_TIME | Stat.RegisterDefuseBombTime | static
| 0408 | SET_TOTAL_NUMBER_OF_KILL_FRENZIES | Stat.SetTotalNumberOfKillFrenzies | static
| 0409 | BLOW_UP_RC_BUGGY | Rc.BlowUpRcBuggy | static
| 040A | REMOVE_CAR_FROM_CHASE | ChaseScene.RemoveCarFromChase | static
| 040B | IS_FRENCH_GAME | Game.IsFrench | static
| 040C | IS_GERMAN_GAME | Game.IsGerman | static
| 040D | CLEAR_MISSION_AUDIO | Audio.ClearMissionAudio | static
| 040E | SET_FADE_IN_AFTER_NEXT_ARREST | Restart.SetFadeInAfterNextArrest | static
| 040F | SET_FADE_IN_AFTER_NEXT_DEATH | Restart.SetFadeInAfterNextDeath | static
| 0410 | SET_GANG_PED_MODEL_PREFERENCE | Gang.SetPedModelPreference | static
| 0411 | SET_CHAR_USE_PEDNODE_SEEK | Char.SetUsePednodeSeek
| 0412 | SWITCH_VEHICLE_WEAPONS | Vehicle.SwitchWeapons
| 0413 | SET_GET_OUT_OF_JAIL_FREE | Game.SetGetOutOfJailFree | static
| 0414 | SET_FREE_HEALTH_CARE | Game.SetFreeHealthCare | static
| 0415 | IS_CAR_DOOR_CLOSED | Car.IsDoorClosed
| 0416 | LOAD_AND_LAUNCH_MISSION | keyword
| 0417 | LOAD_AND_LAUNCH_MISSION_INTERNAL | keyword
| 0418 | SET_OBJECT_DRAW_LAST | Object.SetDrawLast
| 0419 | GET_AMMO_IN_PLAYER_WEAPON | Player.GetAmmoInWeapon
| 041A | GET_AMMO_IN_CHAR_WEAPON | Char.GetAmmoInWeapon
| 041B | REGISTER_KILL_FRENZY_PASSED | Stat.RegisterKillFrenzyPassed | static
| 041C | SET_CHAR_SAY | Char.SetSay
| 041D | SET_NEAR_CLIP | Camera.SetNearClip | static
| 041E | SET_RADIO_CHANNEL | Audio.SetRadioChannel | static
| 041F | OVERRIDE_HOSPITAL_LEVEL | Restart.OverrideHospitalLevel | static
| 0420 | OVERRIDE_POLICE_STATION_LEVEL | Restart.OverridePoliceStationLevel | static
| 0421 | FORCE_RAIN | Weather.ForceRain | static
| 0422 | DOES_GARAGE_CONTAIN_CAR | Garage.DoesContainCar
| 0423 | SET_CAR_TRACTION | Car.SetTraction
| 0424 | ARE_MEASUREMENTS_IN_METRES | Game.AreMeasurementsInMetres | static
| 0425 | CONVERT_METRES_TO_FEET | ConvertMetresToFeet | util
| 0426 | MARK_ROADS_BETWEEN_LEVELS | Paths.MarkRoadsBetweenLevels | static
| 0427 | MARK_PED_ROADS_BETWEEN_LEVELS | Paths.MarkPedRoadsBetweenLevels | static
| 0428 | SET_CAR_AVOID_LEVEL_TRANSITIONS | Car.SetAvoidLevelTransitions
| 0429 | SET_CHAR_AVOID_LEVEL_TRANSITIONS | Char.SetCharAvoidLevelTransitions
| 042A | IS_THREAT_FOR_PED_TYPE | Game.IsThreatForPedType | static
| 042B | CLEAR_AREA_OF_CHARS | World.ClearAreaOfChars | static
| 042C | SET_TOTAL_NUMBER_OF_MISSIONS | Stat.SetTotalNumberOfMissions | static
| 042D | CONVERT_METRES_TO_FEET_INT | ConvertMetresToFeetInt | util
| 042E | REGISTER_FASTEST_TIME | Stat.RegisterFastestTime | static
| 042F | REGISTER_HIGHEST_SCORE | Stat.RegisterHighestScore | static
| 0430 | WARP_CHAR_INTO_CAR_AS_PASSENGER | Char.WarpIntoCarAsPassenger
| 0431 | IS_CAR_PASSENGER_SEAT_FREE | Car.IsPassengerSeatFree
| 0432 | GET_CHAR_IN_CAR_PASSENGER_SEAT | Char.GetInCarPassengerSeat
| 0433 | SET_CHAR_IS_CHRIS_CRIMINAL | Char.SetIsChrisCriminal
| 0434 | START_CREDITS | Credits.Start | static
| 0435 | STOP_CREDITS | Credits.Stop | static
| 0436 | ARE_CREDITS_FINISHED | Credits.AreFinished | static
| 0437 | CREATE_SINGLE_PARTICLE | Particles.CreateSingleParticle | static
| 0438 | SET_CHAR_IGNORE_LEVEL_TRANSITIONS | Char.SetIgnoreLevelTransitions
| 0439 | GET_CHASE_CAR | ChaseScene.GetChaseCar | static
| 043A | START_BOAT_FOAM_ANIMATION | Particles.StartBoatFoamAnimation | static
| 043B | UPDATE_BOAT_FOAM_ANIMATION | Particles.UpdateBoatFoamAnimation | static
| 043C | SET_MUSIC_DOES_FADE | Audio.SetMusicDoesFade | static
| 043D | SET_INTRO_IS_PLAYING | Game.SetIntroIsPlaying | static
| 043E | SET_PLAYER_HOOKER | Player.SetHooker
| 043F | PLAY_END_OF_GAME_TUNE | Audio.PlayEndOfGameTune | static
| 0440 | STOP_END_OF_GAME_TUNE | Audio.StopEndOfGameTune | static
| 0441 | GET_CAR_MODEL | Car.GetModel
| 0442 | IS_PLAYER_SITTING_IN_CAR | Player.IsSittingInCar
| 0443 | IS_PLAYER_SITTING_IN_ANY_CAR | Player.IsSittingInAnyCar
| 0444 | SET_SCRIPT_FIRE_AUDIO | ScriptFire.SetAudio
| 0445 | ARE_ANY_CAR_CHEATS_ACTIVATED | Game.AreAnyCarCheatsActivated
| 0446 | SET_CHAR_SUFFERS_CRITICAL_HITS | Char.SetSuffersCriticalHits
| 0447 | IS_PLAYER_LIFTING_A_PHONE | Player.IsLiftingAPhone
| 0448 | IS_CHAR_SITTING_IN_CAR | Char.IsSittingInCar
| 0449 | IS_CHAR_SITTING_IN_ANY_CAR | Char.IsSittingInAnyCar
| 044A | IS_PLAYER_ON_FOOT | Player.IsOnFoot
| 044B | IS_CHAR_ON_FOOT | Char.IsOnFoot
| 044C | LOAD_COLLISION_WITH_SCREEN | Streaming.LoadCollisionWithScreen | static
| 044D | LOAD_SPLASH_SCREEN | Screen.LoadSplash | static
| 044E | SET_CAR_IGNORE_LEVEL_TRANSITIONS | Car.SetIgnoreLevelTransitions
| 044F | MAKE_CRAIGS_CAR_A_BIT_STRONGER | Car.MakeABitStronger
| 0450 | SET_JAMES_CAR_ON_PATH_TO_PLAYER | Car.SetOnPathToPlayer
| 0451 | LOAD_END_OF_GAME_TUNE | Audio.LoadEndOfGameTune | static
| 0452 | ENABLE_PLAYER_CONTROL_CAMERA | Camera.EnablePlayerControl | static
| 0453 | SET_OBJECT_ROTATION | Object.SetRotation
| 0454 | GET_DEBUG_CAMERA_COORDINATES | Camera.GetDebugCoordinates | static
| 0455 | GET_DEBUG_CAMERA_FRONT_VECTOR | Camera.GetDebugFrontVector | static
| 0456 | IS_PLAYER_TARGETTING_ANY_CHAR | Player.IsTargettingAnyChar
| 0457 | IS_PLAYER_TARGETTING_CHAR | Player.IsTargettingChar
| 0458 | IS_PLAYER_TARGETTING_OBJECT | Player.IsTargettingObject
| 0459 | TERMINATE_ALL_SCRIPTS_WITH_THIS_NAME | keyword
| 045A | DISPLAY_TEXT_WITH_NUMBER | Text.DisplayWithNumber
| 045B | DISPLAY_TEXT_WITH_2_NUMBERS | Text.DisplayWith2Numbers
| 045C | FAIL_CURRENT_MISSION | Game.FailCurrentMission | static
| 045D | GET_CLOSEST_OBJECT_OF_TYPE | World.GetClosestObjectOfType | static
| 045E | PLACE_OBJECT_RELATIVE_TO_OBJECT | World.PlaceObjectRelativeToObject | static
| 045F | SET_ALL_OCCUPANTS_OF_CAR_LEAVE_CAR | Car.SetAllOccupantsLeave
| 0460 | SET_INTERPOLATION_PARAMETERS | Camera.SetInterpolationParameters | static
| 0461 | GET_CLOSEST_CAR_NODE_WITH_HEADING_TOWARDS_POINT | Paths.GetClosestCarNodeWithHeadingTowardsPoint | static
| 0462 | GET_CLOSEST_CAR_NODE_WITH_HEADING_AWAY_POINT | Paths.GetClosestCarNodeWithHeadingAwayPoint | static
| 0463 | GET_DEBUG_CAMERA_POINT_AT | Camera.GetDebugCameraPointAt | static
| 0464 | ATTACH_CHAR_TO_CAR | Char.AttachToCar
| 0465 | DETACH_CHAR_FROM_CAR | Char.DetachFromCar
| 0466 | SET_CAR_STAY_IN_FAST_LANE | Car.SetStayInFastLane
| 0467 | CLEAR_CHAR_LAST_WEAPON_DAMAGE | Char.ClearLastWeaponDamage
| 0468 | CLEAR_CAR_LAST_WEAPON_DAMAGE | Car.ClearLastWeaponDamage
| 0469 | GET_RANDOM_COP_IN_AREA | World.GetRandomCopInArea | static
| 046A | GET_RANDOM_COP_IN_ZONE | World.GetRandomCopInZone | static
| 046B | SET_CHAR_OBJ_FLEE_CAR | Char.SetObjFleeCar
| 046C | GET_DRIVER_OF_CAR | Car.GetDriver
| 046D | GET_NUMBER_OF_FOLLOWERS | Char.GetNumberOfFollowers
| 046E | GIVE_REMOTE_CONTROLLED_MODEL_TO_PLAYER | Rc.GiveModelToPlayer
| 046F | GET_CURRENT_PLAYER_WEAPON | Player.GetCurrentWeapon
| 0470 | GET_CURRENT_CHAR_WEAPON | Char.GetCurrentWeapon
| 0471 | LOCATE_CHAR_ANY_MEANS_OBJECT_2D | Char.LocateAnyMeansObject2D
| 0472 | LOCATE_CHAR_ON_FOOT_OBJECT_2D | Char.LocateOnFootObject2D
| 0473 | LOCATE_CHAR_IN_CAR_OBJECT_2D | Char.LocateInCarObject2D
| 0474 | LOCATE_CHAR_ANY_MEANS_OBJECT_3D | Char.LocateAnyMeansObject3D
| 0475 | LOCATE_CHAR_ON_FOOT_OBJECT_3D | Char.LocateOnFootObject3D
| 0476 | LOCATE_CHAR_IN_CAR_OBJECT_3D | Char.LocateInCarObject3D
| 0477 | SET_CAR_TEMP_ACTION | Car.SetTempAction
| 0478 | SET_CAR_HANDBRAKE_TURN_RIGHT | Car.SetHandbrakeTurnRight
| 0479 | SET_CAR_HANDBRAKE_STOP | Car.SetHandbrakeStop
| 047A | IS_CHAR_ON_ANY_BIKE | Char.IsOnAnyBike
| 047B | LOCATE_SNIPER_BULLET_2D | World.LocateSniperBullet2D | static
| 047C | LOCATE_SNIPER_BULLET_3D | World.LocateSniperBullet3D | static
| 047D | GET_NUMBER_OF_SEATS_IN_MODEL | Car.GetNumberOfSeatsInModel | static ?
| 047E | IS_PLAYER_ON_ANY_BIKE | Player.IsOnAnyBike
| 047F | IS_CHAR_LYING_DOWN | Char.IsLyingDown
| 0480 | CAN_CHAR_SEE_DEAD_CHAR | Char.CanSeeDeadChar
| 0481 | SET_ENTER_CAR_RANGE_MULTIPLIER | Char.SetEnterCarRangeMultiplier | static
| 0482 | SET_THREAT_REACTION_RANGE_MULTIPLIER | Char.SetThreatReactionRangeMultiplier | static