The download status can be:
* -1 = download in progress
* 0 = download complete
* Other values are​ ErrorCodes indicating the download failed due to a certain reason:
    * 0x8007000E = E_OUTOFMEMORY: File cannot be created due to insufficient memory storage
    * 0x800C0008 = INET_E_DOWNLOAD_FAILURE: Connection has been interrupted (No Internet, Insufficient Create/Write File permission at filePath)
    * etc.