This command plays the audio for the finale cutscene ("The Exchange" `END.mp3` for GTA III). It is required to use LOAD_END_OF_GAME_TUNE (which loads the finale audio, muffles game audio, and disables radio), else the finale audio will not play. 

Both the finale audio and effects of LOAD_END_OF_GAME_TUNE can only be ended through STOP_END_OF_GAME_TUNE or by pausing the game. Recalling this command while the finale audio is in progress will restart the audio. Recalling this command after the finale audio ended requires using LOAD_END_OF_GAME_TUNE again.
