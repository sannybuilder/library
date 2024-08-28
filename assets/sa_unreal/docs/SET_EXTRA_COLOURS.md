This command sets the extra color of the sky. It is mainly used in interiors in the original script but it can be used outside interiors.

In Vice City, the colors are defined in the "Extracolours" section of the `timecyc.dat` file. Each line in the section corresponds to the color of the sky. Colors `1` through `24` are available. Values outside the range defined in the file produce weird effects. The second parameter determines if the color should instantly change (`0`) or set to the default sky briefly and then fade into change (`1`).

CLEAR_EXTRA_COLOURS clears the extra color effect. The effect will carry into a new game so you have to explicitly clear the effect if you don't want it carried over. The extra color, fade, and whether extra color is active are saved in block `0` of the save file in Vice City and block `0` in San Andreas.
