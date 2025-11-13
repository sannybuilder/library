This command checks if the input is a valid object handle. If the handle is not associated with any existing object, the result is false.

Although, this command generally works fine with invalid handles, very large values (e.g. 250000000) may crash the game. To safely check if the handle is valid, use GET_OBJECT_POINTER with CLEO 5:

```
int ptr = get_object_pointer [handle]
if is_truthy ptr
then
// handle valid
end
```
