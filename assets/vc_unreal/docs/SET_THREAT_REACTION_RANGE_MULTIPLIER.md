This command sets the range multiplier used when characters react to nearby threats. 

The value must be a floating-point number but is stored as an integer, so any digits after the decimal point are truncated. By default, characters only react to threats within a certain distance. Increasing the multiplier extends this detection range, while decreasing it reduces it. For example, a value of `2.0` doubles the distance at which characters can detect and respond to threats. 

The value set by this command carries over when loading another save game (fixed in SilentPatch). It is reset to `1.0` when mission cleanup is processed.