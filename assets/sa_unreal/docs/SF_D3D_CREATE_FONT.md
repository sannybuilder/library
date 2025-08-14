* For more info about fontname and styleFlags, read the Font API's by Microsoft.
* RenderFont objects created by this command allocate memory and need to be manually destroyed by SF_D3D_DELETE_FONT if not used anymore to free them from memory.

SampTextStyle enum consists of common styleFlags you could use. Multiple styles are allowed as long as you Add/OR them together. For example:
```go
// font text will be written in italic with bold thickness and a border between it 
SampTextStyle myTextStyleFlags = SampTextStyle.FCRBold
SampTextStyle myTextStyleFlags |= SampTextStyle.FCRItalic
SampTextStyle myTextStyleFlags |= SampTextStyle.FCRBorder
```
