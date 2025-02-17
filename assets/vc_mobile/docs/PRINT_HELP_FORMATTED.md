This command displays a black rectangular text box similar to PRINT_HELP. The message is constructed out of the given string and any extra arguments, using common C++ format specifiers starting from `%`, e.g.:

* `%d` prints an integer number
* `%f` prints a floating-point number
* `%s` prints a string.
* `%p` prints a number as an 8-digit hex number
* `%%` prints a single %

For more supported specifiers see: https://cplusplus.com/reference/cstdio/printf/

The string may contain zero or more format specifiers and their count must match the number of arguments.


