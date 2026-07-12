This command saves the current weather state by storing the values of the following variables:

- `CWeather::OldWeatherType` (previous weather type )
- `CWeather::NewWeatherType` (current weather type)
- `CWeather::InterpolationValue` (interpolation value between weather states)
- `CWeather::Rain` (amount of rain fallen)

Copied values persist while the game is running and are not reset after starting a new game or loading a save game. The weather state can be restored with RESTORE_WEATHER. This command was never called in the original script of GTA III.
