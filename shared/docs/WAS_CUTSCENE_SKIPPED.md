This conditional command returns true if any cutscene, which is started by START_CUTSCENE, was skipped. On a PC mouse and keyboard setup, a cutscene is considered skipped when these specific keys are pressed:

- Button 16 (SPRINT key on foot, ACCELERATE key in vehicle)
- Left Mouse Button
- Enter
- Return
- Space
  Note that it will keep returning true after the cutscene was skipped. You must watch another cutscene through to the end (starting a cutscene automatically sets the return condition to false) or reload the game to set the return condition to false.
