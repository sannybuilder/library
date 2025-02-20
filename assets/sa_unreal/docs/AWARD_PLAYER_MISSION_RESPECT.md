This command behaves similarly to INCREMENT_INT_STAT_NO_MESSAGE where stat id is `228` (StatId.RespectMissionTotal).

Awarded mission points affect player's total respect. With each awarded point the total respect gets increased by `1/360` of total mission points set with SET_MISSION_RESPECT_TOTAL.
For example, if there are `720` points in total, calling `AWARD_PLAYER_MISSION_RESPECT 1` increases the respect by `2` (because `720 * 1 / 360 * 1 = 2`).
