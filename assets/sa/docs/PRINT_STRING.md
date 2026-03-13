This command displays an **arbitrary text string** as a subtitle. The message is appended to the end of the game's subtitle queue. It becomes visible only when all previously queued messages have expired, so it has **lower priority** than PRINT_STRING_NOW.

The internal buffer is 400 characters; text longer than 399 characters is silently truncated.

To display a message using a GXT key, use PRINT.

## Queueing behaviour

Messages are placed in a circular queue of 8 slots. Only the first slot (the current message) is visible on screen. Each subsequent message waits until the one before it expires.

If all 8 slots are occupied, the next message is silently discarded.

## Brief History (CLEO 5 only)

- The message is recorded in **Brief** (up to 20 entries) at the moment it becomes the current (visible) message.
- Duplicate text is silently ignored.
- To suppress a single message from Brief, call `ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS false` immediately before `PRINT_STRING`. The flag is consumed and restored to `true` by the command itself.

**CLEO 4 / .cs4 scripts**: the flag and Brief are never modified.

## Disabling Subtitles with ~z~ (CLEO 5 only)

Any text starting with the `~z~` GXT prefix will be hidden from the view and the brief, when the option "Show Subtitles" is disabled in the game settings. It is mainly used for mission dialogue lines.

**CLEO 4 / .cs4 scripts**: the `~z~` prefix has no effect.