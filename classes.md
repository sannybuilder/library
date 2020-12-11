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
| 0054 | GET_PLAYER_COORDINATES | Player.GetCoordinates | getter Player.Pos
| 0055 | SET_PLAYER_COORDINATES | Player.SetCoordinates | setter Player.Pos
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
| 00A0 | GET_CHAR_COORDINATES | Char.GetCoordinates | getter Char.Pos
| 00A1 | SET_CHAR_COORDINATES | Char.SetCoordinates | setter Char.Pos
| 00A2 | IS_CHAR_STILL_ALIVE | Char.IsStillAlive
| 00A3 | IS_CHAR_IN_AREA_2D | Char.IsInArea2d
| 00A4 | IS_CHAR_IN_AREA_3D | Char.IsInArea3d
| 00A5 | CREATE_CAR | Car.Create | constructor
| 00A6 | DELETE_CAR | Car.Delete | destructor
| 00A7 | CAR_GOTO_COORDINATES | Car.Goto
| 00A8 | CAR_WANDER_RANDOMLY | Car.WanderRandomly
| 00A9 | CAR_SET_IDLE | Car.SetIdle
| 00AA | GET_CAR_COORDINATES | Car.GetCoordinates | getter Car.Pos
| 00AB | SET_CAR_COORDINATES | Car.SetCoordinates | setter Car.Pos
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
| 00BF | GET_TIME_OF_DAY | Clock.GetTimeOfDay | static, getter Clock.TimeOfDay
| 00C0 | SET_TIME_OF_DAY | Clock.SetTimeOfDay | static, setter Clock.TimeOfDay
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
| 00D9 | STORE_CAR_CHAR_IS_IN | Char.StoreCarIsIn | getter Char.MissionCar
| 00DA | STORE_CAR_PLAYER_IS_IN | Player.StoreCarIsIn | getter Player.MissionCar
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
| 010B | STORE_SCORE | Player.StoreScore | getter Player.Score
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
| 0170 | GET_PLAYER_HEADING | Player.GetHeading | getter Player.Heading
| 0171 | SET_PLAYER_HEADING | Player.SetHeading | setter Player.Heading 
| 0172 | GET_CHAR_HEADING | Char.GetHeading | getter Char.Heading 
| 0173 | SET_CHAR_HEADING | Char.SetHeading | setter Char.Heading 
| 0174 | GET_CAR_HEADING | Car.GetHeading | getter Car.Heading
| 0175 | SET_CAR_HEADING | Car.SetHeading | setter Car.Heading
| 0176 | GET_OBJECT_HEADING | Object.GetHeading | getter Object.Heading
| 0177 | SET_OBJECT_HEADING | Object.SetHeading | setter Object.Heading 
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
| 01BB | GET_OBJECT_COORDINATES | Object.GetCoordinates | getter Object.Pos
| 01BC | SET_OBJECT_COORDINATES | Object.SetCoordinates | setter Object.Pos
| 01BD | GET_GAME_TIMER | Clock.GetGameTimer | static
| 01BE | TURN_CHAR_TO_FACE_COORD | Char.TurnToFaceCoord
| 01BF | TURN_PLAYER_TO_FACE_COORD | Player.TurnToFaceCoord
| 01C0 | STORE_WANTED_LEVEL | Player.StoreWantedLevel | getter Player.WanterLevel
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
| 01E9 | GET_NUMBER_OF_PASSENGERS | Car.GetNumberOfPassengers | getter Car.NumberOfPassengers
| 01EA | GET_MAXIMUM_NUMBER_OF_PASSENGERS | Car.GetMaximumNumberOfPassengers | getter Car.MaximumNumberOfPassengers 
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
| 01F5 | GET_PLAYER_CHAR | Player.GetChar | getter Player.Char
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
| 0222 | SET_PLAYER_HEALTH | Player.SetHealth | setter Player.Health
| 0223 | SET_CHAR_HEALTH | Char.SetHealth | setter Char.Health
| 0224 | SET_CAR_HEALTH | Car.SetHealth | setter Car.Health
| 0225 | GET_PLAYER_HEALTH | Player.GetHealth | getter Player.Health
| 0226 | GET_CHAR_HEALTH | Char.GetHealth | getter Char.Health
| 0227 | GET_CAR_HEALTH | Car.GetHealth | getter Car.Health
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
| 037F | GIVE_PLAYER_DETONATOR | ???.GivePlayerDetonator | static
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
| 03BF | SET_EVERYONE_IGNORE_PLAYER | ???.SetEveryoneIgnorePlayer
| 03C0 | STORE_CAR_CHAR_IS_IN_NO_SAVE | Car.StoreCharIsInNoSave
| 03C1 | STORE_CAR_PLAYER_IS_IN_NO_SAVE | Car.StorePlayerIsInNoSave
| 03C2 | IS_PHONE_DISPLAYING_MESSAGE | PhoneInfo.IsDisplayingMessage
| 03C3 | DISPLAY_ONSCREEN_TIMER_WITH_STRING | Screen.DisplayOnscreenTimerWithString | static
| 03C4 | DISPLAY_ONSCREEN_COUNTER_WITH_STRING | Screen.DisplayOnscreenCounterWithString | static
| 03C5 | CREATE_RANDOM_CAR_FOR_CAR_PARK | World.CreateRandomCarForCarPark | static
| 03C6 | IS_COLLISION_IN_MEMORY | ???.IsCollisionInMemory
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
| 03E2 | SET_CHAR_OBJ_LEAVE_ANY_CAR | Char.SetObjLeaveAnyCar
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
| 03F1 | SET_THREAT_FOR_PED_TYPE | ???.SetThreatForPedType | static
| 03F2 | CLEAR_THREAT_FOR_PED_TYPE | ???.ClearThreatForPedType | static
| 03F3 | GET_CAR_COLOURS | Car.GetColours
| 03F4 | SET_ALL_CARS_CAN_BE_DAMAGED | World.SetAllCarsCanBeDamaged | static
| 03F5 | SET_CAR_CAN_BE_DAMAGED | Car.SetCanBeDamaged
| 03F6 | MAKE_PLAYER_UNSAFE | Player.MakeUnsafe
| 03F7 | LOAD_COLLISION | Streaming.LoadCollision | static
| 03F8 | GET_BODY_CAST_HEALTH | Object.GetBodyCastHealth
| 03F9 | SET_CHARS_CHATTING | ???.SetCharsChatting
| 03FA | MAKE_PLAYER_SAFE | Player.MakeSafe
| 03FB | SET_CAR_STAYS_IN_CURRENT_LEVEL | Car.SetStaysInCurrentLevel
| 03FC | SET_CHAR_STAYS_IN_CURRENT_LEVEL | Char.SetStaysInCurrentLevel
| 03FD | REGISTER_4X4_ONE_TIME | Stat.Register4X4OneTime | static
| 03FD | SET_DRUNK_INPUT_DELAY | Player.SetDrunkInputDelay
| 03FE | REGISTER_4X4_TWO_TIME | Stat.Register4X4TwoTime | static
| 03FF | INCREASE_CHAR_MONEY | Char.IncreaseMoney
| 03FF | REGISTER_4X4_THREE_TIME | Stat.Register4X4ThreeTime | static
| 03FE | SET_CHAR_MONEY | Char.SetMoney
| 0400 | REGISTER_4X4_MAYHEM_TIME | Stat.Register4X4MayhemTime | static
| 0400 | GET_OFFSET_FROM_OBJECT_IN_WORLD_COORDS | ???.GetOffsetFromObjectInWorldCoords
| 0401 | REGISTER_LIFE_SAVED | Stat.RegisterLifeSaved | static
| 0402 | REGISTER_CRIMINAL_CAUGHT | Stat.RegisterCriminalCaught | static
| 0403 | REGISTER_AMBULANCE_LEVEL | Stat.RegisterAmbulanceLevel | static
| 0404 | REGISTER_FIRE_EXTINGUISHED | Stat.RegisterFireExtinguished | static
| 0405 | TURN_PHONE_ON | PhoneInfo.TurnPhoneOn | static
| 0406 | REGISTER_LONGEST_DODO_FLIGHT | Stat.RegisterLongestDodoFlight | static
| 0407 | GET_OFFSET_FROM_CAR_IN_WORLD_COORDS | ???.GetOffsetFromCarInWorldCoords
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
| 042A | IS_THREAT_FOR_PED_TYPE | ???.IsThreatForPedType
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
| 044C | LOAD_COLLISION_WITH_SCREEN | ???.LoadCollisionWithScreen
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
| 045E | PLACE_OBJECT_RELATIVE_TO_OBJECT | ???.PlaceObjectRelativeToObject
| 045F | SET_ALL_OCCUPANTS_OF_CAR_LEAVE_CAR | Car.SetAllOccupantsLeave
| 0460 | SET_INTERPOLATION_PARAMETERS | Camera.SetInterpolationParameters | static
| 0461 | GET_CLOSEST_CAR_NODE_WITH_HEADING_TOWARDS_POINT |
| 0462 | GET_CLOSEST_CAR_NODE_WITH_HEADING_AWAY_POINT |
| 0463 | GET_DEBUG_CAMERA_POINT_AT |
| 0464 | ATTACH_CHAR_TO_CAR |
| 0465 | DETACH_CHAR_FROM_CAR |
| 0466 | SET_CAR_STAY_IN_FAST_LANE |
| 0467 | CLEAR_CHAR_LAST_WEAPON_DAMAGE |
| 0468 | CLEAR_CAR_LAST_WEAPON_DAMAGE |
| 0469 | GET_RANDOM_COP_IN_AREA |
| 046A | GET_RANDOM_COP_IN_ZONE |
| 046B | SET_CHAR_OBJ_FLEE_CAR |
| 046C | GET_DRIVER_OF_CAR |
| 046D | GET_NUMBER_OF_FOLLOWERS |
| 046E | GIVE_REMOTE_CONTROLLED_MODEL_TO_PLAYER |
| 046F | GET_CURRENT_PLAYER_WEAPON |
| 0470 | GET_CURRENT_CHAR_WEAPON |
| 0471 | LOCATE_CHAR_ANY_MEANS_OBJECT_2D |
| 0472 | LOCATE_CHAR_ON_FOOT_OBJECT_2D |
| 0473 | LOCATE_CHAR_IN_CAR_OBJECT_2D |
| 0474 | LOCATE_CHAR_ANY_MEANS_OBJECT_3D |
| 0475 | LOCATE_CHAR_ON_FOOT_OBJECT_3D |
| 0476 | LOCATE_CHAR_IN_CAR_OBJECT_3D |
| 0477 | SET_CAR_TEMP_ACTION |
| 0478 | SET_CAR_HANDBRAKE_TURN_RIGHT |
| 0479 | SET_CAR_HANDBRAKE_STOP |
| 047A | IS_CHAR_ON_ANY_BIKE |
| 047B | LOCATE_SNIPER_BULLET_2D |
| 047C | LOCATE_SNIPER_BULLET_3D |
| 047D | GET_NUMBER_OF_SEATS_IN_MODEL |
| 047E | IS_PLAYER_ON_ANY_BIKE |
| 047F | IS_CHAR_LYING_DOWN |
| 0480 | CAN_CHAR_SEE_DEAD_CHAR |
| 0481 | SET_ENTER_CAR_RANGE_MULTIPLIER |
| 0482 | SET_THREAT_REACTION_RANGE_MULTIPLIER |
| 0483 | SET_CHAR_CEASE_ATTACK_TIMER |
| 0484 | GET_REMOTE_CONTROLLED_CAR |
| 0485 | IS_PC_VERSION |
| 0486 | REPLAY |
| 0487 | IS_REPLAY_PLAYING |
| 0488 | IS_MODEL_AVAILABLE |
| 0489 | SHUT_CHAR_UP |
| 048A | SET_ENABLE_RC_DETONATE |
| 048B | SET_CAR_RANDOM_ROUTE_SEED |
| 048C | IS_ANY_PICKUP_AT_COORDS |
| 048D | GET_FIRST_PICKUP_COORDS |
| 048E | GET_NEXT_PICKUP_COORDS |
| 048F | REMOVE_ALL_CHAR_WEAPONS |
| 0490 | HAS_PLAYER_GOT_WEAPON |
| 0491 | HAS_CHAR_GOT_WEAPON |
| 0492 | IS_PLAYER_FACING_CHAR |
| 0493 | SET_TANK_DETONATE_CARS |
| 0494 | GET_POSITION_OF_ANALOGUE_STICKS |
| 0495 | IS_CAR_ON_FIRE |
| 0496 | IS_CAR_TYRE_BURST |
| 0497 | SET_CAR_DRIVE_STRAIGHT_AHEAD |
| 0498 | SET_CAR_WAIT |
| 0499 | IS_PLAYER_STANDING_ON_A_VEHICLE |
| 049A | IS_PLAYER_FOOT_DOWN |
| 049B | IS_CHAR_FOOT_DOWN |
| 049C | INITIALISE_OBJECT_PATH |
| 049D | START_OBJECT_ON_PATH |
| 049E | SET_OBJECT_PATH_SPEED |
| 049F | SET_OBJECT_PATH_POSITION |
| 04A0 | GET_OBJECT_DISTANCE_ALONG_PATH |
| 04A1 | CLEAR_OBJECT_PATH |
| 04A2 | HELI_GOTO_COORDS |
| 04A3 | IS_INT_VAR_EQUAL_TO_CONSTANT |
| 04A4 | IS_INT_LVAR_EQUAL_TO_CONSTANT |
| 04A5 | GET_DEAD_CHAR_PICKUP_COORDS |
| 04A6 | CREATE_PROTECTION_PICKUP |
| 04A7 | IS_CHAR_IN_ANY_BOAT |
| 04A8 | IS_PLAYER_IN_ANY_BOAT |
| 04A9 | IS_CHAR_IN_ANY_HELI |
| 04AA | IS_PLAYER_IN_ANY_HELI |
| 04AB | IS_CHAR_IN_ANY_PLANE |
| 04AC | IS_PLAYER_IN_ANY_PLANE |
| 04AD | IS_CHAR_IN_WATER |
| 04AE | SET_VAR_INT_TO_CONSTANT |
| 04AF | SET_LVAR_INT_TO_CONSTANT |
| 04B0 | IS_INT_VAR_GREATER_THAN_CONSTANT |
| 04B1 | IS_INT_LVAR_GREATER_THAN_CONSTANT |
| 04B2 | IS_CONSTANT_GREATER_THAN_INT_VAR |
| 04B3 | IS_CONSTANT_GREATER_THAN_INT_LVAR |
| 04B4 | IS_INT_VAR_GREATER_OR_EQUAL_TO_CONSTANT |
| 04B5 | IS_INT_LVAR_GREATER_OR_EQUAL_TO_CONSTANT |
| 04B6 | IS_CONSTANT_GREATER_OR_EQUAL_TO_INT_VAR |
| 04B7 | IS_CONSTANT_GREATER_OR_EQUAL_TO_INT_LVAR |
| 04B8 | GET_CHAR_WEAPON_IN_SLOT |
| 04B9 | GET_CLOSEST_STRAIGHT_ROAD |
| 04BA | SET_CAR_FORWARD_SPEED |
| 04BB | SET_AREA_VISIBLE |
| 04BC | SET_CUTSCENE_ANIM_TO_LOOP |
| 04BD | MARK_CAR_AS_CONVOY_CAR |
| 04BE | RESET_HAVOC_CAUSED_BY_PLAYER |
| 04BF | GET_HAVOC_CAUSED_BY_PLAYER |
| 04C0 | CREATE_SCRIPT_ROADBLOCK |
| 04C1 | CLEAR_ALL_SCRIPT_ROADBLOCKS |
| 04C2 | SET_CHAR_OBJ_WALK_TO_CHAR |
| 04C3 | IS_PICKUP_IN_ZONE |
| 04C4 | GET_OFFSET_FROM_CHAR_IN_WORLD_COORDS |
| 04C5 | HAS_CHAR_BEEN_PHOTOGRAPHED |
| 04C6 | SET_CHAR_OBJ_AIM_GUN_AT_CHAR |
| 04C7 | SWITCH_SECURITY_CAMERA |
| 04C8 | IS_CHAR_IN_FLYING_VEHICLE |
| 04C9 | IS_PLAYER_IN_FLYING_VEHICLE |
| 04CA | HAS_SONY_CD_BEEN_READ |
| 04CB | GET_NUMBER_OF_SONY_CDS_READ |
| 04CC | ADD_SHORT_RANGE_BLIP_FOR_COORD_OLD |
| 04CD | ADD_SHORT_RANGE_BLIP_FOR_COORD |
| 04CE | ADD_SHORT_RANGE_SPRITE_BLIP_FOR_COORD |
| 04CF | ADD_MONEY_SPENT_ON_CLOTHES |
| 04D0 | SET_HELI_ORIENTATION |
| 04D1 | CLEAR_HELI_ORIENTATION |
| 04D2 | PLANE_GOTO_COORDS |
| 04D3 | GET_NTH_CLOSEST_CAR_NODE |
| 04D4 | GET_NTH_CLOSEST_CHAR_NODE |
| 04D5 | DRAW_WEAPONSHOP_CORONA |
| 04D6 | SET_ENABLE_RC_DETONATE_ON_CONTACT |
| 04D7 | FREEZE_CHAR_POSITION |
| 04D8 | SET_CHAR_DROWNS_IN_WATER |
| 04D9 | SET_OBJECT_RECORDS_COLLISIONS |
| 04DA | HAS_OBJECT_COLLIDED_WITH_ANYTHING |
| 04DB | REMOVE_RC_BUGGY |
| 04DC | HAS_PHOTOGRAPH_BEEN_TAKEN |
| 04DD | GET_CHAR_ARMOUR |
| 04DE | SET_CHAR_ARMOUR |
| 04DF | SET_HELI_STABILISER |
| 04E0 | SET_CAR_STRAIGHT_LINE_DISTANCE |
| 04E1 | POP_CAR_BOOT |
| 04E2 | SHUT_PLAYER_UP |
| 04E3 | SET_PLAYER_MOOD |
| 04E4 | REQUEST_COLLISION |
| 04E5 | LOCATE_OBJECT_2D |
| 04E6 | LOCATE_OBJECT_3D |
| 04E7 | IS_OBJECT_IN_WATER |
| 04E8 | SET_CHAR_OBJ_STEAL_ANY_CAR_EVEN_MISSION_CAR |
| 04E9 | IS_OBJECT_IN_AREA_2D |
| 04EA | IS_OBJECT_IN_AREA_3D |
| 04EB | TASK_TOGGLE_DUCK |
| 04EC | SET_ZONE_CIVILIAN_CAR_INFO |
| 04ED | REQUEST_ANIMATION |
| 04EE | HAS_ANIMATION_LOADED |
| 04EF | REMOVE_ANIMATION |
| 04F0 | IS_CHAR_WAITING_FOR_WORLD_COLLISION |
| 04F1 | IS_CAR_WAITING_FOR_WORLD_COLLISION |
| 04F2 | IS_OBJECT_WAITING_FOR_WORLD_COLLISION |
| 04F3 | SET_CHAR_SHUFFLE_INTO_DRIVERS_SEAT |
| 04F4 | ATTACH_CHAR_TO_OBJECT |
| 04F5 | SET_CHAR_AS_PLAYER_FRIEND |
| 04F6 | DISPLAY_NTH_ONSCREEN_COUNTER |
| 04F7 | DISPLAY_NTH_ONSCREEN_COUNTER_WITH_STRING |
| 04F8 | ADD_SET_PIECE |
| 04F9 | SET_EXTRA_COLOURS |
| 04FA | CLEAR_EXTRA_COLOURS |
| 04FB | CLOSE_CAR_BOOT |
| 04FC | GET_WHEELIE_STATS |
| 04FD | DISARM_CHAR |
| 04FE | BURST_CAR_TYRE |
| 04FF | IS_CHAR_OBJ_NO_OBJ |
| 0500 | IS_PLAYER_WEARING |
| 0501 | SET_PLAYER_CAN_DO_DRIVE_BY |
| 0502 | SET_CHAR_OBJ_SPRINT_TO_COORD |
| 0503 | CREATE_SWAT_ROPE |
| 0504 | SET_FIRST_PERSON_CONTROL_CAMERA |
| 0505 | GET_NEAREST_TYRE_TO_POINT |
| 0506 | SET_CAR_MODEL_COMPONENTS |
| 0507 | SWITCH_LIFT_CAMERA |
| 0508 | CLOSE_ALL_CAR_DOORS |
| 0509 | GET_DISTANCE_BETWEEN_COORDS_2D |
| 050A | GET_DISTANCE_BETWEEN_COORDS_3D |
| 050B | POP_CAR_BOOT_USING_PHYSICS |
| 050C | SET_FIRST_PERSON_WEAPON_CAMERA |
| 050D | IS_CHAR_LEAVING_VEHICLE_TO_DIE |
| 050E | SORT_OUT_OBJECT_COLLISION_WITH_CAR |
| 050F | GET_MAX_WANTED_LEVEL |
| 0510 | IS_CHAR_WANDER_PATH_CLEAR |
| 0511 | PRINT_HELP_WITH_NUMBER |
| 0512 | PRINT_HELP_FOREVER |
| 0513 | PRINT_HELP_FOREVER_WITH_NUMBER |
| 0514 | SET_CHAR_CAN_BE_DAMAGED_BY_MEMBERS_OF_GANG |
| 0515 | LOAD_AND_LAUNCH_MISSION_EXCLUSIVE |
| 0516 | IS_MISSION_AUDIO_PLAYING |
| 0517 | CREATE_LOCKED_PROPERTY_PICKUP |
| 0518 | CREATE_FORSALE_PROPERTY_PICKUP |
| 0519 | FREEZE_CAR_POSITION |
| 051A | HAS_CHAR_BEEN_DAMAGED_BY_CHAR |
| 051B | HAS_CHAR_BEEN_DAMAGED_BY_CAR |
| 051C | HAS_CAR_BEEN_DAMAGED_BY_CHAR |
| 051D | HAS_CAR_BEEN_DAMAGED_BY_CAR |
| 051E | GET_RADIO_CHANNEL |
| 051F | DISPLAY_TEXT_WITH_3_NUMBERS |
| 0520 | IS_CAR_DROWNING_IN_WATER |
| 0521 | IS_CHAR_DROWNING_IN_WATER |
| 0522 | DISABLE_CUTSCENE_SHADOWS |
| 0523 | HAS_GLASS_BEEN_SHATTERED_NEARBY |
| 0524 | ATTACH_CUTSCENE_OBJECT_TO_BONE |
| 0525 | ATTACH_CUTSCENE_OBJECT_TO_COMPONENT |
| 0526 | SET_CHAR_STAY_IN_CAR_WHEN_JACKED |
| 0527 | IS_MISSION_AUDIO_LOADING |
| 0528 | ADD_MONEY_SPENT_ON_WEAPONS |
| 0529 | ADD_MONEY_SPENT_ON_PROPERTY |
| 052A | ADD_MONEY_SPENT_ON_AUTO_PAINTING |
| 052B | SET_CHAR_ANSWERING_MOBILE |
| 052C | SET_PLAYER_DRUNKENNESS |
| 052D | GET_PLAYER_DRUNKENNESS |
| 052E | SET_PLAYER_DRUG_LEVEL |
| 052F | GET_PLAYER_DRUG_LEVEL |
| 0530 | ADD_LOAN_SHARK_VISITS |
| 0531 | ADD_STORES_KNOCKED_OFF |
| 0532 | ADD_MOVIE_STUNTS |
| 0533 | ADD_NUMBER_OF_ASSASSINATIONS |
| 0534 | ADD_PIZZAS_DELIVERED |
| 0535 | ADD_GARBAGE_PICKUPS |
| 0536 | ADD_ICE_CREAMS_SOLD |
| 0537 | SET_TOP_SHOOTING_RANGE_SCORE |
| 0538 | ADD_SHOOTING_RANGE_RANK |
| 0539 | ADD_MONEY_SPENT_ON_GAMBLING |
| 053A | ADD_MONEY_WON_ON_GAMBLING |
| 053B | SET_LARGEST_GAMBLING_WIN |
| 053C | SET_CHAR_IN_PLAYERS_GROUP_CAN_FIGHT |
| 053D | CLEAR_CHAR_WAIT_STATE |
| 053E | GET_RANDOM_CAR_OF_TYPE_IN_AREA_NO_SAVE |
| 053F | SET_CAN_BURST_CAR_TYRES |
| 0540 | SET_PLAYER_AUTO_AIM |
| 0541 | FIRE_HUNTER_GUN |
| 0542 | SET_PROPERTY_AS_OWNED |
| 0543 | ADD_BLOOD_RING_KILLS |
| 0544 | SET_LONGEST_TIME_IN_BLOOD_RING |
| 0545 | REMOVE_EVERYTHING_FOR_HUGE_CUTSCENE |
| 0546 | IS_PLAYER_TOUCHING_VEHICLE |
| 0547 | IS_CHAR_TOUCHING_VEHICLE |
| 0548 | CHECK_FOR_PED_MODEL_AROUND_PLAYER |
| 0549 | CLEAR_CHAR_FOLLOW_PATH |
| 054A | SET_CHAR_CAN_BE_SHOT_IN_VEHICLE |
| 054B | ATTACH_CUTSCENE_OBJECT_TO_VEHICLE |
| 054C | LOAD_MISSION_TEXT |
| 054D | SET_TONIGHTS_EVENT |
| 054E | CLEAR_CHAR_LAST_DAMAGE_ENTITY |
| 054F | CLEAR_CAR_LAST_DAMAGE_ENTITY |
| 0550 | FREEZE_OBJECT_POSITION |
| 0551 | SET_PLAYER_HAS_MET_DEBBIE_HARRY |
| 0552 | SET_RIOT_INTENSITY |
| 0553 | IS_CAR_IN_ANGLED_AREA_2D |
| 0554 | IS_CAR_IN_ANGLED_AREA_3D |
| 0555 | REMOVE_WEAPON_FROM_CHAR |
| 0556 | SET_UP_TAXI_SHORTCUT |
| 0557 | CLEAR_TAXI_SHORTCUT |
| 0558 | SET_CHAR_OBJ_GOTO_CAR_ON_FOOT |
| 0559 | GET_CLOSEST_WATER_NODE |
| 055A | ADD_PORN_LEAFLET_TO_RUBBISH |
| 055B | CREATE_CLOTHES_PICKUP |
| 055C | CHANGE_BLIP_THRESHOLD |
| 055D | MAKE_PLAYER_FIRE_PROOF |
| 055E | INCREASE_PLAYER_MAX_HEALTH |
| 055F | INCREASE_PLAYER_MAX_ARMOUR |
| 0560 | CREATE_RANDOM_CHAR_AS_DRIVER |
| 0561 | CREATE_RANDOM_CHAR_AS_PASSENGER |
| 0562 | SET_CHAR_IGNORE_THREATS_BEHIND_OBJECTS |
| 0563 | ENSURE_PLAYER_HAS_DRIVE_BY_WEAPON |
| 0564 | MAKE_HELI_COME_CRASHING_DOWN |
| 0565 | ADD_EXPLOSION_NO_SOUND |
| 0566 | SET_OBJECT_AREA_VISIBLE |
| 0567 | WAS_VEHICLE_EVER_POLICE |
| 0568 | SET_CHAR_NEVER_TARGETTED |
| 0569 | LOAD_UNCOMPRESSED_ANIM |
| 056A | WAS_CUTSCENE_SKIPPED |
| 056B | SET_CHAR_CROUCH_WHEN_THREATENED |
| 056C | IS_CHAR_IN_ANY_POLICE_VEHICLE |
| 056D | DOES_CHAR_EXIST |
| 056E | DOES_VEHICLE_EXIST |
| 056F | ADD_SHORT_RANGE_BLIP_FOR_CONTACT_POINT |
| 0570 | ADD_SHORT_RANGE_SPRITE_BLIP_FOR_CONTACT_POINT |
| 0571 | IS_CHAR_STUCK |
| 0572 | SET_ALL_TAXIS_HAVE_NITRO |
| 0573 | SET_CHAR_STOP_SHOOT_DONT_SEEK_ENTITY |
| 0574 | FREEZE_CAR_POSITION_AND_DONT_LOAD_COLLISION |
| 0575 | FREEZE_CHAR_POSITION_AND_DONT_LOAD_COLLISION |
| 0576 | FREEZE_OBJECT_POSITION_AND_DONT_LOAD_COLLISION |
| 0577 | SET_FADE_AND_JUMPCUT_AFTER_RC_EXPLOSION |
| 0578 | REGISTER_VIGILANTE_LEVEL |
| 0579 | CLEAR_ALL_CHAR_ANIMS |
| 057A | SET_MAXIMUM_NUMBER_OF_CARS_IN_GARAGE |
| 057B | WANTED_STARS_ARE_FLASHING |
| 057C | SET_ALLOW_HURRICANES |
| 057D | PLAY_ANNOUNCEMENT |
| 057E | SET_PLAYER_IS_IN_STADIUM |
| 057F | GET_BUS_FARES_COLLECTED_BY_PLAYER |
| 0580 | SET_CHAR_OBJ_BUY_ICE_CREAM |
| 0581 | DISPLAY_RADAR |
| 0582 | REGISTER_BEST_POSITION |
| 0583 | IS_PLAYER_IN_INFO_ZONE |
| 0584 | CLEAR_CHAR_ICE_CREAM_PURCHASE |
| 0585 | IS_IN_CAR_FIRE_BUTTON_PRESSED |
| 0586 | HAS_CHAR_ATTEMPTED_ATTRACTOR |
| 0587 | SET_LOAD_COLLISION_FOR_CAR_FLAG |
| 0588 | SET_LOAD_COLLISION_FOR_CHAR_FLAG |
| 0589 | SET_LOAD_COLLISION_FOR_OBJECT_FLAG |
| 058A | ADD_BIG_GUN_FLASH |
| 058B | HAS_CHAR_BOUGHT_ICE_CREAM |
| 058C | GET_PROGRESS_PERCENTAGE |
| 058D | SET_SHORTCUT_PICKUP_POINT |
| 058E | SET_SHORTCUT_DROPOFF_POINT_FOR_MISSION |
| 058F | GET_RANDOM_ICE_CREAM_CUSTOMER_IN_AREA |
| 0590 | GET_RANDOM_ICE_CREAM_CUSTOMER_IN_ZONE |
| 0591 | UNLOCK_ALL_CAR_DOORS_IN_AREA |
| 0592 | SET_GANG_ATTACK_PLAYER_WITH_COPS |
| 0593 | SET_CHAR_FRIGHTENED_IN_JACKED_CAR |
| 0594 | SET_VEHICLE_TO_FADE_IN |
| 0595 | REGISTER_ODDJOB_MISSION_PASSED |
| 0596 | IS_PLAYER_IN_SHORTCUT_TAXI |
| 0597 | IS_CHAR_DUCKING |
| 0598 | CREATE_DUST_EFFECT_FOR_CUTSCENE_HELI |
| 0599 | REGISTER_FIRE_LEVEL |
| 059A | IS_AUSTRALIAN_GAME |
| 059B | DISARM_CAR_BOMB |
| 059C | SET_ONSCREEN_COUNTER_FLASH_WHEN_FIRST_DISPLAYED |
| 059D | SHUFFLE_CARD_DECKS |
| 059E | FETCH_NEXT_CARD |
| 059F | GET_OBJECT_VELOCITY |
| 05A0 | IS_DEBUG_CAMERA_ON |
| 05A1 | ADD_TO_OBJECT_ROTATION_VELOCITY |
| 05A2 | SET_OBJECT_ROTATION_VELOCITY |
| 05A3 | IS_OBJECT_STATIC |
| 05A4 | GET_ANGLE_BETWEEN_2D_VECTORS |
| 05A5 | DO_2D_RECTANGLES_COLLIDE |
| 05A6 | GET_OBJECT_ROTATION_VELOCITY |
| 05A7 | ADD_VELOCITY_RELATIVE_TO_OBJECT_VELOCITY |
| 05A8 | GET_OBJECT_SPEED |
| 05A9 | SET_VAR_TEXT_LABEL |
| 05AA | SET_LVAR_TEXT_LABEL |
| 05AB | VAR_TEXT_LABEL |
| 05AC | LVAR_TEXT_LABEL |
| 05AD | IS_VAR_TEXT_LABEL_EQUAL_TO_TEXT_LABEL |
| 05AE | IS_LVAR_TEXT_LABEL_EQUAL_TO_TEXT_LABEL |
| 05AF | DO_2D_LINES_INTERSECT |
| 05B0 | GET_2D_LINES_INTERSECT_POINT |
| 05B1 | IS_2D_POINT_IN_TRIANGLE |
| 05B2 | IS_2D_POINT_IN_RECTANGLE_ON_LEFT_SIDE_OF_LINE |
| 05B3 | IS_2D_POINT_ON_LEFT_SIDE_OF_2D_LINE |
| 05B4 | CHAR_LOOK_AT_OBJECT_ALWAYS |
| 05B5 | APPLY_COLLISION_ON_OBJECT |
| 05B6 | SAVE_STRING_TO_DEBUG_FILE |
| 05B7 | TASK_PLAYER_ON_FOOT |
| 05B8 | TASK_PLAYER_IN_CAR |
| 05B9 | TASK_PAUSE |
| 05BA | TASK_STAND_STILL |
| 05BB | TASK_FALL_AND_GET_UP |
| 05BC | TASK_JUMP |
| 05BD | TASK_TIRED |
| 05BE | TASK_DIE |
| 05BF | TASK_LOOK_AT_CHAR |
| 05C0 | TASK_LOOK_AT_VEHICLE |
| 05C1 | TASK_SAY |
| 05C2 | TASK_SHAKE_FIST |
| 05C3 | TASK_COWER |
| 05C4 | TASK_HANDS_UP |
| 05C5 | TASK_DUCK |
| 05C6 | TASK_DETONATE |
| 05C7 | TASK_USE_ATM |
| 05C8 | TASK_SCRATCH_HEAD |
| 05C9 | TASK_LOOK_ABOUT |
| 05CA | TASK_ENTER_CAR_AS_PASSENGER |
| 05CB | TASK_ENTER_CAR_AS_DRIVER |
| 05CC | TASK_STEAL_CAR |
| 05CD | TASK_LEAVE_CAR |
| 05CE | TASK_LEAVE_CAR_AND_DIE |
| 05CF | TASK_LEAVE_CAR_AND_FLEE |
| 05D0 | TASK_CAR_DRIVE |
| 05D1 | TASK_CAR_DRIVE_TO_COORD |
| 05D2 | TASK_CAR_DRIVE_WANDER |
| 05D3 | TASK_GO_STRAIGHT_TO_COORD |
| 05D4 | TASK_ACHIEVE_HEADING |
| 05D5 | SET_CHAR_IN_DISGUISE |
| 05D6 | FLUSH_ROUTE |
| 05D7 | EXTEND_ROUTE |
| 05D8 | TASK_FOLLOW_POINT_ROUTE |
| 05D9 | TASK_GOTO_CHAR |
| 05DA | TASK_FLEE_POINT |
| 05DB | TASK_FLEE_CHAR |
| 05DC | TASK_SMART_FLEE_POINT |
| 05DD | TASK_SMART_FLEE_CHAR |
| 05DE | TASK_WANDER_STANDARD |
| 05DF | TASK_WANDER_COP |
| 05E0 | TASK_WANDER_CRIMINAL |
| 05E1 | TASK_FOLLOW_LEADER_IN_FORMATION |
| 05E2 | TASK_KILL_CHAR_ON_FOOT |
| 05E3 | START_ADDING_STUNT_POINTS |
| 05E4 | ADD_STUNT_POINT |
| 05E5 | START_PLAYING_STUNT |
| 05E6 | HAS_STUNT_ENDED |
| 05E7 | HAS_STUNT_FAILED |
| 05E8 | START_RECORDING_STUNT |
| 05E9 | START_RECORDING_CAR |
| 05EA | STOP_RECORDING_CARS |
| 05EB | START_PLAYBACK_RECORDED_CAR |
| 05EC | STOP_PLAYBACK_RECORDED_CAR |
| 05ED | PAUSE_PLAYBACK_RECORDED_CAR |
| 05EE | UNPAUSE_PLAYBACK_RECORDED_CAR |
| 05EF | SET_CAR_PROTECT_CAR_REAR |
| 05F0 | SET_CAR_PROTECT_CAR_FRONT |
| 05F1 | SET_CAR_ESCORT_CAR_LEFT |
| 05F2 | SET_CAR_ESCORT_CAR_RIGHT |
| 05F3 | SET_CAR_ESCORT_CAR_REAR |
| 05F4 | SET_CAR_ESCORT_CAR_FRONT |
| 05F5 | TASK_FOLLOW_PATH_NODES_TO_COORD |
| 05F6 | IS_CHAR_IN_ANGLED_AREA_2D |
| 05F7 | IS_CHAR_IN_ANGLED_AREA_ON_FOOT_2D |
| 05F8 | IS_CHAR_IN_ANGLED_AREA_IN_CAR_2D |
| 05F9 | IS_CHAR_STOPPED_IN_ANGLED_AREA_2D |
| 05FA | IS_CHAR_STOPPED_IN_ANGLED_AREA_ON_FOOT_2D |
| 05FB | IS_CHAR_STOPPED_IN_ANGLED_AREA_IN_CAR_2D |
| 05FC | IS_CHAR_IN_ANGLED_AREA_3D |
| 05FD | IS_CHAR_IN_ANGLED_AREA_ON_FOOT_3D |
| 05FE | IS_CHAR_IN_ANGLED_AREA_IN_CAR_3D |
| 05FF | IS_CHAR_STOPPED_IN_ANGLED_AREA_3D |
| 0600 | IS_CHAR_STOPPED_IN_ANGLED_AREA_ON_FOOT_3D |
| 0601 | IS_CHAR_STOPPED_IN_ANGLED_AREA_IN_CAR_3D |
| 0602 | IS_CHAR_IN_TAXI |
| 0603 | TASK_GO_TO_COORD_ANY_MEANS |
| 0604 | GET_HEADING_FROM_VECTOR_2D |
| 0605 | TASK_PLAY_ANIM |
| 0606 | LOAD_PATH_NODES_IN_AREA |
| 0607 | RELEASE_PATH_NODES |
| 0608 | HAVE_PATH_NODES_BEEN_LOADED |
| 0609 | LOAD_ALL_PATH_NODES_FOR_DEBUG |
| 060A | LOAD_CHAR_DECISION_MAKER |
| 060B | SET_CHAR_DECISION_MAKER |
| 060C | CLEAR_ALL_DECISION_MAKERS |
| 060D | SET_TEXT_DROPSHADOW |
| 060E | IS_PLAYBACK_GOING_ON_FOR_CAR |
| 060F | SET_SENSE_RANGE |
| 0610 | SET_HEARING_RANGE |
| 0611 | IS_CHAR_PLAYING_ANIM |
| 0612 | SET_CHAR_ANIM_PLAYING_FLAG |
| 0613 | GET_CHAR_ANIM_CURRENT_TIME |
| 0614 | SET_CHAR_ANIM_CURRENT_TIME |
| 0615 | OPEN_SEQUENCE_TASK |
| 0616 | CLOSE_SEQUENCE_TASK |
| 0617 | SCRIPT_EVENT |
| 0618 | PERFORM_SEQUENCE_TASK |
| 0619 | SET_CHAR_COLLISION |
| 061A | GET_CHAR_ANIM_TOTAL_TIME |
| 061B | CLEAR_SEQUENCE_TASK |
| 061C | CLEAR_ALL_SEQUENCE_TASKS |
| 061D | ADD_ATTRACTOR |
| 061E | CLEAR_ATTRACTOR |
| 061F | CLEAR_ALL_ATTRACTORS |
| 0620 | TASK_PLAY_ANIM_FOR_TIME |
| 0621 | CREATE_CHAR_AT_ATTRACTOR |
| 0622 | TASK_LEAVE_CAR_IMMEDIATELY |
| 0623 | INCREMENT_INT_STAT |
| 0624 | INCREMENT_FLOAT_STAT |
| 0625 | DECREMENT_INT_STAT |
| 0626 | DECREMENT_FLOAT_STAT |
| 0627 | REGISTER_INT_STAT |
| 0628 | REGISTER_FLOAT_STAT |
| 0629 | SET_INT_STAT |
| 062A | SET_FLOAT_STAT |
| 062B | GET_ATTEMPTS_FOR_THIS_MISSION |
| 062C | REGISTER_THIS_MISSION_HAS_BEEN_ATTEMPTED |
| 062D | REGISTER_THIS_MISSION_HAS_BEEN_PASSED |
| 062E | GET_SCRIPT_TASK_STATUS |
| 062F | CREATE_GROUP |
| 0630 | SET_GROUP_LEADER |
| 0631 | SET_GROUP_MEMBER |
| 0632 | REMOVE_GROUP |
| 0633 | TASK_LEAVE_ANY_CAR |
| 0634 | TASK_KILL_CHAR_ON_FOOT_WHILE_DUCKING |
| 0635 | TASK_AIM_GUN_AT_CHAR |
| 0636 | TASK_SIDE_STEP_AND_SHOOT |
| 0637 | TASK_GO_TO_COORD_WHILE_SHOOTING |
| 0638 | TASK_STAY_IN_SAME_PLACE |
| 0639 | TASK_TURN_CHAR_TO_FACE_CHAR |
| 063A | OPEN_THREAT_LIST |
| 063B | CLOSE_THREAT_LIST |
| 063C | SET_PEDMODEL_AS_THREAT |
| 063D | SET_CHAR_THREAT_LIST |
| 063E | REMOVE_THREAT_LIST |
| 063F | PERFORM_SEQUENCE_TASK_REPEATEDLY |
| 0640 | SET_PEDTYPE_AS_THREAT |
| 0641 | CLEAR_CHAR_THREATS |
| 0642 | IS_CHAR_AT_SCRIPTED_ATTRACTOR |
| 0643 | SET_SEQUENCE_TO_REPEAT |
| 0644 | CREATE_PED_GENERATOR |
| 0645 | SWITCH_PED_GENERATOR |
| 0646 | GET_SEQUENCE_PROGRESS |
| 0647 | CLEAR_LOOK_AT |
| 0648 | SET_FOLLOW_NODE_THRESHOLD_DISTANCE |
| 0649 | SET_CHAR_ZONE_DISTANCE |
| 064A | ADD_PEDMODEL_AS_ATTRACTOR_USER |
| 064B | CREATE_FX_SYSTEM |
| 064C | PLAY_FX_SYSTEM |
| 064D | PAUSE_FX_SYSTEM |
| 064E | STOP_FX_SYSTEM |
| 064F | PLAY_AND_KILL_FX_SYSTEM |
| 0650 | KILL_FX_SYSTEM |
| 0651 | CREATE_FX_SYSTEM_WITH_DIRECTION |
| 0652 | GET_INT_STAT |
| 0653 | GET_FLOAT_STAT |
| 0654 | SET_OBJECT_RENDER_SCORCHED |
| 0655 | TASK_LOOK_AT_OBJECT |
| 0656 | LIMIT_ANGLE |
| 0657 | OPEN_CAR_DOOR |
| 0658 | SET_GROUP_DEFAULT_LEADER_TASK |
| 0659 | SET_ATTRACTOR_PAIR |
| 065A | PLACE_CHAR_AT_ATTRACTOR |
| 065B | GET_PICKUP_COORDINATES |
| 065C | REMOVE_DECISION_MAKER |
| 065D | VIEW_INTEGER_VARIABLE |
| 065E | VIEW_FLOAT_VARIABLE |
| 065F | WATCH_INTEGER_VARIABLE |
| 0660 | WATCH_FLOAT_VARIABLE |
| 0661 | BREAKPOINT |
| 0662 | WRITE_DEBUG |
| 0663 | WRITE_DEBUG_WITH_INT |
| 0664 | WRITE_DEBUG_WITH_FLOAT |
| 0665 | GET_CHAR_MODEL |
| 0666 | IS_CHAR_TOUCHING_ANY_OBJECT |
| 0667 | TASK_AIM_GUN_AT_COORD |
| 0668 | TASK_SHOOT_AT_COORD |
| 0669 | CREATE_FX_SYSTEM_ON_CHAR |
| 066A | CREATE_FX_SYSTEM_ON_CHAR_WITH_DIRECTION |
| 066B | CREATE_FX_SYSTEM_ON_CAR |
| 066C | CREATE_FX_SYSTEM_ON_CAR_WITH_DIRECTION |
| 066D | CREATE_FX_SYSTEM_ON_OBJECT |
| 066E | CREATE_FX_SYSTEM_ON_OBJECT_WITH_DIRECTION |
| 066F | ADD_QUEUED_DIALOGUE |
| 0670 | IS_DIALOGUE_FINISHED |
| 0671 | IS_DIALOGUE_PLAYING |
| 0672 | TASK_DESTROY_CAR |
| 0673 | TASK_DIVE_AND_GET_UP |
| 0674 | CUSTOM_PLATE_FOR_NEXT_CAR |
| 0675 | CREATE_PED_GENERATOR_AT_ATTRACTOR |
| 0676 | TASK_SHUFFLE_TO_NEXT_CAR_SEAT |
| 0677 | TASK_CHAT_WITH_CHAR |
| 0678 | GET_CHAR_AT_SCRIPTED_ATTRACTOR |
| 0679 | ATTACH_CAMERA_TO_VEHICLE |
| 067A | ATTACH_CAMERA_TO_VEHICLE_LOOK_AT_VEHICLE |
| 067B | ATTACH_CAMERA_TO_VEHICLE_LOOK_AT_CHAR |
| 067C | ATTACH_CAMERA_TO_CHAR |
| 067D | ATTACH_CAMERA_TO_CHAR_LOOK_AT_VEHICLE |
| 067E | ATTACH_CAMERA_TO_CHAR_LOOK_AT_CHAR |
| 067F | FORCE_CAR_LIGHTS |
| 0680 | ADD_PEDTYPE_AS_ATTRACTOR_USER |
| 0681 | ATTACH_OBJECT_TO_CAR |
| 0682 | DETACH_OBJECT |
| 0683 | ATTACH_CAR_TO_CAR |
| 0684 | DETACH_CAR |
| 0685 | IS_OBJECT_ATTACHED |
| 0686 | IS_VEHICLE_ATTACHED |
| 0687 | CLEAR_CHAR_TASKS |
| 0688 | TASK_TOGGLE_PED_THREAT_SCANNER |
| 0689 | POP_CAR_DOOR |
| 068A | FIX_CAR_DOOR |
| 068B | TASK_EVERYONE_LEAVE_CAR |
| 068C | IS_PLAYER_TARGETTING_ANYTHING |
| 068D | GET_ACTIVE_CAMERA_COORDINATES |
| 068E | GET_ACTIVE_CAMERA_POINT_AT |
| 068F | GET_CLOSEST_BUYABLE_OBJECT_TO_PLAYER |
| 0690 | OPEN_FRIEND_LIST |
| 0691 | CLOSE_FRIEND_LIST |
| 0692 | REMOVE_FRIEND_LIST |
| 0693 | SET_PEDMODEL_AS_FRIEND |
| 0694 | SET_PEDTYPE_AS_FRIEND |
| 0695 | CLEAR_CHAR_FRIENDS |
| 0696 | SET_CHAR_FRIEND_LIST |
| 0697 | POP_CAR_PANEL |
| 0698 | FIX_CAR_PANEL |
| 0699 | FIX_CAR_TYRE |
| 069A | ATTACH_OBJECT_TO_OBJECT |
| 069B | ATTACH_OBJECT_TO_CHAR |
| 069C | ATTACH_CAMERA_TO_OBJECT |
| 069D | ATTACH_CAMERA_TO_OBJECT_LOOK_AT_VEHICLE |
| 069E | ATTACH_CAMERA_TO_OBJECT_LOOK_AT_CHAR |
| 069F | ATTACH_CAMERA_TO_OBJECT_LOOK_AT_OBJECT |
| 06A0 | ATTACH_CAMERA_TO_CHAR_LOOK_AT_OBJECT |
| 06A1 | ATTACH_CAMERA_TO_VEHICLE_LOOK_AT_OBJECT |
| 06A2 | GET_CAR_SPEED_VECTOR |
| 06A3 | GET_CAR_MASS |
| 06A4 | TASK_KILL_THREATS_ON_FOOT_WHILE_DUCKING |
| 06A5 | TASK_DIVE_FROM_ATTACHMENT_AND_GET_UP |
| 06A6 | TASK_PLAY_ANIM_WITH_VELOCITY_EXTRACTION |
| 06A7 | ATTACH_CHAR_TO_BIKE |
| 06A8 | TASK_GOTO_CHAR_OFFSET |
| 06A9 | TASK_LOOK_AT_COORD |
| 06AA | IS_RECORDING_GOING_ON_FOR_CAR |
| 06AB | HIDE_CHAR_WEAPON_FOR_SCRIPTED_CUTSCENE |
| 06AC | GET_CHAR_SPEED |
| 06AD | SET_GROUP_DECISION_MAKER |
| 06AE | LOAD_GROUP_DECISION_MAKER |
| 06AF | DISABLE_PLAYER_SPRINT |
| 06B0 | TASK_SIT_DOWN |
| 06B1 | CREATE_SEARCHLIGHT |
| 06B2 | DELETE_SEARCHLIGHT |
| 06B3 | DOES_SEARCHLIGHT_EXIST |
| 06B4 | MOVE_SEARCHLIGHT_BETWEEN_COORDS |
| 06B5 | POINT_SEARCHLIGHT_AT_COORD |
| 06B6 | POINT_SEARCHLIGHT_AT_CHAR |
| 06B7 | IS_CHAR_IN_SEARCHLIGHT |
| 06B8 | SET_GROUP_DEFAULT_TASK |
| 06B9 | HAS_CUTSCENE_LOADED |
| 06BA | TASK_TURN_CHAR_TO_FACE_COORD |
| 06BB | TASK_DRIVE_POINT_ROUTE |
| 06BC | FIRE_SINGLE_BULLET |
| 06BD | IS_LINE_OF_SIGHT_CLEAR |
| 06BE | GET_CAR_ROLL |
| 06BF | POINT_SEARCHLIGHT_AT_VEHICLE |
| 06C0 | IS_VEHICLE_IN_SEARCHLIGHT |
| 06C1 | CREATE_SEARCHLIGHT_ON_VEHICLE |
| 06C2 | TASK_GO_TO_COORD_WHILE_AIMING |
| 06C3 | GET_NUMBER_OF_FIRES_IN_RANGE |
| 06C4 | ADD_BLIP_FOR_SEARCHLIGHT |
| 06C5 | SKIP_TO_END_AND_STOP_PLAYBACK_RECORDED_CAR |
| 06C6 | TASK_OPEN_DRIVER_DOOR |
| 06C7 | TASK_CAR_TEMP_ACTION |
| 06C8 | SET_LA_RIOTS |
| 06C9 | REMOVE_CHAR_FROM_GROUP |
| 06CA | ATTACH_SEARCHLIGHT_TO_SEARCHLIGHT_OBJECT |
| 06CB | SET_VEHICLE_RECORDS_COLLISIONS |
| 06CC | DRAW_CROSS_IN_FRONT_OF_DEBUG_CAMERA |
| 06CD | DRAW_DEBUG_CUBE |
| 06CE | GET_CAR_LAST_ROUTE_COORDS |
| 06CF | DISPLAY_TIMER_BARS |
| 06D0 | SWITCH_EMERGENCY_SERVICES |
| 06D1 | SET_VAR_TEXT_LABEL16 |
| 06D2 | SET_LVAR_TEXT_LABEL16 |
| 06D3 | VAR_TEXT_LABEL16 |
| 06D4 | LVAR_TEXT_LABEL16 |
| 06D5 | CREATE_CHECKPOINT |
| 06D6 | DELETE_CHECKPOINT |
| 06D7 | SWITCH_RANDOM_TRAINS |
| 06D8 | CREATE_MISSION_TRAIN |
| 06D9 | DELETE_MISSION_TRAINS |
| 06DA | MARK_MISSION_TRAINS_AS_NO_LONGER_NEEDED |
| 06DB | DELETE_ALL_TRAINS |
| 06DC | SET_TRAIN_SPEED |
| 06DD | SET_TRAIN_CRUISE_SPEED |
| 06DE | GET_TRAIN_CABOOSE |
| 06DF | DELETE_PLAYER |
| 06E0 | SET_TWO_PLAYER_CAMERA_MODE |
| 06E1 | TASK_CAR_MISSION |
| 06E2 | TASK_GO_TO_OBJECT |
| 06E3 | TASK_WEAPON_ROLL |
| 06E4 | TASK_CHAR_ARREST_CHAR |
| 06E5 | GET_AVAILABLE_VEHICLE_MOD |
| 06E6 | GET_VEHICLE_MOD_TYPE |
| 06E7 | ADD_VEHICLE_MOD |
| 06E8 | REMOVE_VEHICLE_MOD |
| 06E9 | REQUEST_VEHICLE_MOD |
| 06EA | HAS_VEHICLE_MOD_LOADED |
| 06EB | MARK_VEHICLE_MOD_AS_NO_LONGER_NEEDED |
| 06EC | GET_NUM_AVAILABLE_PAINTJOBS |
| 06ED | GIVE_VEHICLE_PAINTJOB |
| 06EE | IS_GROUP_MEMBER |
| 06EF | IS_GROUP_LEADER |
| 06F0 | SET_GROUP_SEPARATION_RANGE |
| 06F1 | LIMIT_TWO_PLAYER_DISTANCE |
| 06F2 | RELEASE_TWO_PLAYER_DISTANCE |
| 06F3 | SET_PLAYER_PLAYER_TARGETTING |
| 06F4 | CREATE_SCRIPT_GANG_ROADBLOCK |
| 06F5 | GET_SCRIPT_FIRE_COORDS |
| 06F6 | CLEAR_TWO_PLAYER_CAMERA_MODE |
| 06F7 | SET_PLAYER_PASSENGER_CAN_SHOOT |
| 06F8 | GET_NTH_CLOSEST_CAR_NODE_WITH_HEADING |
| 06F9 | GET_HEIGHT_OF_CAR_WHEELS_FROM_GROUND |
| 06FA | SET_PLAYERS_CAN_BE_IN_SEPARATE_CARS |
| 06FB | SWITCH_PLAYER_CROSSHAIR |
| 06FC | DOES_CAR_HAVE_STUCK_CAR_CHECK |
| 06FD | SET_PLAYBACK_SPEED |
| 06FE | GET_CAR_VALUE |
| 06FF | ARE_ANY_CHARS_NEAR_CHAR |
| 0700 | SKIP_CUTSCENE_START |
| 0701 | SKIP_CUTSCENE_END |
| 0702 | GET_PERCENTAGE_TAGGED_IN_AREA |
| 0703 | SET_TAG_STATUS_IN_AREA |
| 0704 | CAR_GOTO_COORDINATES_RACING |
| 0705 | START_PLAYBACK_RECORDED_CAR_USING_AI |
| 0706 | SKIP_IN_PLAYBACK_RECORDED_CAR |
| 0707 | SKIP_CUTSCENE_START_INTERNAL |
| 0708 | CLEAR_CHAR_DECISION_MAKER_EVENT_RESPONSE |
| 0709 | ADD_CHAR_DECISION_MAKER_EVENT_RESPONSE |
| 070A | TASK_PICK_UP_OBJECT |
| 070B | DROP_OBJECT |
| 070C | EXPLODE_CAR_IN_CUTSCENE |
| 070D | BUILD_PLAYER_MODEL |
| 070E | PLANE_ATTACK_PLAYER |
| 070F | PLANE_FLY_IN_DIRECTION |
| 0710 | PLANE_FOLLOW_ENTITY |
| 0711 | ALLOCATE_SCRIPT_TO_PED_GENERATOR |
| 0712 | ALLOCATE_SCRIPT_TO_RANDOM_PED |
| 0713 | TASK_DRIVE_BY |
| 0714 | SET_CAR_STAY_IN_SLOW_LANE |
| 0715 | TAKE_REMOTE_CONTROL_OF_CAR |
| 0716 | IS_CLOSEST_OBJECT_OF_TYPE_SMASHED_OR_DAMAGED |
| 0717 | START_SETTING_UP_CONVERSATION |
| 0718 | SET_UP_CONVERSATION_NODE |
| 0719 | FINISH_SETTING_UP_CONVERSATION |
| 071A | IS_CONVERSATION_AT_NODE |
| 071B | CLEAR_ALL_CONVERSATIONS |
| 071C | GET_CHAR_LIGHTING |
| 071D | SET_CLOSEST_OBJECT_OF_TYPE_RENDER_SCORCHED |
| 071E | GET_OBJECT_HEALTH |
| 071F | SET_OBJECT_HEALTH |
| 0720 | GET_VEHICLE_WHEEL_UPGRADE_CLASS |
| 0721 | GET_NUM_WHEELS_IN_UPGRADE_CLASS |
| 0722 | GET_WHEEL_IN_UPGRADE_CLASS |
| 0723 | BREAK_OBJECT |
| 0724 | HELI_ATTACK_PLAYER |
| 0725 | HELI_FLY_IN_DIRECTION |
| 0726 | HELI_FOLLOW_ENTITY |
| 0727 | POLICE_HELI_CHASE_ENTITY |
| 0728 | SET_UP_CONVERSATION_END_NODE |
| 0729 | TASK_USE_MOBILE_PHONE |
| 072A | TASK_WARP_CHAR_INTO_CAR_AS_DRIVER |
| 072B | TASK_WARP_CHAR_INTO_CAR_AS_PASSENGER |
| 072C | SWITCH_COPS_ON_BIKES |
| 072D | IS_FLAME_IN_ANGLED_AREA_2D |
| 072E | IS_FLAME_IN_ANGLED_AREA_3D |
| 072F | ADD_STUCK_CAR_CHECK_WITH_WARP |
| 0730 | DAMAGE_CAR_PANEL |
| 0731 | SET_CAR_ROLL |
| 0732 | SUPPRESS_CAR_MODEL |
| 0733 | DONT_SUPPRESS_CAR_MODEL |
| 0734 | DONT_SUPPRESS_ANY_CAR_MODELS |
| 0735 | IS_PS2_KEYBOARD_KEY_PRESSED |
| 0736 | IS_PS2_KEYBOARD_KEY_JUST_PRESSED |
| 0737 | IS_CHAR_HOLDING_OBJECT |
| 0738 | SET_ZONE_RADAR_COLOURS |
| 0739 | GIVE_LOWRIDER_SUSPENSION_TO_CAR |
| 073A | DOES_CAR_HAVE_LOWRIDER_SUSPENSION |
| 073B | SET_CAR_CAN_GO_AGAINST_TRAFFIC |
| 073C | DAMAGE_CAR_DOOR |
| 073D | GET_RANDOM_CAR_IN_SPHERE |
| 073E | GET_RANDOM_CAR_IN_SPHERE_NO_SAVE |
| 073F | GET_RANDOM_CHAR_IN_SPHERE |
| 0740 | GET_COORDS_OF_CLOSEST_COLLECTABLE1 |
| 0741 | HAS_CHAR_BEEN_ARRESTED |
| 0742 | SET_PLANE_THROTTLE |
| 0743 | HELI_LAND_AT_COORDS |
| 0744 | GET_STAT_CHANGE_AMOUNT |
| 0745 | PLANE_STARTS_IN_AIR |
| 0746 | SET_RELATIONSHIP |
| 0747 | CLEAR_RELATIONSHIP |
| 0748 | CLEAR_ALL_RELATIONSHIPS |
| 0749 | CLEAR_GROUP_DECISION_MAKER_EVENT_RESPONSE |
| 074A | ADD_GROUP_DECISION_MAKER_EVENT_RESPONSE |
| 074B | DRAW_SPRITE_WITH_ROTATION |
| 074C | TASK_USE_ATTRACTOR |
| 074D | TASK_SHOOT_AT_CHAR |
| 074E | SET_INFORM_RESPECTED_FRIENDS |
| 074F | IS_CHAR_RESPONDING_TO_EVENT |
| 0750 | SET_OBJECT_VISIBLE |
| 0751 | TASK_FLEE_CHAR_ANY_MEANS |
| 0752 | STOP_RECORDING_CAR |
| 0753 | SET_ALERTNESS |
| 0754 | FLUSH_PATROL_ROUTE |
| 0755 | EXTEND_PATROL_ROUTE |
| 0756 | TASK_GO_ON_PATROL |
| 0757 | GET_PATROL_ALERTNESS |
| 0758 | SET_CHAR_SPECIAL_EVENT |
| 0759 | SET_ATTRACTOR_AS_COVER_NODE |
| 075A | PLAY_OBJECT_ANIM |
| 075B | SET_RADAR_ZOOM |
| 075C | DOES_BLIP_EXIST |
| 075D | LOAD_PRICES |
| 075E | LOAD_SHOP |
| 075F | GET_NUMBER_OF_ITEMS_IN_SHOP |
| 0760 | GET_ITEM_IN_SHOP |
| 0761 | GET_PRICE_OF_ITEM |
| 0762 | TASK_DEAD |
| 0763 | SET_CAR_AS_MISSION_CAR |
| 0764 | IS_SEARCHLIGHT_IN_ANGLED_AREA_2D |
| 0765 | IS_SEARCHLIGHT_IN_ANGLED_AREA_3D |
| 0766 | SWITCH_SEARCHLIGHT_BULB |
| 0767 | SET_ZONE_POPULATION_TYPE |
| 0768 | SET_ZONE_GANG_CAP |
| 0769 | GET_ZONE_GANG_CAP |
| 076A | SET_ZONE_DEALER_STRENGTH |
| 076B | GET_ZONE_DEALER_STRENGTH |
| 076C | SET_ZONE_GANG_STRENGTH |
| 076D | GET_ZONE_GANG_STRENGTH |
| 076E | SET_NO_POLICE_DURING_LA_RIOTS |
| 076F | IS_MESSAGE_BEING_DISPLAYED |
| 0770 | SET_CHAR_IS_TARGET_PRIORITY |
| 0771 | CUSTOM_PLATE_DESIGN_FOR_NEXT_CAR |
| 0772 | TASK_GOTO_CAR |
| 0773 | CLEAR_HELP_WITH_THIS_LABEL |
| 0774 | IS_SEARCHLIGHT_BULB_ON |
| 0775 | CREATE_OIL_PUDDLE |
| 0776 | REQUEST_IPL |
| 0777 | REMOVE_IPL |
| 0778 | REMOVE_IPL_DISCREETLY |
| 0779 | TASK_OPEN_PASSENGER_DOOR |
| 077A | SET_CHAR_RELATIONSHIP |
| 077B | CLEAR_CHAR_RELATIONSHIP |
| 077C | CLEAR_ALL_CHAR_RELATIONSHIPS |
| 077D | GET_CAR_PITCH |
| 077E | GET_AREA_VISIBLE |
| 077F | ADD_INT_TO_VAR_CONSOLE |
| 0780 | HELI_KEEP_ENTITY_IN_VIEW |
| 0781 | GET_WEAPONTYPE_MODEL |
| 0782 | GET_WEAPONTYPE_SLOT |
| 0783 | GET_SHOPPING_EXTRA_INFO |
| 0784 | GIVE_PLAYER_CLOTHES |
| 0785 | GIVE_PLAYER_TATTOO |
| 0786 | GET_NUMBER_OF_FIRES_IN_AREA |
| 0787 | SET_CHAR_TYRES_CAN_BE_BURST |
| 0788 | ATTACH_WINCH_TO_HELI |
| 0789 | RELEASE_ENTITY_FROM_WINCH |
| 078A | GET_TRAIN_CARRIAGE |
| 078B | GRAB_ENTITY_ON_WINCH |
| 078C | GET_NAME_OF_ITEM |
| 078D | ADD_FLOAT_TO_VAR_CONSOLE |
| 078E | TASK_DRAG_CHAR_FROM_CAR |
| 078F | TASK_CLIMB |
| 0790 | BUY_ITEM |
| 0791 | BUY_TATTOO |
| 0792 | CLEAR_CHAR_TASKS_IMMEDIATELY |
| 0793 | STORE_CLOTHES_STATE |
| 0794 | RESTORE_CLOTHES_STATE |
| 0795 | DELETE_WINCH_FOR_HELI |
| 0796 | GET_ROPE_HEIGHT_FOR_OBJECT |
| 0797 | SET_ROPE_HEIGHT_FOR_OBJECT |
| 0798 | GRAB_ENTITY_ON_ROPE_FOR_OBJECT |
| 0799 | RELEASE_ENTITY_FROM_ROPE_FOR_OBJECT |
| 079A | ATTACH_CAR_TO_ROPE_FOR_OBJECT |
| 079B | ATTACH_CHAR_TO_ROPE_FOR_OBJECT |
| 079C | ATTACH_OBJECT_TO_ROPE_FOR_OBJECT |
| 079D | PLAYER_ENTERED_DOCK_CRANE |
| 079E | PLAYER_ENTERED_BUILDINGSITE_CRANE |
| 079F | PLAYER_LEFT_CRANE |
| 07A0 | PERFORM_SEQUENCE_TASK_FROM_PROGRESS |
| 07A1 | SET_NEXT_DESIRED_MOVE_STATE |
| 07A2 | SET_NEXT_EVENT_RESPONSE_SEQUENCE |
| 07A3 | TASK_GOTO_CHAR_AIMING |
| 07A4 | GET_SEQUENCE_PROGRESS_RECURSIVE |
| 07A5 | TASK_KILL_CHAR_ON_FOOT_TIMED |
| 07A6 | GET_NEAREST_TAG_POSITION |
| 07A7 | TASK_JETPACK |
| 07A8 | SET_AREA51_SAM_SITE |
| 07A9 | IS_CHAR_IN_ANY_SEARCHLIGHT |
| 07AA | GET_SEARCHLIGHT_COORDS |
| 07AB | IS_TRAILER_ATTACHED_TO_CAB |
| 07AC | DETACH_TRAILER_FROM_CAB |
| 07AD | GET_TRAILER_ATTACHED_TO_CAB |
| 07AE | GET_CAB_ATTACHED_TO_TRAILER |
| 07AF | GET_PLAYER_GROUP |
| 07B0 | GET_LOADED_SHOP |
| 07B1 | GET_BEAT_PROXIMITY |
| 07B2 | SET_BEAT_ZONE_SIZE |
| 07B3 | SET_GROUP_DEFAULT_TASK_ALLOCATOR |
| 07B4 | SET_PLAYER_GROUP_RECRUITMENT |
| 07B5 | DISPLAY_TWO_ONSCREEN_COUNTERS |
| 07B6 | DISPLAY_TWO_ONSCREEN_COUNTERS_WITH_STRING |
| 07B7 | DISPLAY_NTH_TWO_ONSCREEN_COUNTERS |
| 07B8 | DISPLAY_NTH_TWO_ONSCREEN_COUNTERS_WITH_STRING |
| 07B9 | TASK_KILL_CHAR_ON_FOOT_PATROL |
| 07BA | HELI_AIM_AHEAD_OF_TARGET_ENTITY |
| 07BB | ACTIVATE_HELI_SPEED_CHEAT |
| 07BC | TASK_SET_CHAR_DECISION_MAKER |
| 07BD | DELETE_MISSION_TRAIN |
| 07BE | MARK_MISSION_TRAIN_AS_NO_LONGER_NEEDED |
| 07BF | SET_BLIP_ALWAYS_DISPLAY_ON_ZOOMED_RADAR |
| 07C0 | REQUEST_CAR_RECORDING |
| 07C1 | HAS_CAR_RECORDING_BEEN_LOADED |
| 07C2 | DISPLAY_PLAYBACK_RECORDED_CAR |
| 07C3 | GET_OBJECT_QUATERNION |
| 07C4 | SET_OBJECT_QUATERNION |
| 07C5 | GET_VEHICLE_QUATERNION |
| 07C6 | SET_VEHICLE_QUATERNION |
| 07C7 | SET_MISSION_TRAIN_COORDINATES |
| 07C8 | DISPLAY_DEBUG_MESSAGE |
| 07C9 | TASK_COMPLEX_PICKUP_OBJECT |
| 07CA | TASK_SIMPLE_PUTDOWN_OBJECT |
| 07CB | LISTEN_TO_PLAYER_GROUP_COMMANDS |
| 07CC | SET_PLAYER_ENTER_CAR_BUTTON |
| 07CD | TASK_CHAR_SLIDE_TO_COORD |
| 07CE | SET_BULLET_WHIZZ_BY_DISTANCE |
| 07CF | SET_TWO_PLAYER_CAM_MODE_SEPARATE_CARS |
| 07D0 | GET_CURRENT_DAY_OF_WEEK |
| 07D1 | SET_CURRENT_DAY_OF_WEEK |
| 07D2 | ACTIVATE_INTERIORS |
| 07D3 | REGISTER_SCRIPT_BRAIN_FOR_CODE_USE |
| 07D4 | REGISTER_OBJECT_SCRIPT_BRAIN_FOR_CODE_USE |
| 07D5 | APPLY_FORCE_TO_CAR |
| 07D6 | IS_INT_LVAR_EQUAL_TO_INT_VAR |
| 07D7 | IS_FLOAT_LVAR_EQUAL_TO_FLOAT_VAR |
| 07D8 | IS_INT_LVAR_NOT_EQUAL_TO_INT_VAR |
| 07D9 | IS_FLOAT_LVAR_NOT_EQUAL_TO_FLOAT_VAR |
| 07DA | ADD_TO_CAR_ROTATION_VELOCITY |
| 07DB | SET_CAR_ROTATION_VELOCITY |
| 07DC | GET_CAR_ROTATION_VELOCITY |
| 07DD | SET_CHAR_SHOOT_RATE |
| 07DE | IS_MODEL_IN_CDIMAGE |
| 07DF | REMOVE_OIL_PUDDLES_IN_AREA |
| 07E0 | SET_BLIP_AS_FRIENDLY |
| 07E1 | TASK_SWIM_TO_COORD |
| 07E2 | TASK_GO_STRAIGHT_TO_COORD_WITHOUT_STOPPING |
| 07E3 | GET_BEAT_INFO_FOR_CURRENT_TRACK |
| 07E4 | GET_MODEL_DIMENSIONS |
| 07E5 | COPY_CHAR_DECISION_MAKER |
| 07E6 | COPY_GROUP_DECISION_MAKER |
| 07E7 | TASK_DRIVE_POINT_ROUTE_ADVANCED |
| 07E8 | IS_RELATIONSHIP_SET |
| 07E9 | HAS_CHAR_SPOTTED_CAR |
| 07EA | SET_ROPE_HEIGHT_FOR_HELI |
| 07EB | GET_ROPE_HEIGHT_FOR_HELI |
| 07EC | IS_CAR_LOWRIDER |
| 07ED | IS_PERFORMANCE_CAR |
| 07EE | SET_CAR_ALWAYS_CREATE_SKIDS |
| 07EF | GET_CITY_FROM_COORDS |
| 07F0 | HAS_OBJECT_OF_TYPE_BEEN_SMASHED |
| 07F1 | IS_PLAYER_PERFORMING_WHEELIE |
| 07F2 | IS_PLAYER_PERFORMING_STOPPIE |
| 07F3 | SET_CHECKPOINT_COORDS |
| 07F4 | SET_ONSCREEN_TIMER_DISPLAY |
| 07F5 | CONTROL_CAR_HYDRAULICS |
| 07F6 | GET_GROUP_SIZE |
| 07F7 | SET_OBJECT_COLLISION_DAMAGE_EFFECT |
| 07F8 | SET_CAR_FOLLOW_CAR |
| 07F9 | PLAYER_ENTERED_QUARRY_CRANE |
| 07FA | PLAYER_ENTERED_LAS_VEGAS_CRANE |
| 07FB | SWITCH_ENTRY_EXIT |
| 07FC | DISPLAY_TEXT_WITH_FLOAT |
| 07FD | DOES_GROUP_EXIST |
| 07FE | GIVE_MELEE_ATTACK_TO_CHAR |
| 07FF | SET_CAR_HYDRAULICS |
| 0800 | IS_2PLAYER_GAME_GOING_ON |
| 0801 | GET_CAMERA_FOV |
| 0802 | SET_GLOBAL_PED_SEARCH_PARAMS |
| 0803 | DOES_CAR_HAVE_HYDRAULICS |
| 0804 | TASK_CHAR_SLIDE_TO_COORD_AND_PLAY_ANIM |
| 0805 | ALLOCATE_SCRIPT_TO_OBJECT |
| 0806 | GET_TOTAL_NUMBER_OF_PEDS_KILLED_BY_PLAYER |
| 0807 | SET_TWO_PLAYER_CAM_MODE_SAME_CAR_SHOOTING |
| 0808 | SET_TWO_PLAYER_CAM_MODE_SAME_CAR_NO_SHOOTING |
| 0809 | SET_TWO_PLAYER_CAM_MODE_NOT_BOTH_IN_CAR |
| 080A | GET_LEVEL_DESIGN_COORDS_FOR_OBJECT |
| 080B | SAVE_TEXT_LABEL_TO_DEBUG_FILE |
| 080C | GET_CHAR_BREATH |
| 080D | SET_CHAR_BREATH |
| 080E | GET_CHAR_HIGHEST_PRIORITY_EVENT |
| 080F | ARE_PATHS_LOADED_FOR_CAR |
| 0810 | GET_PARKING_NODE_IN_AREA |
| 0811 | GET_CAR_CHAR_IS_USING |
| 0812 | TASK_PLAY_ANIM_NON_INTERRUPTABLE |
| 0813 | FORCE_NEXT_DIE_ANIM |
| 0814 | ADD_STUNT_JUMP |
| 0815 | SET_OBJECT_COORDINATES_AND_VELOCITY |
| 0816 | SET_CHAR_KINDA_STAY_IN_SAME_PLACE |
| 0817 | TASK_FOLLOW_PATROL_ROUTE |
| 0818 | IS_CHAR_IN_AIR |
| 0819 | GET_CHAR_HEIGHT_ABOVE_GROUND |
| 081A | SET_CHAR_WEAPON_SKILL |
| 081B | ARE_PATHS_LOADED_IN_AREA |
| 081C | SET_TEXT_EDGE |
| 081D | SET_CAR_ENGINE_BROKEN |
| 081E | IS_THIS_MODEL_A_BOAT |
| 081F | IS_THIS_MODEL_A_PLANE |
| 0820 | IS_THIS_MODEL_A_HELI |
| 0821 | IS_3D_COORD_IN_ZONE |
| 0822 | SET_FIRST_PERSON_IN_CAR_CAMERA_MODE |
| 0823 | TASK_GREET_PARTNER |
| 0824 | GET_CLOSEST_PICKUP_COORDS_TO_COORD |
| 0825 | SET_HELI_BLADES_FULL_SPEED |
| 0826 | DISPLAY_HUD |
| 0827 | CONNECT_LODS |
| 0828 | SET_MAX_FIRE_GENERATIONS |
| 0829 | TASK_DIE_NAMED_ANIM |
| 082A | SET_PLAYER_DUCK_BUTTON |
| 082B | FIND_NEAREST_MULTIBUILDING |
| 082C | SET_MULTIBUILDING_MODEL |
| 082D | GET_NUMBER_MULTIBUILDING_MODELS |
| 082E | GET_MULTIBUILDING_MODEL_INDEX |
| 082F | SET_CURRENT_BUYABLE_PROPERTY |
| 0830 | SET_POOL_TABLE_COORDS |
| 0831 | IS_AUDIO_BUILD |
| 0832 | CLEAR_QUEUED_DIALOGUE |
| 0833 | HAS_OBJECT_BEEN_PHOTOGRAPHED |
| 0834 | DO_CAMERA_BUMP |
| 0835 | GET_CURRENT_DATE |
| 0836 | SET_OBJECT_ANIM_SPEED |
| 0837 | IS_OBJECT_PLAYING_ANIM |
| 0838 | SET_OBJECT_ANIM_PLAYING_FLAG |
| 0839 | GET_OBJECT_ANIM_CURRENT_TIME |
| 083A | SET_OBJECT_ANIM_CURRENT_TIME |
| 083B | GET_OBJECT_ANIM_TOTAL_TIME |
| 083C | SET_CHAR_VELOCITY |
| 083D | GET_CHAR_VELOCITY |
| 083E | SET_CHAR_ROTATION |
| 083F | GET_CAR_UPRIGHT_VALUE |
| 0840 | SET_VEHICLE_AREA_VISIBLE |
| 0841 | SELECT_WEAPONS_FOR_VEHICLE |
| 0842 | GET_CITY_PLAYER_IS_IN |
| 0843 | GET_NAME_OF_ZONE |
| 0844 | IS_VAR_TEXT_LABEL_EMPTY |
| 0845 | IS_LVAR_TEXT_LABEL_EMPTY |
| 0846 | IS_VAR_TEXT_LABEL16_EMPTY |
| 0847 | IS_LVAR_TEXT_LABEL16_EMPTY |
| 0848 | SWITCH |
| 0849 | ENDSWITCH |
| 084A | CASE |
| 084B | DEFAULT |
| 084C | BREAK |
| 084D | ACTIVATE_INTERIOR_PEDS |
| 084E | SET_VEHICLE_CAN_BE_TARGETTED |
| 084F | GET_GROUP_LEADER |
| 0850 | TASK_FOLLOW_FOOTSTEPS |
| 0851 | DAMAGE_CHAR |
| 0852 | SET_CAR_CAN_BE_VISIBLY_DAMAGED |
| 0853 | SET_HELI_REACHED_TARGET_DISTANCE |
| 0854 | BLOCK_NODES_IN_AREA |
| 0855 | GET_SOUND_LEVEL_AT_COORDS |
| 0856 | SET_CHAR_ALLOWED_TO_DUCK |
| 0857 | SET_WATER_CONFIGURATION |
| 0858 | SET_HEADING_FOR_ATTACHED_PLAYER |
| 0859 | TASK_WALK_ALONGSIDE_CHAR |
| 085A | CREATE_EMERGENCY_SERVICES_CAR |
| 085B | TASK_KINDA_STAY_IN_SAME_PLACE |
| 085C | TASK_USE_ATTRACTOR_ADVANCED |
| 085D | TASK_FOLLOW_PATH_NODES_TO_COORD_SHOOTING |
| 085E | START_PLAYBACK_RECORDED_CAR_LOOPED |
| 085F | START_PLAYBACK_RECORDED_CAR_USING_AI_LOOPED |
| 0860 | SET_CHAR_AREA_VISIBLE |
| 0861 | IS_ATTACHED_PLAYER_HEADING_ACHIEVED |
| 0862 | GET_MODEL_NAME_FOR_DEBUG_ONLY |
| 0863 | TASK_USE_NEARBY_ENTRY_EXIT |
| 0864 | ENABLE_ENTRY_EXIT_PLAYER_GROUP_WARPING |
| 0865 | FREEZE_STATE_OF_INTERIORS |
| 0866 | GET_CLOSEST_STEALABLE_OBJECT |
| 0867 | IS_PROCEDURAL_INTERIOR_ACTIVE |
| 0868 | CLEAR_THIS_VIEW_INTEGER_VARIABLE |
| 0869 | CLEAR_THIS_VIEW_FLOAT_VARIABLE |
| 086A | CLEAR_ALL_VIEW_VARIABLES |
| 086B | CLEAR_THIS_INTEGER_WATCHPOINT |
| 086C | CLEAR_THIS_FLOAT_WATCHPOINT |
| 086D | CLEAR_ALL_BREAKPOINTS |
| 086E | CLEAR_ALL_WATCHPOINTS |
| 086F | IS_THIS_MODEL_A_TRAIN |
| 0870 | GET_VEHICLE_CHAR_IS_STANDING_ON |
| 0871 | SWITCH_START |
| 0872 | SWITCH_CONTINUED |
| 0873 | REMOVE_CAR_RECORDING |
| 0874 | SET_ZONE_POPULATION_RACE |
| 0875 | SET_OBJECT_ONLY_DAMAGED_BY_PLAYER |
| 0876 | CREATE_BIRDS |
| 0877 | GET_VEHICLE_DIRT_LEVEL |
| 0878 | SET_VEHICLE_DIRT_LEVEL |
| 0879 | SET_GANG_WARS_ACTIVE |
| 087A | IS_GANG_WAR_GOING_ON |
| 087B | GIVE_PLAYER_CLOTHES_OUTSIDE_SHOP |
| 087C | CLEAR_LOADED_SHOP |
| 087D | SET_GROUP_SEQUENCE |
| 087E | SET_CHAR_DROPS_WEAPONS_WHEN_DEAD |
| 087F | SET_CHAR_NEVER_LEAVES_GROUP |
| 0880 | DRAW_RECT_WITH_TITLE |
| 0881 | SET_PLAYER_FIRE_BUTTON |
| 0882 | SET_ATTRACTOR_RADIUS |
| 0883 | ATTACH_FX_SYSTEM_TO_CHAR_BONE |
| 0884 | REGISTER_ATTRACTOR_SCRIPT_BRAIN_FOR_CODE_USE |
| 0885 | CONST_INT |
| 0886 | CONST_FLOAT |
| 0887 | SET_HEADING_LIMIT_FOR_ATTACHED_CHAR |
| 0888 | ADD_BLIP_FOR_DEAD_CHAR |
| 0889 | GET_DEAD_CHAR_COORDINATES |
| 088A | TASK_PLAY_ANIM_WITH_FLAGS |
| 088B | SET_VEHICLE_AIR_RESISTANCE_MULTIPLIER |
| 088C | SET_CAR_COORDINATES_NO_OFFSET |
| 088D | SET_USES_COLLISION_OF_CLOSEST_OBJECT_OF_TYPE |
| 088E | SET_TIME_ONE_DAY_FORWARD |
| 088F | SET_TIME_ONE_DAY_BACK |
| 0890 | SET_TIMER_BEEP_COUNTDOWN_TIME |
| 0891 | TASK_SIT_IN_RESTAURANT |
| 0892 | GET_RANDOM_ATTRACTOR_ON_CLOSEST_OBJECT_OF_TYPE |
| 0893 | ATTACH_TRAILER_TO_CAB |
| 0894 | ADD_INTERESTING_ENTITY_FOR_CHAR |
| 0895 | CLEAR_INTERESTING_ENTITIES_FOR_CHAR |
| 0896 | GET_CLOSEST_ATTRACTOR |
| 0897 | IS_VEHICLE_TOUCHING_OBJECT |
| 0898 | ENABLE_CRANE_CONTROLS |
| 0899 | ALLOCATE_SCRIPT_TO_ATTRACTOR |
| 089A | GET_CLOSEST_ATTRACTOR_WITH_THIS_SCRIPT |
| 089B | IS_PLAYER_IN_POSITION_FOR_CONVERSATION |
| 089C | ENABLE_CONVERSATION |
| 089D | GET_CONVERSATION_STATUS |
| 089E | GET_RANDOM_CHAR_IN_SPHERE_ONLY_DRUGS_BUYERS |
| 089F | GET_PED_TYPE |
| 08A0 | TASK_USE_CLOSEST_MAP_ATTRACTOR |
| 08A1 | GET_CHAR_MAP_ATTRACTOR_STATUS |
| 08A2 | PLANE_ATTACK_PLAYER_USING_DOG_FIGHT |
| 08A3 | CAN_TRIGGER_GANG_WAR_WHEN_ON_A_MISSION |
| 08A4 | CONTROL_MOVABLE_VEHICLE_PART |
| 08A5 | WINCH_CAN_PICK_VEHICLE_UP |
| 08A6 | OPEN_CAR_DOOR_A_BIT |
| 08A7 | IS_CAR_DOOR_FULLY_OPEN |
| 08A8 | SET_ALWAYS_DRAW_3D_MARKERS |
| 08A9 | STREAM_SCRIPT |
| 08AA | STREAM_SCRIPT_INTERNAL |
| 08AB | HAS_STREAMED_SCRIPT_LOADED |
| 08AC | SET_GANG_WARS_TRAINING_MISSION |
| 08AD | SET_CHAR_HAS_USED_ENTRY_EXIT |
| 08AE | DRAW_WINDOW_TEXT |
| 08AF | SET_CHAR_MAX_HEALTH |
| 08B0 | SET_CAR_PITCH |
| 08B1 | SET_NIGHT_VISION |
| 08B2 | SET_INFRARED_VISION |
| 08B3 | SET_ZONE_FOR_GANG_WARS_TRAINING |
| 08B4 | IS_GLOBAL_VAR_BIT_SET_CONST |
| 08B5 | IS_GLOBAL_VAR_BIT_SET_VAR |
| 08B6 | IS_GLOBAL_VAR_BIT_SET_LVAR |
| 08B7 | IS_LOCAL_VAR_BIT_SET_CONST |
| 08B8 | IS_LOCAL_VAR_BIT_SET_VAR |
| 08B9 | IS_LOCAL_VAR_BIT_SET_LVAR |
| 08BA | SET_GLOBAL_VAR_BIT_CONST |
| 08BB | SET_GLOBAL_VAR_BIT_VAR |
| 08BC | SET_GLOBAL_VAR_BIT_LVAR |
| 08BD | SET_LOCAL_VAR_BIT_CONST |
| 08BE | SET_LOCAL_VAR_BIT_VAR |
| 08BF | SET_LOCAL_VAR_BIT_LVAR |
| 08C0 | CLEAR_GLOBAL_VAR_BIT_CONST |
| 08C1 | CLEAR_GLOBAL_VAR_BIT_VAR |
| 08C2 | CLEAR_GLOBAL_VAR_BIT_LVAR |
| 08C3 | CLEAR_LOCAL_VAR_BIT_CONST |
| 08C4 | CLEAR_LOCAL_VAR_BIT_VAR |
| 08C5 | CLEAR_LOCAL_VAR_BIT_LVAR |
| 08C6 | SET_CHAR_CAN_BE_KNOCKED_OFF_BIKE |
| 08C7 | SET_CHAR_COORDINATES_DONT_WARP_GANG |
| 08C8 | ADD_PRICE_MODIFIER |
| 08C9 | REMOVE_PRICE_MODIFIER |
| 08CA | INIT_ZONE_POPULATION_SETTINGS |
| 08CB | EXPLODE_CAR_IN_CUTSCENE_SHAKE_AND_BITS |
| 08CC | PICK_UP_OBJECT_WITH_WINCH |
| 08CD | PICK_UP_VEHICLE_WITH_WINCH |
| 08CE | PICK_UP_CHAR_WITH_WINCH |
| 08CF | STORE_CAR_IN_NEAREST_IMPOUNDING_GARAGE |
| 08D0 | IS_SKIP_CUTSCENE_BUTTON_PRESSED |
| 08D1 | GET_CUTSCENE_OFFSET |
| 08D2 | SET_OBJECT_SCALE |
| 08D3 | GET_CURRENT_POPULATION_ZONE_TYPE |
| 08D4 | CREATE_MENU |
| 08D5 | CONSTANT_INT |
| 08D6 | SET_MENU_COLUMN_ORIENTATION |
| 08D7 | GET_MENU_ITEM_SELECTED |
| 08D8 | GET_MENU_ITEM_ACCEPTED |
| 08D9 | ACTIVATE_MENU_ITEM |
| 08DA | DELETE_MENU |
| 08DB | SET_MENU_COLUMN |
| 08DC | SET_BLIP_ENTRY_EXIT |
| 08DD | SWITCH_DEATH_PENALTIES |
| 08DE | SWITCH_ARREST_PENALTIES |
| 08DF | SET_EXTRA_HOSPITAL_RESTART_POINT |
| 08E0 | SET_EXTRA_POLICE_STATION_RESTART_POINT |
| 08E1 | FIND_NUMBER_TAGS_TAGGED |
| 08E2 | GET_TERRITORY_UNDER_CONTROL_PERCENTAGE |
| 08E3 | IS_OBJECT_IN_ANGLED_AREA_2D |
| 08E4 | IS_OBJECT_IN_ANGLED_AREA_3D |
| 08E5 | GET_RANDOM_CHAR_IN_SPHERE_NO_BRAIN |
| 08E6 | SET_PLANE_UNDERCARRIAGE_UP |
| 08E7 | DISABLE_ALL_ENTRY_EXITS |
| 08E8 | ATTACH_ANIMS_TO_MODEL |
| 08E9 | SET_OBJECT_AS_STEALABLE |
| 08EA | SET_CREATE_RANDOM_GANG_MEMBERS |
| 08EB | ADD_SPARKS |
| 08EC | GET_VEHICLE_CLASS |
| 08ED | CLEAR_CONVERSATION_FOR_CHAR |
| 08EE | SET_MENU_ITEM_WITH_NUMBER |
| 08EF | SET_MENU_ITEM_WITH_2_NUMBERS |
| 08F0 | APPEND_TO_NEXT_CUTSCENE |
| 08F1 | GET_NAME_OF_INFO_ZONE |
| 08F2 | VEHICLE_CAN_BE_TARGETTED_BY_HS_MISSILE |
| 08F3 | SET_FREEBIES_IN_VEHICLE |
| 08F4 | SET_SCRIPT_LIMIT_TO_GANG_SIZE |
| 08F5 | MAKE_PLAYER_GANG_DISAPPEAR |
| 08F6 | MAKE_PLAYER_GANG_REAPPEAR |
| 08F7 | GET_CLOTHES_ITEM |
| 08F8 | SHOW_UPDATE_STATS |
| 08F9 | IS_VAR_TEXT_LABEL16_EQUAL_TO_TEXT_LABEL |
| 08FA | IS_LVAR_TEXT_LABEL16_EQUAL_TO_TEXT_LABEL |
| 08FB | SET_COORD_BLIP_APPEARANCE |
| 08FC | GET_MENU_POSITION |
| 08FD | SET_HEATHAZE_EFFECT |
| 08FE | IS_HELP_MESSAGE_BEING_DISPLAYED |
| 08FF | HAS_OBJECT_BEEN_DAMAGED_BY_WEAPON |
| 0900 | CLEAR_OBJECT_LAST_WEAPON_DAMAGE |
| 0901 | SET_PLAYER_JUMP_BUTTON |
| 0902 | SET_OBJECT_BEEN_PHOTOGRAPHED_FLAG |
| 0903 | SET_CHAR_BEEN_PHOTOGRAPHED_FLAG |
| 0904 | GET_HUD_COLOUR |
| 0905 | LOCK_DOOR |
| 0906 | SET_OBJECT_MASS |
| 0907 | GET_OBJECT_MASS |
| 0908 | SET_OBJECT_TURN_MASS |
| 0909 | GET_OBJECT_TURN_MASS |
| 090A | IS_PLAYBACK_FOR_CAR_PAUSED |
| 090B | TRIGGER_PED_BOUNCE |
| 090C | SET_SPECIFIC_ZONE_TO_TRIGGER_GANG_WAR |
| 090D | CLEAR_SPECIFIC_ZONES_TO_TRIGGER_GANG_WAR |
| 090E | SET_ACTIVE_MENU_ITEM |
| 090F | MARK_STREAMED_SCRIPT_AS_NO_LONGER_NEEDED |
| 0910 | REMOVE_STREAMED_SCRIPT |
| 0911 | REGISTER_STREAMED_SCRIPT |
| 0912 | SET_MESSAGE_FORMATTING |
| 0913 | START_NEW_STREAMED_SCRIPT |
| 0914 | REGISTER_STREAMED_SCRIPT_INTERNAL |
| 0915 | SET_WEATHER_TO_APPROPRIATE_TYPE_NOW |
| 0916 | WINCH_CAN_PICK_OBJECT_UP |
| 0917 | SWITCH_AUDIO_ZONE |
| 0918 | SET_CAR_ENGINE_ON |
| 0919 | SET_CAR_LIGHTS_ON |
| 091A | GET_LATEST_CONSOLE_COMMAND |
| 091B | RESET_LATEST_CONSOLE_COMMAND |
| 091C | GET_USER_OF_CLOSEST_MAP_ATTRACTOR |
| 091D | SWITCH_ROADS_BACK_TO_ORIGINAL |
| 091E | SWITCH_PED_ROADS_BACK_TO_ORIGINAL |
| 091F | GET_PLANE_UNDERCARRIAGE_POSITION |
| 0920 | CAMERA_SET_VECTOR_TRACK |
| 0921 | CAMERA_SET_SHAKE_SIMULATION |
| 0922 | CAMERA_SET_LERP_FOV |
| 0923 | SWITCH_AMBIENT_PLANES |
| 0924 | SET_DARKNESS_EFFECT |
| 0925 | CAMERA_RESET_NEW_SCRIPTABLES |
| 0926 | GET_NUMBER_OF_INSTANCES_OF_STREAMED_SCRIPT |
| 0927 | ALLOCATE_STREAMED_SCRIPT_TO_PED_GENERATOR |
| 0928 | ALLOCATE_STREAMED_SCRIPT_TO_RANDOM_PED |
| 0929 | ALLOCATE_STREAMED_SCRIPT_TO_OBJECT |
| 092A | SET_PLAYER_CAN_BE_DAMAGED |
| 092B | GET_GROUP_MEMBER |
| 092C | GET_PLAYERS_GANG_IN_CAR_ACTIVE |
| 092D | SET_PLAYERS_GANG_IN_CAR_ACTIVE |
| 092E | GET_WATER_HEIGHT_AT_COORDS |
| 092F | CAMERA_PERSIST_TRACK |
| 0930 | CAMERA_PERSIST_POS |
| 0931 | CAMERA_PERSIST_FOV |
| 0932 | CAMERA_IS_FOV_RUNNING |
| 0933 | CAMERA_IS_VECTOR_MOVE_RUNNING |
| 0934 | CAMERA_IS_VECTOR_TRACK_RUNNING |
| 0935 | CAMERA_IS_SHAKE_RUNNING |
| 0936 | CAMERA_SET_VECTOR_MOVE |
| 0937 | DRAW_WINDOW |
| 0938 | CLEAR_ALL_QUEUED_DIALOGUE |
| 0939 | ATTACH_CAR_TO_OBJECT |
| 093A | SET_GARAGE_RESPRAY_FREE |
| 093B | SET_CHAR_BULLETPROOF_VEST |
| 093C | SET_ONSCREEN_COUNTER_COLOUR |
| 093D | SET_CINEMA_CAMERA |
| 093E | SET_CHAR_FIRE_DAMAGE_MULTIPLIER |
| 093F | IS_FIRE_BUTTON_PRESSED |
| 0940 | SET_GROUP_FOLLOW_STATUS |
| 0941 | SET_SEARCHLIGHT_CLIP_IF_COLLIDING |
| 0942 | HAS_PLAYER_BOUGHT_ITEM |
| 0943 | SET_CAMERA_BEHIND_CHAR |
| 0944 | SET_CAMERA_IN_FRONT_OF_CHAR |
| 0945 | GET_PLAYER_MAX_ARMOUR |
| 0946 | SET_CHAR_USES_UPPERBODY_DAMAGE_ANIMS_ONLY |
| 0947 | SET_CHAR_SAY_CONTEXT |
| 0948 | ADD_EXPLOSION_VARIABLE_SHAKE |
| 0949 | ATTACH_MISSION_AUDIO_TO_CHAR |
| 094A | UPDATE_PICKUP_MONEY_PER_DAY |
| 094B | GET_NAME_OF_ENTRY_EXIT_CHAR_USED |
| 094C | GET_POSITION_OF_ENTRY_EXIT_CHAR_USED |
| 094D | IS_CHAR_TALKING |
| 094E | DISABLE_CHAR_SPEECH |
| 094F | ENABLE_CHAR_SPEECH |
| 0950 | SET_UP_SKIP |
| 0951 | CLEAR_SKIP |
| 0952 | PRELOAD_BEAT_TRACK |
| 0953 | GET_BEAT_TRACK_STATUS |
| 0954 | PLAY_BEAT_TRACK |
| 0955 | STOP_BEAT_TRACK |
| 0956 | FIND_MAX_NUMBER_OF_GROUP_MEMBERS |
| 0957 | VEHICLE_DOES_PROVIDE_COVER |
| 0958 | CREATE_SNAPSHOT_PICKUP |
| 0959 | CREATE_HORSESHOE_PICKUP |
| 095A | CREATE_OYSTER_PICKUP |
| 095B | HAS_OBJECT_BEEN_UPROOTED |
| 095C | ADD_SMOKE_PARTICLE |
| 095D | IS_CHAR_STUCK_UNDER_CAR |
| 095E | CONTROL_CAR_DOOR |
| 095F | GET_DOOR_ANGLE_RATIO |
| 0960 | SET_PLAYER_DISPLAY_VITAL_STATS_BUTTON |
| 0961 | SET_CHAR_KEEP_TASK |
| 0962 | DOES_CAR_HAVE_ROOF |
| 0963 | SET_BLIP_FADE |
| 0964 | CREATE_MENU_GRID |
| 0965 | IS_CHAR_SWIMMING |
| 0966 | GET_CHAR_SWIM_STATE |
| 0967 | START_CHAR_FACIAL_TALK |
| 0968 | STOP_CHAR_FACIAL_TALK |
| 0969 | IS_BIG_VEHICLE |
| 096A | SWITCH_POLICE_HELIS |
| 096B | STORE_CAR_MOD_STATE |
| 096C | RESTORE_CAR_MOD_STATE |
| 096D | GET_CURRENT_CAR_MOD |
| 096E | IS_CAR_LOW_RIDER |
| 096F | IS_CAR_STREET_RACER |
| 0970 | FORCE_DEATH_RESTART |
| 0971 | SYNC_WATER |
| 0972 | SET_CHAR_COORDINATES_NO_OFFSET |
| 0973 | DOES_SCRIPT_FIRE_EXIST |
| 0974 | RESET_STUFF_UPON_RESURRECTION |
| 0975 | IS_EMERGENCY_SERVICES_VEHICLE |
| 0976 | KILL_FX_SYSTEM_NOW |
| 0977 | IS_OBJECT_WITHIN_BRAIN_ACTIVATION_RANGE |
| 0978 | COPY_SHARED_CHAR_DECISION_MAKER |
| 0979 | LOAD_SHARED_CHAR_DECISION_MAKER |
| 097A | REPORT_MISSION_AUDIO_EVENT_AT_POSITION |
| 097B | REPORT_MISSION_AUDIO_EVENT_AT_OBJECT |
| 097C | ATTACH_MISSION_AUDIO_TO_OBJECT |
| 097D | GET_NUM_CAR_COLOURS |
| 097E | IS_POLICE_VEHICLE_IN_PURSUIT |
| 097F | GET_CAR_COLOUR_FROM_MENU_INDEX |
| 0980 | EXTINGUISH_FIRE_AT_POINT |
| 0981 | HAS_TRAIN_DERAILED |
| 0982 | SET_CHAR_FORCE_DIE_IN_CAR |
| 0983 | SET_ONLY_CREATE_GANG_MEMBERS |
| 0984 | GET_OBJECT_MODEL |
| 0985 | SET_CHAR_USES_COLLISION_CLOSEST_OBJECT_OF_TYPE |
| 0986 | CLEAR_ALL_SCRIPT_FIRE_FLAGS |
| 0987 | GET_CAR_BLOCKING_CAR |
| 0988 | GET_CURRENT_VEHICLE_PAINTJOB |
| 0989 | SET_HELP_MESSAGE_BOX_SIZE |
| 098A | SET_GUNSHOT_SENSE_RANGE_FOR_RIOT2 |
| 098B | STRING_CAT16 |
| 098C | STRING_CAT8 |
| 098D | GET_CAR_MOVING_COMPONENT_OFFSET |
| 098E | SET_NAMED_ENTRY_EXIT_FLAG |
| 098F | RADIANS_TO_DEGREES |
| 0990 | DEGREES_TO_RADIANS |
| 0991 | PAUSE_CURRENT_BEAT_TRACK |
| 0992 | SET_PLAYER_CYCLE_WEAPON_BUTTON |
| 0993 | SET_CHAR_AIR_RESISTANCE_MULTIPLIER |
| 0994 | MARK_ROAD_NODE_AS_DONT_WANDER |
| 0995 | UNMARK_ALL_ROAD_NODES_AS_DONT_WANDER |
| 0996 | SET_CHECKPOINT_HEADING |
| 0997 | SET_MISSION_RESPECT_TOTAL |
| 0998 | AWARD_PLAYER_MISSION_RESPECT |
| 0999 | SET_PLAYER_FIRE_WITH_SHOULDER_BUTTON |
| 099A | SET_CAR_COLLISION |
| 099B | CHANGE_PLAYBACK_TO_USE_AI |
| 099C | CAMERA_SET_SHAKE_SIMULATION_SIMPLE |
| 099D | IS_NIGHT_VISION_ACTIVE |
| 099E | SET_CREATE_RANDOM_COPS |
| 099F | TASK_SET_IGNORE_WEAPON_RANGE_FLAG |
| 09A0 | TASK_PICK_UP_SECOND_OBJECT |
| 09A1 | DROP_SECOND_OBJECT |
| 09A2 | REMOVE_OBJECT_ELEGANTLY |
| 09A3 | DRAW_CROSSHAIR |
| 09A4 | SET_UP_CONVERSATION_NODE_WITH_SPEECH |
| 09A5 | SET_CCTV_EFFECT |
| 09A6 | SHOW_BLIPS_ON_ALL_LEVELS |
| 09A7 | SET_CHAR_DRUGGED_UP |
| 09A8 | IS_CHAR_HEAD_MISSING |
| 09A9 | GET_HASH_KEY |
| 09AA | SET_UP_CONVERSATION_END_NODE_WITH_SPEECH |
| 09AB | RANDOM_PASSENGER_SAY |
| 09AC | HIDE_ALL_FRONTEND_BLIPS |
| 09AD | SET_PLAYER_IN_CAR_CAMERA_MODE |
| 09AE | IS_CHAR_IN_ANY_TRAIN |
| 09AF | SET_UP_SKIP_AFTER_MISSION |
| 09B0 | SET_VEHICLE_IS_CONSIDERED_BY_PLAYER |
| 09B1 | GET_CPU_LEVEL |
| 09B2 | GET_RANDOM_CAR_MODEL_IN_MEMORY |
| 09B3 | GET_CAR_DOOR_LOCK_STATUS |
| 09B4 | SET_CLOSEST_ENTRY_EXIT_FLAG |
| 09B5 | SET_CHAR_SIGNAL_AFTER_KILL |
| 09B6 | SET_CHAR_WANTED_BY_POLICE |
| 09B7 | SET_ZONE_NO_COPS |
| 09B8 | ADD_BLOOD |
| 09B9 | DISPLAY_CAR_NAMES |
| 09BA | DISPLAY_ZONE_NAMES |
| 09BB | IS_CAR_DOOR_DAMAGED |
| 09BC | SET_CHAR_COORDINATES_DONT_WARP_GANG_NO_OFFSET |
| 09BD | SET_MINIGAME_IN_PROGRESS |
| 09BE | IS_MINIGAME_IN_PROGRESS |
| 09BF | SET_FORCE_RANDOM_CAR_MODEL |
| 09C0 | GET_RANDOM_CAR_OF_TYPE_IN_ANGLED_AREA_NO_SAVE |
| 09C1 | ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS |
| 09C2 | FAIL_KILL_FRENZY |
| 09C3 | IS_COP_VEHICLE_IN_AREA_3D_NO_SAVE |
| 09C4 | SET_PETROL_TANK_WEAKPOINT |
| 09C5 | IS_CHAR_USING_MAP_ATTRACTOR |
| 09C6 | SET_ALL_CARS_IN_AREA_VISIBLE |
| 09C7 | SET_PLAYER_MODEL |
| 09C8 | ARE_SUBTITLES_SWITCHED_ON |
| 09C9 | REMOVE_CHAR_FROM_CAR_MAINTAIN_POSITION |
| 09CA | SET_OBJECT_PROOFS |
| 09CB | IS_CAR_TOUCHING_CAR |
| 09CC | DOES_OBJECT_HAVE_THIS_MODEL |
| 09CD | IS_ITALIAN_GAME |
| 09CE | IS_SPANISH_GAME |
| 09CF | SET_TRAIN_FORCED_TO_SLOW_DOWN |
| 09D0 | IS_VEHICLE_ON_ALL_WHEELS |
| 09D1 | DOES_PICKUP_EXIST |
| 09D2 | ENABLE_AMBIENT_CRIME |
| 09D3 | IS_AMBIENT_CRIME_ENABLED |
| 09D4 | CLEAR_WANTED_LEVEL_IN_GARAGE |
| 09D5 | SET_CHAR_SAY_CONTEXT_IMPORTANT |
| 09D6 | SET_CHAR_SAY_SCRIPT |
| 09D7 | FORCE_INTERIOR_LIGHTING_FOR_PLAYER |
| 09D8 | DISABLE_2ND_PAD_FOR_DEBUG |
| 09D9 | USE_DETONATOR |
| 09DA | IS_MONEY_PICKUP_AT_COORDS |
| 09DB | SET_MENU_COLUMN_WIDTH |
| 09DC | SET_CHAR_CAN_CLIMB_OUT_WATER |
| 09DD | MAKE_ROOM_IN_PLAYER_GANG_FOR_MISSION_PEDS |
| 09DE | IS_CHAR_GETTING_IN_TO_A_CAR |
| 09DF | RESTORE_PLAYER_AFTER_2P_GAME |
| 09E0 | SET_UP_SKIP_FOR_SPECIFIC_VEHICLE |
| 09E1 | GET_CAR_MODEL_VALUE |
| 09E2 | CREATE_CAR_GENERATOR_WITH_PLATE |
| 09E3 | FIND_TRAIN_DIRECTION |
| 09E4 | SET_AIRCRAFT_CARRIER_SAM_SITE |
| 09E5 | DRAW_LIGHT_WITH_RANGE |
| 09E6 | ENABLE_BURGLARY_HOUSES |
| 09E7 | IS_PLAYER_CONTROL_ON |
| 09E8 | GET_CHAR_AREA_VISIBLE |
| 09E9 | GIVE_NON_PLAYER_CAR_NITRO |
| 09EA | PLAYER_PUT_ON_GOGGLES |
| 09EB | PLAYER_TAKE_OFF_GOGGLES |
| 09EC | ALLOW_FIXED_CAMERA_COLLISION |
| 09ED | HAS_CHAR_SPOTTED_CHAR_IN_FRONT |
| 09EE | FORCE_BIG_MESSAGE_AND_COUNTER |
| 09EF | SET_VEHICLE_CAMERA_TWEAK |
| 09F0 | RESET_VEHICLE_CAMERA_TWEAK |
| 09F1 | REPORT_MISSION_AUDIO_EVENT_AT_CHAR |
| 09F2 | DOES_DECISION_MAKER_EXIST |
| 09F3 | GET_RANDOM_TRAIN_IN_SPHERE_NO_SAVE |
| 09F4 | IGNORE_HEIGHT_DIFFERENCE_FOLLOWING_NODES |
| 09F5 | SHUT_ALL_CHARS_UP |
| 09F6 | SET_CHAR_GET_OUT_UPSIDE_DOWN_CAR |
| 09F7 | REPORT_MISSION_AUDIO_EVENT_AT_CAR |
| 09F8 | DO_WEAPON_STUFF_AT_START_OF_2P_GAME |
| 09F9 | SET_MENU_HEADER_ORIENTATION |
| 09FA | HAS_GAME_JUST_RETURNED_FROM_FRONTEND |
| 09FB | GET_CURRENT_LANGUAGE |
| 09FC | IS_OBJECT_INTERSECTING_WORLD |
| 09FD | GET_STRING_WIDTH |
| 09FE | RESET_VEHICLE_HYDRAULICS |
| 09FF | SET_RESPAWN_POINT_FOR_DURATION_OF_MISSION |
| 0A00 | IS_THIS_MODEL_A_BIKE |
| 0A01 | IS_THIS_MODEL_A_CAR |
| 0A02 | SWITCH_ON_GROUND_SEARCHLIGHT |
| 0A03 | IS_GANG_WAR_FIGHTING_GOING_ON |
| 0A04 | SET_VEHICLE_FIRING_RATE_MULTIPLIER |
| 0A05 | GET_VEHICLE_FIRING_RATE_MULTIPLIER |
| 0A06 | IS_NEXT_STATION_ALLOWED |
| 0A07 | SKIP_TO_NEXT_ALLOWED_STATION |
| 0A08 | GET_STRING_WIDTH_WITH_NUMBER |
| 0A09 | SHUT_CHAR_UP_FOR_SCRIPTED_SPEECH |
| 0A0A | ENABLE_DISABLED_ATTRACTORS_ON_OBJECT |
| 0A0B | LOAD_SCENE_IN_DIRECTION |
| 0A0C | IS_PLAYER_USING_JETPACK |
| 0A0D | BLOCK_VEHICLE_MODEL |
| 0A0E | CLEAR_THIS_PRINT_BIG_NOW |
| 0A0F | HAS_LANGUAGE_CHANGED |
| 0A10 | INCREMENT_INT_STAT_NO_MESSAGE |
| 0A11 | SET_EXTRA_CAR_COLOURS |
| 0A12 | GET_EXTRA_CAR_COLOURS |
| 0A13 | MANAGE_ALL_POPULATION |
| 0A14 | SET_NO_RESPRAYS |
| 0A15 | HAS_CAR_BEEN_RESPRAYED |
| 0A16 | ATTACH_MISSION_AUDIO_TO_CAR |
| 0A17 | SET_HAS_BEEN_OWNED_FOR_CAR_GENERATOR |
| 0A18 | SET_UP_CONVERSATION_NODE_WITH_SCRIPTED_SPEECH |
| 0A19 | SET_AREA_NAME |
| 0A1A | TASK_PLAY_ANIM_SECONDARY |
| 0A1B | IS_CHAR_TOUCHING_CHAR |
| 0A1C | DISABLE_HELI_AUDIO |
| 0A1D | TASK_HAND_GESTURE |
| 0A1E | TAKE_PHOTO |
| 0A1F | INCREMENT_FLOAT_STAT_NO_MESSAGE |
| 0A20 | SET_PLAYER_GROUP_TO_FOLLOW_ALWAYS |
| 0A21 | IMPROVE_CAR_BY_CHEATING |
| 0A22 | CHANGE_CAR_COLOUR_FROM_MENU |
| 0A23 | HIGHLIGHT_MENU_ITEM |
| 0A24 | SET_DISABLE_MILITARY_ZONES |
| 0A25 | SET_CAMERA_POSITION_UNFIXED |
| 0A26 | SET_RADIO_TO_PLAYERS_FAVOURITE_STATION |
| 0A27 | SET_DEATH_WEAPONS_PERSIST |
| 0A28 | SET_SWIM_SPEED |
| 0A29 | IS_PLAYER_CLIMBING |
| 0A2A | IS_THIS_HELP_MESSAGE_BEING_DISPLAYED |
| 0A2B | IS_WIDESCREEN_ON_IN_OPTIONS |
| 0A2C | DRAW_SUBTITLES_BEFORE_FADE |
| 0A2D | DRAW_ODDJOB_TITLE_BEFORE_FADE |
| 0A2E | TASK_FOLLOW_PATH_NODES_TO_COORD_WITH_RADIUS |
| 0A2F | SET_PHOTO_CAMERA_EFFECT |
| 0A30 | FIX_CAR |
| 0A31 | SET_PLAYER_GROUP_TO_FOLLOW_NEVER |
| 0A32 | IS_CHAR_ATTACHED_TO_ANY_CAR |
| 0A33 | STORE_CAR_CHAR_IS_ATTACHED_TO_NO_SAVE |
| 0A34 | SET_UP_SKIP_TO_BE_FINISHED_BY_SCRIPT |
| 0A35 | SET_UP_SKIP_FOR_VEHICLE_FINISHED_BY_SCRIPT |
| 0A36 | IS_SKIP_WAITING_FOR_SCRIPT_TO_FADE_IN |
| 0A37 | FORCE_ALL_VEHICLE_LIGHTS_OFF |
| 0A38 | SET_RENDER_PLAYER_WEAPON |
| 0A39 | GET_PLAYER_IN_CAR_CAMERA_MODE |
| 0A3A | IS_LAST_BUILDING_MODEL_SHOT_BY_PLAYER |
| 0A3B | CLEAR_LAST_BUILDING_MODEL_SHOT_BY_PLAYER |
| 0A3C | SET_UP_CONVERSATION_END_NODE_WITH_SCRIPTED_SPEECH |
| 0A3D | ACTIVATE_PIMP_CHEAT |
| 0A3E | GET_RANDOM_CHAR_IN_AREA_OFFSET_NO_SAVE |
| 0A3F | SET_SCRIPT_COOP_GAME |
| 0A40 | CREATE_USER_3D_MARKER |
| 0A41 | REMOVE_USER_3D_MARKER |
| 0A42 | REMOVE_ALLUSER_3D_MARKERS |
| 0A43 | GET_RID_OF_PLAYER_PROSTITUTE |
| 0A44 | DISPLAY_NON_MINIGAME_HELP_MESSAGES |
| 0A45 | SET_RAILTRACK_RESISTANCE_MULT |
| 0A46 | SWITCH_OBJECT_BRAINS |
| 0A47 | FINISH_SETTING_UP_CONVERSATION_NO_SUBTITLES |
| 0A48 | ALLOW_PAUSE_IN_WIDESCREEN |
| 0A49 | IS_XBOX_VERSION |
| 0A4A | GET_PC_MOUSE_MOVEMENT |
| 0A4B | IS_PC_USING_JOYPAD |
| 0A4C | IS_MOUSE_USING_VERTICAL_INVERSION |
| 0A4D | IS_JAPANESE_VERSION |
| 0A4E | IS_XBOX_PLAYER2_PRESSING_START |
| 0A4F | FINISHED_WITH_XBOX_PLAYER2 |
| 0A50 | DO_DEBUG_STUFF |
| 0A51 | IS_WIDGET_PRESSED |
| 0A52 | IS_WIDGET_RELEASED |
| 0A53 | IS_WIDGET_DOUBLETAPPED |
| 0A54 | IS_WIDGET_SWIPED |
| 0A55 | IS_WIDGET_SWIPED_LEFT |
| 0A56 | IS_WIDGET_SWIPED_RIGHT |
| 0A57 | DO_MISSION_SKIP |
| 0A58 | GET_MISSION_NUM |
| 0A59 | GET_MISSION_PAGE |
| 0A5A | GET_WIDGET_VALUE |
| 0A5B | GET_WIDGET_VALUE2 |
| 0A5C | DISPLAY_TEXT_WIDGET |
| 0A5D | GET_WIDGET_POSITION |
| 0A5E | SET_WIDGET_VALUE |
| 0A5F | SET_SLIDER_RANGE |
| 0A60 | ADD_WIDGET_FLAG |
| 0A61 | REMOVE_WIDGET_FLAG |
| 0A62 | ADD_BUTTON_FLAG |
| 0A63 | REMOVE_BUTTON_FLAG |
| 0A64 | IS_TOUCH_ENABLED |
| 0A65 | IS_FINALBUILD |
| 0A66 | WRITE_LOG |
| 0A67 | WRITE_LOG_INT |
| 0A68 | WRITE_LOG_FLOAT |
| 0A69 | CREATE_SHOP_WIDGET |
| 0A6A | ADD_SHOP_ITEM |
| 0A6B | DELETE_WIDGET |
| 0A6C | SET_EQUIPPED_ITEM |
| 0A6D | PRINT_HELP_FOREVER_CONDITIONAL |
| 0A6E | SET_WIDGET_TEXTURE |
| 0A6F | CHECKPOINT_SAVE |
| 0A70 | DISPLAY_TEXT_CLAMPED |
| 0A71 | DISPLAY_TEXT_WITH_NUMBER_CLAMPED |
| 0A72 | AUTO_SAVE |
| 0A73 | SET_WIDGET_VALUE3 |
| 0A74 | IS_CHECKPOINT_RESUMING |
| 0A75 | SET_ACTIVE_MENU_ITEM_CAR_MODS |
| 0A76 | HID_IMPLEMENTS |
| 0A77 | CHECKPOINT_SAVE_ODDJOB |
| 0A78 | PRINT_HELP_CONDITIONAL |
| 0A79 | PRINT_HELP_CONDITIONAL_TOUCH |
| 0A7A | PRINT_HELP_CONDITIONAL_HID |
| 0A7B | PRINT_HELP_CONDITIONAL_TOUCH_CLASSIC |
| 0A7C | PRINT_HELP_CONDITIONAL_TOUCH_ADAPTED |
| 0A7D | PRINT_HELP_CONDITIONAL_HID_JOYPAD |
| 0A7E | PRINT_HELP_CONDITIONAL_HID_KEYBOARD |
| 0A7F | PRINT_HELP_CONDITIONAL_TOUCH_ANALOG |
| 0A80 | SET_WIDGET_VALUE2 |
| 0A81 | SET_WIDGET_INFO |
| 0A82 | SET_WIDGET_INFO2 |
| 0A83 | LOAD_ALL_STREAMING_MODELS |
| 0A84 | IS_HID_RELEASED |