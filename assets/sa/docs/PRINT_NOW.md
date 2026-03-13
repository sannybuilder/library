This command displays a subtitle message looked up by a **GXT key** with **immediate priority**. The message bypasses the queue and is placed at the front of the subtitle display, replacing whatever is currently shown.

The internal buffer is 400 characters; text longer than 399 characters is silently truncated.

Use PRINT_STRING_NOW or PRINT_FORMATTED_NOW to display arbitrary text strings with immediate priority. 

## Priority model

Unlike PRINT, this opcode clears any queued messages and places the new message at the front (slot 0) for immediate display. Use this variant when the subtitle must be seen immediately, regardless of what else may be in the queue.

## Brief History

- The message is recorded in **Brief** (up to 20 entries) **immediately**.
- Duplicate text is silently ignored.
- To suppress a single message from **Brief**, call `ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS false` immediately before `PRINT_NOW`. The flag is consumed and restored to `true` by the command itself.

## Disabling Subtitles with ~z~

Any text starting with the `~z~` GXT prefix will be hidden from the view and the brief, when the option "Show Subtitles" is disabled in the game settings. It is mainly used for mission dialogue lines.
