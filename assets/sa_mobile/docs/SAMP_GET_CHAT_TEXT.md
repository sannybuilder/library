* chatlineid value must range between 0-99. Where:
    * chatlineid = 0 indicates the latest viewable chat message (when you fully crolled down).
    * chatlineid = 99 indicates the oldest viewable chat message (when you fully scrolled up).
* stringbuffertext and stringbufferprefix must be a buffer which the string will be written.
* textcolor and prefixcolor are 0xAARRGGBB format where A = Alpha, R = Red, G = Green, B = Blue.
* Can be used as a condition which evaluates as true if chatlineid is valid.