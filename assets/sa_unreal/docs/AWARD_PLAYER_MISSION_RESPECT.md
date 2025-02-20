This command behaves similarly to INCREMENT_INT_STAT_NO_MESSAGE where stat id is 228 (Respect Mission Total).

Awarded mission points affect player's total respect. With each awarded point the total respect gets increased by 1/360 of total mission points set with SET_MISSION_RESPECT_TOTAL.
For example, if SET_MISSION_RESPECT_TOTAL was set to 720, calling AWARD_PLAYER_MISSION_RESPECT 1 results in total respect increased by 0.5 (2 * 1 / 360).
