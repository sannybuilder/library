* sliders are scrollable control elements that changes its slider value depending on how much it's been scrolled by the user. But this doesn't mean that the dialog's controls will be repositioned by it.
* a slider's value can be retrieved using SF_DXUT_DIALOG_GET_SLIDER_VALUE.
* a slider's value can be manually manipulated using SF_DXUT_DIALOG_SET_SLIDER_VALUE.
* id must be unique to all elements of this DXUTDialog, else SF won't be able to interact with all old elements with the same id.
* relcoordx, relcoordx, width, height are window screen values.
* relcoordx, relcoordx are relative to the coordinates of the DXUTDialog.