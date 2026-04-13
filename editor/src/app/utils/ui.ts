import { ViewMode } from "../models";

  export function shouldDisplayRightRail(viewMode: ViewMode) {
    return ![
      ViewMode.None,
      ViewMode.ViewGenerateJson,
      ViewMode.ViewFilters,
      ViewMode.ViewDownloads,
    ].includes(viewMode);
  }