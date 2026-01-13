The message is constructed out of the given string and any extra arguments.  

Common [C++ format specifiers](https://cplusplus.com/reference/cstdio/printf/) starting from `%` are used to define argument type, e.g.:  
* `%d` integer number in decimal form
* `%x` integer number in hex form (lower case letters)
* `%X` integer number in hex form (upper case letters)
* `%f` floating-point number
* `%s` string
* `%p` 8-digit hex number
* `%%` single `%` character
* `%c` single ASCII character specified by number
* `%4d` at least 4 digits wide integer number (padded with spaces)
* `%04d` at least 4 digits wide integer number (padded with zeros)
* `%.2f` floating-point number rounded to 2 digits after decimal point

The format string may contain zero or more specifiers and their count must match the number of arguments.
