* sliders are scrollable control elements that changes its slider value depending on how much it's been scrolled by the user. But this doesn't mean that the dialog's controls will be repositioned by it.
* a slider's value can be retrieved using Opcode 0B97.
* a slider's value can be manually manipulated using Opcode 0B98.
* id must be unique to all elements of this DXUTDialog, else SF won't be able to interact with all old elements with the same id.
* relcoordx, relcoordx, width, height are window screen values.
* relcoordx, relcoordx are relative to the coordinates of the DXUTDialog.