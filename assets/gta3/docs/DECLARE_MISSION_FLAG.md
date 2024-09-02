This command ties a global variable to the hardcoded flag that defines whether there is an active mission. A common name for that variable in Sanny Builder is `$ONMISSION`.

Common uses for the ONMISSION variable are:

- Checking if there's no active mission:

  ```
    $ONMISSION == 0
  ```

  Commonly this check is placed at the beginning of a script to prevent it from running when a mission is active.

- Notify the game that there's a running mission. When you start a mission, you have to set the ONMISSION variable to 1.
  ```
    $ONMISSION = 1
  ```
  This allows the mission to be cancelled in case of player being dead or busted. When the mission is over, you have to set the ONMISSION variable to 0.
  ```
    $ONMISSION = 0
  ```

There are some hardcoded features that depend on this variable. It can affect the behavior of property pickups and the visibility of contact point blips.
