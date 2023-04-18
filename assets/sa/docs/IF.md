This command is used in conditional statements . Up to `8` conditional commands are supported under one IF. Sanny Builder uses a more efficient syntax of dealing with IF statements but it can still use the old syntax of dealing with them. The Mission Builder and many older decompilers uses the old syntax, which is minimally modified from decompiled code.

- `00D6: if 0`
  A value of `0` is equivalent to Sanny Builder syntax <b>`if`</b>. It means there is only one condition. The condition must be true for the statement to be true. This line can be omitted to save space.

- `00D6: if 1` ... `00D6: if 7`
  A value between `1` and `7` is equivalent to Sanny Builder syntax <b>`if and`</b>. A value of `1` means there are two conditions and a value of `7` means there are eight conditions. All conditions must be true for the statement to be true.
- `00D6: if 21` ... `00D6: if 27`
  A value between `21` and `27` is equivalent to Sanny Builder syntax <b>`if or`</b>. A value of `21` means there are two conditions and a value of `27` means there are eight conditions. At least one condition must be true for the statement to be true.
