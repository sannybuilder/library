* See the list of Button IDs at the SB Offline Documentation
* If the specified buttonid has only one action:
    * behaviorvalue **= 0** will release its corresponding action
    * behaviorvalue **= 255** will trigger its corresponding action
* If the specified buttonid has two actions:
    * behaviorvalue **= 0** will release its corresponding action
    * behaviorvalue **= -128** will trigger its first action
    * behaviorvalue **= 128** will trigger its second action