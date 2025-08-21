This command is used in conditional statements. Up to `8` conditional commands are supported under one IF. Sanny Builder uses a more efficient syntax of dealing with IF statements but it can still use the old syntax of dealing with them. The Mission Builder and many older decompilers uses the old syntax, which is minimally modified from decompiled code.

- `IF 0`
  A value of `0` is equivalent to Sanny Builder syntax `if`. It means there is only one condition. The condition must be true for the statement to be true. This line can be omitted to save space.

- `IF 1..7`
  A value between `1` and `7` is equivalent to Sanny Builder syntax `if and`. A value of `1` means there are two conditions and a value of `7` means there are eight conditions. All conditions must be true for the statement to be true.
- `IF 21..27`
  A value between `21` and `27` is equivalent to Sanny Builder syntax `if or`. A value of `21` means there are two conditions and a value of `27` means there are eight conditions. At least one condition must be true for the statement to be true.
