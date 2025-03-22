1. Initially, while the user isn't pressing the key, this command waits for the user to press the key
2. Once the user holds down the key just now, this command will be evaluated as logical true on all conditional statements during this frame
3. After this frame, waits for the user to release the key
3.1. While waiting, this command will always be evaluated as logical false on all conditional statements
4. When the user releases the key, then process repeats again