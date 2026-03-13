This command displays a **printf-style formatted text string** as a subtitle with **immediate priority**. The format string and its arguments are expanded into a final string, which is then placed at the front of the subtitle display, bypassing the queue and replacing whatever is currently shown, so it has **higher priority** than PRINT_FORMATTED.

The internal buffer is 400 characters; text longer than 399 characters is silently truncated.

To display a message using a GXT key, use PRINT_NOW.

### Supported format specifiers

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

## Priority model

Unlike PRINT_FORMATTED, this opcode clears any queued messages and places the new message at the front (slot 0) for immediate display. Use this variant when the subtitle must be seen at once, regardless of what else may be in the queue.

## Brief History (CLEO 5 only)

- The message is recorded in **Brief** (up to 20 entries) **immediately**.
- Duplicate text is silently ignored.
- Formatting is applied at call time; the fully expanded string is what gets displayed and stored in Brief History.
- To suppress a single message from Brief, call `ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS false` immediately before `PRINT_FORMATTED_NOW`. The flag is consumed and restored to `true` by the command itself.

**CLEO 4 / .cs4 scripts**: the flag and Brief are never modified.

## Disabling Subtitles with ~z~ (CLEO 5 only)

Any text starting with the `~z~` GXT prefix will be hidden from the view and the brief, when the option "Show Subtitles" is disabled in the game settings. It is mainly used for mission dialogue lines.

**CLEO 4 / .cs4 scripts**: the `~z~` prefix has no effect.