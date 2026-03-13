This command displays a subtitle message looked up by a **GXT key**. The message is appended to the end of the game's subtitle queue. It becomes visible only when all previously queued messages have expired, so it has **lower priority** than PRINT_NOW.

The internal buffer is 400 characters; text longer than 399 characters is silently truncated.

Use PRINT_STRING or PRINT_FORMATTED to display arbitrary text strings.

## Queueing behaviour

Messages are placed in a circular queue of 8 slots. Only the first slot (the *current* message) is visible on screen. Each subsequent message waits until the one before it expires.

If all 8 slots are occupied, the next message is silently discarded.

## Brief History

- The message is recorded in **Brief** (up to 20 entries) at the moment it becomes the current (visible) message.
- Duplicate text is silently ignored.
- To suppress a single message from **Brief**, call `ADD_NEXT_MESSAGE_TO_PREVIOUS_BRIEFS false` immediately before `PRINT`. The flag is consumed and restored to `true` by the command itself.

## Disabling Subtitles with ~z~

Any text starting with the `~z~` GXT prefix will be hidden from the view and the brief, when the option "Show Subtitles" is disabled in the game settings. It is mainly used for mission dialogue lines.