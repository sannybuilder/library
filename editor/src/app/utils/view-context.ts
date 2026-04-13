import { ViewContext } from '../models';

export function isCodeViewContext(viewContext: ViewContext): boolean {
  return viewContext === ViewContext.Code;
}

export function isScriptViewContext(viewContext: ViewContext): boolean {
  return viewContext === ViewContext.Script;
}

export function isScmViewContext(viewContext: ViewContext): boolean {
  return viewContext === ViewContext.Scm;
}

export function getContextRouteSegment(viewContext: ViewContext): string {
  switch (viewContext) {
    case ViewContext.Code:
      return 'native';
    case ViewContext.Scm:
      return 'scm';
    case ViewContext.Script:
    default:
      return 'script';
  }
}

export function getExtensionScopeSegment(viewContext: ViewContext): string {
  return isCodeViewContext(viewContext) ? 'versions' : 'extensions';
}
