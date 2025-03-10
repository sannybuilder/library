* Different versions of SAMP have different Pointers and Structures.
* This command returns **stLocalPlayer** structure pointer if the specified player is our **Local Player**. See **stLocalPlayer** structure for:
    * [SAMP 0.3.7 R1](https://github.com/BlastHackNet/mod_sa/blob/master/src/samp.h#L548)
    * [SAMP 0.3.7 R5](https://github.com/BlastHackNet/mod_sa/blob/samp-037r5/src/samp.h#L575)
    * [SAMP 0.3DL](https://github.com/BlastHackNet/mod_sa/blob/samp-03dl/src/samp.h#L574)
* This command returns **stRemotePlayerData** structure pointer if the specified player ID is a **Remote Player** (the other players). See **stRemotePlayerData** structure for:
    * [SAMP 0.3.7 R1](https://github.com/BlastHackNet/mod_sa/blob/master/src/samp.h#L609)
    * [SAMP 0.3.7 R5](https://github.com/BlastHackNet/mod_sa/blob/samp-037r5/src/samp.h#L629)
    * [SAMP 0.3DL](https://github.com/BlastHackNet/mod_sa/blob/samp-03dl/src/samp.h#L628)