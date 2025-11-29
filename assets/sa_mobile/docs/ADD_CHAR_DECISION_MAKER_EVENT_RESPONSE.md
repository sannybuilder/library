This command defines how a ped should react to a specific event by adding a **weighted** response option to its decision maker.

Each call adds one possible task for that event. Up to `6` responses can be added per event.

The four float parameters (respect, hate, like, dislike) are weights, not percentages. All weights for the event are summed and normalized internally to determine the final probability of each response. A higher weight results in a higher chance of that task being chosen. Weights may exceed 100.0, only their relative values matter.

If only one response is defined for an event, it will always be chosen (100%). The selected task replaces the ped's currently active task.

The two boolean parameters (inCar, onFoot) specify when this response is valid based on the ped's state (whether the ped is on foot or in a vehicle).
