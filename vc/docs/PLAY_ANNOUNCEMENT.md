This command plays the bridge status audio over the radio. The audio will play once the player is in a vehicle. The radio station will abruptly stop and will play the audio. Once the audio is playing, radio stations cannot be switched. When the audio ends, the radio station will fade back in. The audio will play in any vehicles, even if the radio is turned off (Caddy) or if the vehicle doesn't have changeable radio stations (police vehicles). The audio can only be heard once so when the player exits the vehicle while the audio is playing and reenters it, the vehicle will play its normal radio station.

| Value | Enum                             | File name   |
| ----- | -------------------------------- | ----------- |
| 0     | ANNOUNCEMENT_TRACK_BRIDGE_CLOSED | bclosed.mp3 |
| 1     | ANNOUNCEMENT_TRACK_BRIDGE_OPEN   | bopen.mp3   |

This command can actually play many audio files within the Audio directory, not just the bridge announcement audio, and it accepts negative values down to `-25` and positive values up to `230`. From the list of positions of Vice City's audio , offset the position by `-25` to get the appropriate value. For example, a value of `16 - 25 = -9` can play the mall ambiance audio as the announcement, or a value of `66 - 25 = 41` can play the finale cutscene audio as the announcement. At a value of `231`, it overflows back to the beginning of the audio position (i.e. `231` will play audio in position `0`) and will overflow in increments of `256` (i.e. `487` will play audio in position `0`).
