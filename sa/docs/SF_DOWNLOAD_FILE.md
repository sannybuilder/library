* filePath parameter doesn't resolve cleo's prefix in file path, and must be in microsoft file path format:
    * Absolute Path
        * `C:\Program Files\somefolder\conf.ini`
        * `C:\Users\Public\Pictures\somefolder\pic.jpg`
    * Relative Path prefix **.\**

|             cleoFileFormat           |                   msFileFormat                  |
|             -------------            |                  -------------                  |
| `"root:\somefolder\thisfile.txt"`    | `".\somefolder\thisfile.txt"`                   |
| `"cleo:\somefolder\thisfile.txt"`    | `".\cleo\somefolder\thisfile.txt"`              |
| `"modules:\somefolder\thisfile.txt"` | `".\cleo\cleo_modules\somefolder\thisfile.txt"` |

* Execute SF_GET_DOWNLOAD_STATE to know the download status
* When the AsyncDownload object is on Do-Nothing mode (status >= 0), you must manually execute SF_RELEASE_DOWNLOAD to free the AsyncDownload object from memory and avoid memory leak