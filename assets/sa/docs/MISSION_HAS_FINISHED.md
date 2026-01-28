This command resets ("cleans up") multiple settings that are usually set during missions and in some scripts. This helps in getting the game back to "normal" without the need to keep track of multiple settings. This command can only have an effect if it is called within a script launched as a mission using LOAD_AND_LAUNCH_MISSION_INTERNAL or, in GTA III and Vice City only, LAUNCH_MISSION; it has no effect elsewhere. The script does not need to follow the mission structure for this command to work.

## Effects

### Rendering & Visuals

- **Streaming:** Enable streaming.
- **3D Markers Rendering:** Re-enable rendering distance limit.
- **Extra Colour TimeCycle:** Stop extra color if on main map.

- **Post Effects:** Reset script-applied post effects.
- **Radar / Map Blips:**
  - Reset radar zoom value
  - Reset `RadarShowBlipOnAllLevels` flag
  - Re-enable frontend blips.
- **Hud:**
  - Re-enable script-controlled radar, vehicle name, area name, and forced-counters display.
  - Ensure scripts allow HUD display.
  - Re-enable update stats display.
  - Reset HUD help message box size to `200.0f`.
  - Clear item-to-flash.

### Camera & Input

- **Camera:**
  - Reset camera heading variables for turret mode.
  - Turn widescreen off.
  - Restore two-player camera mode defaults.
  - Allow first-person-in-car mode.
  - Force cinema cam off.
  - Initialize scriptable camera components.
  - Set camera distance and scripted fixed-camera collision flag to defaults.
  - Disable overlays (e.g. video/lift).
- **Input:**
  - Reset ducking system.
  - Reset drunk input delay to `0`.
  - Re-enable button controls.
  - Re-enable drive-by ability.
- **Crosshair:** Turn script crosshair off.
- **Frontend Widescreen Pause:** Disable `bPauseWhenInWidescreen` flag.
- **Shop/Mini-game Camera Handling:** If not in mini-game, restore camera (unless player in remote vehicle) and restore player control; clear help message.

### Player & Population

- **Player Fire Damage Multiplier:** Reset to `1.0`.
- **Player Group Defaults:** Restore player's group intelligence, decision-maker, default task allocator, and max separation; re-enable group behaviors (no forced follow/never follow), make group reappear.
- **Ped Speech:** Re-enable ped speech and script ped speech.
- **Ped Type Relationships:** Clear acquaintances/relationships between normal ped types and mission ped types and clear all relationships of mission ped types to everything.
- **Forced Ped Type:** Reset forced ped type.
- **Gang War Triggers:** Disable triggering gang wars from missions and clear specific trigger zones.
- **Gang Wars Training:** Clear training-mission flag and refresh zone gang colors.
- **Zone Gang Colors:** Refresh zone gang colors.
- **Riot:** Reset gunshot sense range.
- **Riot Intensity:** Reset to `0`.

### World & Environment

- **Ambient Crime:** Re-enable ambient crime.
- **Ambient Planes:** Switch ambient planes on.
- **Military Zones:** Re-enable military cull zones.
- **Crane Controls:** Re-enable crane controls.
- **Entry/Exit Manager:** Re-enable entry/exit functionality.
- **Fire Generations Limit:** Reset max script fire generations to `99999`.
- **Garages Respray:** Clear `NoResprays` and open/close all resprays.
- **Weather:** Release mission weather and return control to normal weather system.
- **Path Nodes:** Release requested path nodes, unmark "don't wander" road nodes, tidy node switches.
- **Population Density:** Reset pedestrian and car density multipliers to `1.0`.
- **Random NPC/Cops Creation:** Re-enable creation of random gang members and cops; disable "only create random gang members".
- **Random Trains:** Re-enable random trains and release mission trains.
- **Road Blocks:** Clear script-created roadblocks.
- **SAM Sites Flags:**
  - Reset Area51 SAM disabled flag to `false`.
  - Set aircraft carrier SAM disabled to `true`.

### Vehicles & Entities

- **Cop Bikes Streaming Flag:** Re-enable cop bikes streaming.
- **Store Vehicle Cleanup:** Reset store vehicle index to `-1` and mark it was random.
- **Suppressed Car Models / Forced Random Car:** Clear suppressed car models list; set forced random car model to `-1`.
- **Upside-down / Stuck Cars Lists:** Clear upside-down and stuck cars arrays.
- **Vehicle Recordings:** Unload unused vehicle recordings.
- **Vehicle Remote Detonation:** Re-enable remote detonation and detonation-on-contact.

### Mission & Script

- **Mission Audio:** Clear mission audio slots.
- **Mission Pickups:** Remove mission pickups.
- **Mission-Created Entities Cleanup:** for all entries:
  - For `CLEANUP_CAR`: Validate mission vehicle and call `CleanUpThisVehicle`.
  - For `CLEANUP_CHAR`: Validate mission char and call `CleanUpThisPed`.
  - For `CLEANUP_OBJECT`: Validate mission object and call `CleanUpThisObject`.
  - For `CLEANUP_EFFECT_SYSTEM`: Delete script particle effects.
  - For `CLEANUP_DECISION_MAKER`: Unload decision maker.
  - For `CLEANUP_PEDGROUP`: Remove ped group.
  - For `CLEANUP_SEQUENCE_TASK`: Flush sequences.
  - For `CLEANUP_ATTRACTOR`: Deactivate scripted attractors.
  - For `CLEANUP_SEARCHLIGHT`: Remove script searchlight.
  - For `CLEANUP_CHECKPOINT`: Remove script checkpoint.
  - For `CLEANUP_TEXTURE_DICTIONARY`: Remove script texture dictionary.
  - Remove each entity from the cleanup list after handling.
- **Script Coop Flag:** Clear `bScriptCoopGameGoingOn`.
- **Script Fire Flags:** Clear all script fires.
- **Script Gang Size Limit:** Reset script limit to gang size to `99`.
- **Script Text Formatting:** Disable script text formatting and alignment.
- **Special Characters Requirement:** Mark all special char models as not required by mission.
- **Trip Skips:** Clear trip skip.
- **Respawn Point:** Clear mission respawn point override.

### Miscellaneous

- **Drunkenness / Drug State:** Fade drunkenness, clear drug level to `0`.
- **Mobile Phone Task:** Stop/abort any running mobile-phone use script task.
- **On-screen Timers:** Unfreeze on-screen timers.
- **Wanted Multiplier:** Reset player wanted multiplier to `1.0`.
