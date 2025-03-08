* chatLineId value must range between 0-99. Where:
    * chatLineId = 0 indicates the latest viewable chat message (when you fully crolled down).
    * chatLineId = 99 indicates the oldest viewable chat message (when you fully scrolled up).
* bodyBuffer and prefixBuffer must be a memory buffer where the string will be written.
* textColor and prefixColor are in 0xAARRGGBB format where A = Alpha, R = Red, G = Green, B = Blue.
* Can be used as a condition which evaluates as true if chatLineId is valid.