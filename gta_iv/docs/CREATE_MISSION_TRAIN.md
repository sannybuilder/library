This command creates a train at the nearest tracks relative to the coordinate point. Using this command requires the "subway_lo" model to be already loaded through REQUEST_MODEL, otherwise the game may crash.
Here is a partial table with the types of trains and the number of train carriages that will be created with this type:
| Type | Number |
| ---- | ------ |
| 0    | 3      |
| 1    | 2      |
| 10   | 3      |
| 11   | 2      |
| 12   | 1      |

For example, if the first argument of the native is `0`, then three train carriages will be created.
