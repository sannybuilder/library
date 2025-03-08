* chatlineid value must range between 0-99. Where:
    * chatlineid = 0 indicates the latest viewable chat message (when you fully crolled down).
    * chatlineid = 99 indicates the oldest viewable chat message (when you fully scrolled up).
* textcolor and prefixcolor must be in 0xAARRGGBB format where A = Alpha, R = Red, G = Green, B = Blue.
* Can be used as a condition which evaluates as true if chatlineid is valid.