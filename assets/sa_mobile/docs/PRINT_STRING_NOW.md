This command displays an **arbitrary text string** as a subtitle with **immediate priority**. The message bypasses the queue and is placed at the front of the subtitle display, replacing whatever is currently shown, so it has **higher priority** than PRINT_STRING. 

The internal buffer is 400 characters; text longer than 399 characters is silently truncated.

To display a message using a GXT key, use PRINT_NOW.

## Priority model

Unlike `PRINT_STRING`, this opcode clears any queued messages and places the new message at the front (slot 0) for immediate display. Use this variant when the subtitle must be seen at once, regardless of what else may be in the queue.

## Brief History (CLEO 5 only)

- The message is recorded in **Brief** (up to 20 entries) **immediately**.
- Duplicate text is silently ignored.
- To suppress a single message from Brief, call `ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS false` immediately before `PRINT_STRING_NOW`. The flag is consumed and restored to `true` by the command itself.

**CLEO 4 / .cs4 scripts**: the flag and Brief are never modified.

## Disabling Subtitles with ~z~ (CLEO 5 only)

Any text starting with the `~z~` GXT prefix will be hidden from the view and the brief, when the option "Show Subtitles" is disabled in the game settings. It is mainly used for mission dialogue lines.

**CLEO 4 / .cs4 scripts**: the `~z~` prefix has no effect.