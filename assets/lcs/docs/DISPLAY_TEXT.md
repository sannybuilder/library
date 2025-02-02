This command displays text at any position on the screen. The X and Y positions of the text are based on a `640 × 448` resolution, which comes from the resolution of the PS2 version of the games. On different resolutions, these positions are scaled accordingly. You should use USE_TEXT_COMMANDS when using this command to prevent unintended side effects like permanent display or game crashes. 

Number of text draws displayed on screen is limited:

* GTA III: `2`
* GTA VC: `48`
* GTA SA: `96`

Each text must be less than `100` characters long. 

Positions `0.0` and lower will display only the shadow of the text. The following images show text displayed in Vice City at positions (`0.0, 0.0`), (`50.0, 50.0`), (`100.0, 100.0`), and (`200.0, 200.0`), from top left to bottom right. Note that the last text is wrapped due to the default wrap x of `182.0` (SET_TEXT_WRAPX).

![](https://raw.githubusercontent.com/sannybuilder/library/refs/heads/master/shared/media/033E.png)
