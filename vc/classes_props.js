import projectConfig from '/classes/pagic.config.js';
export default {
    config: { "root": "/", ...projectConfig, branch: 'master' },
    'pagePath': "vc/classes.md",
    'layoutPath': "_layout.tsx",
    'outputPath': "vc/classes.html",
    'title': undefined,
    'content': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>Class</th>\n<th>Information</th>\n<th>Notes</th>\n<th>Has Constructor?</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Audio</td>\n<td>Audio effects</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Blip</td>\n<td>Markers and radar icons</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Boat</td>\n<td>Boat control</td>\n<td>specific kind of a vehicle</td>\n<td>Y (Car.Create)</td>\n</tr>\n<tr>\n<td>Camera</td>\n<td>Camera/View manipulation</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Car</td>\n<td>Script vehicles</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>CarGenerator</td>\n<td>Parking lots</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Char</td>\n<td>Script characters (actors)</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Clock</td>\n<td>Time manipulation</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Credits</td>\n<td>Credits after the final mission</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Cutscene</td>\n<td>Setting up and playing cutscenes</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>CutsceneObject</td>\n<td>Cutscene object</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Fx</td>\n<td>Various 2D effects (shadown, lights, coronas, particles)</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Game</td>\n<td>Gameplay</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Gang</td>\n<td>Gangs configuration</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Garage</td>\n<td>Garages</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Heli</td>\n<td>Helicopteps</td>\n<td>specific kind of a vehicle</td>\n<td>Y (Car.Create)</td>\n</tr>\n<tr>\n<td>Math</td>\n<td>Math and conversion utilities</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Menu</td>\n<td>Interaction with the main menu</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Object</td>\n<td>Script objects</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Pad</td>\n<td>Input controls</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Path</td>\n<td>Configuring car and ped paths and lookup for nodes</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>Setting up phone booth calls and messages</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Pickup</td>\n<td>Interactive script objects</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Plane</td>\n<td>Planes</td>\n<td>specific kind of a vehicle</td>\n<td>Y (Car.Create)</td>\n</tr>\n<tr>\n<td>Player</td>\n<td>The main character controlled by a player</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Rampage</td>\n<td>Rampages logic</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Rc</td>\n<td>Remote controlled cars logic</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Restart</td>\n<td>Configuration of respawn points</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Screen</td>\n<td>Manipulating game UI</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>ScriptFire</td>\n<td>Script fires</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>ScriptPath</td>\n<td>Script paths</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Sphere</td>\n<td>Cylinder markers</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Stat</td>\n<td>Game statistics</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Streaming</td>\n<td>Loading game assets</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>StuckCarCheck</td>\n<td>Checking if script cars are stuck</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Text</td>\n<td>Displaying subtitles and text boxes</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Txd</td>\n<td>Working with texture dictionaries</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Weather</td>\n<td>Controlling weather</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>World</td>\n<td>Manipulating traffic, population and other physical enitites</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Zone</td>\n<td>Configuring different areas of game map</td>\n<td></td>\n<td>N</td>\n</tr>\n</tbody>\n</table></div>'
        } }),
    'head': React.createElement(React.Fragment, null,
        React.createElement("link", { href: "https://sannybuilder.com/favicon.png", rel: "icon", type: "image/png" }),
        React.createElement("link", { href: "/classes/assets/main.css?up=3", rel: "stylesheet", type: "text/css" })),
    'script': React.createElement(React.Fragment, null,
        React.createElement("script", { src: "https://cdn.pagic.org/react@16.13.1/umd/react.production.min.js" }),
        React.createElement("script", { src: "https://cdn.pagic.org/react-dom@16.13.1/umd/react-dom.production.min.js" }),
        React.createElement("script", { src: "/classes/index.js", type: "module" })),
    'contentTitle': undefined,
    'contentBody': React.createElement("article", { dangerouslySetInnerHTML: {
            __html: '<div class="table_wrapper"><table>\n<thead>\n<tr>\n<th>Class</th>\n<th>Information</th>\n<th>Notes</th>\n<th>Has Constructor?</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>Audio</td>\n<td>Audio effects</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Blip</td>\n<td>Markers and radar icons</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Boat</td>\n<td>Boat control</td>\n<td>specific kind of a vehicle</td>\n<td>Y (Car.Create)</td>\n</tr>\n<tr>\n<td>Camera</td>\n<td>Camera/View manipulation</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Car</td>\n<td>Script vehicles</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>CarGenerator</td>\n<td>Parking lots</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Char</td>\n<td>Script characters (actors)</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Clock</td>\n<td>Time manipulation</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Credits</td>\n<td>Credits after the final mission</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Cutscene</td>\n<td>Setting up and playing cutscenes</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>CutsceneObject</td>\n<td>Cutscene object</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Fx</td>\n<td>Various 2D effects (shadown, lights, coronas, particles)</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Game</td>\n<td>Gameplay</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Gang</td>\n<td>Gangs configuration</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Garage</td>\n<td>Garages</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Heli</td>\n<td>Helicopteps</td>\n<td>specific kind of a vehicle</td>\n<td>Y (Car.Create)</td>\n</tr>\n<tr>\n<td>Math</td>\n<td>Math and conversion utilities</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Menu</td>\n<td>Interaction with the main menu</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Object</td>\n<td>Script objects</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Pad</td>\n<td>Input controls</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Path</td>\n<td>Configuring car and ped paths and lookup for nodes</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Phone</td>\n<td>Setting up phone booth calls and messages</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Pickup</td>\n<td>Interactive script objects</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Plane</td>\n<td>Planes</td>\n<td>specific kind of a vehicle</td>\n<td>Y (Car.Create)</td>\n</tr>\n<tr>\n<td>Player</td>\n<td>The main character controlled by a player</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Rampage</td>\n<td>Rampages logic</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Rc</td>\n<td>Remote controlled cars logic</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Restart</td>\n<td>Configuration of respawn points</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Screen</td>\n<td>Manipulating game UI</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>ScriptFire</td>\n<td>Script fires</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>ScriptPath</td>\n<td>Script paths</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Sphere</td>\n<td>Cylinder markers</td>\n<td></td>\n<td>Y</td>\n</tr>\n<tr>\n<td>Stat</td>\n<td>Game statistics</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Streaming</td>\n<td>Loading game assets</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>StuckCarCheck</td>\n<td>Checking if script cars are stuck</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Text</td>\n<td>Displaying subtitles and text boxes</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Txd</td>\n<td>Working with texture dictionaries</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Weather</td>\n<td>Controlling weather</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>World</td>\n<td>Manipulating traffic, population and other physical enitites</td>\n<td></td>\n<td>N</td>\n</tr>\n<tr>\n<td>Zone</td>\n<td>Configuring different areas of game map</td>\n<td></td>\n<td>N</td>\n</tr>\n</tbody>\n</table></div>'
        } }),
    'toc': null,
    'author': "Seemann",
    'contributors': [
        "Seemann"
    ],
    'date': "2021-01-09T19:57:10.000Z",
    'updated': "2021-01-30T04:56:46.000Z",
    'excerpt': "Class Information Notes Has Constructor? Audio Audio effects N Blip Markers and radar icons Y Boat Boat control specific kind of a vehicle Y (Car.Create) Camera Camera/View manipulation N Car Script vehicles Y ...",
    'cover': undefined,
    'sidebar': [
        {
            "text": "GTA III",
            "children": [
                {
                    "text": "Commands",
                    "link": "gta3/index.html",
                    "pagePath": "gta3/index.md"
                },
                {
                    "text": "Classes list",
                    "link": "gta3/classes.html",
                    "pagePath": "gta3/classes.md"
                },
                {
                    "text": "Download classes.db",
                    "link": "gta3/classes.db"
                }
            ]
        },
        {
            "text": "GTA Vice City",
            "children": [
                {
                    "text": "Commands",
                    "link": "vc/index.html",
                    "pagePath": "vc/index.md"
                },
                {
                    "text": "Classes list",
                    "link": "vc/classes.html",
                    "pagePath": "vc/classes.md"
                },
                {
                    "text": "Download classes.db",
                    "link": "vc/classes.db"
                }
            ]
        }
    ]
};
