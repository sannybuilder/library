Unlike other commands, if provided return variable is an integer GET_TEXT_LABEL_STRING will not read its value as pointer to output text buffer, instead address to existing text in GXT dictionary will be stored.  
The text at this address is read-only and must not be modified. To edit existing GXT text, use the ADD_TEXT_LABEL command instead.
