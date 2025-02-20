This command behaves similarly to INCREMENT_INT_STAT_NO_MESSAGE where stat id is `224` (StatId.RespectMission).

Awarded mission points affect player's respect. With each awarded point the respect gets increased by `360/x` where `x` is a total number of mission points set with SET_MISSION_RESPECT_TOTAL. The game ensures `x` is never less than `1`.

For example, if there are `1339` points in total, calling `AWARD_PLAYER_MISSION_RESPECT 5` increases the respect by `1.344` (because `360 / 1339 * 5 = 1.344`).

