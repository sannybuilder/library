* The Decompressed string has a maximum length of 4096 characters, which means the maximum reasonable buffer size is 4097 (including the null terminator). 
* The start of the **CString** must be found bitstream's **read offset**.
* The **read offset** increases by the length of the **CString**.
* Can be used as a condition which evaluates as true if the **CString** has been decompressed and the buffer has enough space to fit the entire decompressed string (including its null terminator).
