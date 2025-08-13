import { createAction, props } from '@ngrx/store';
import {
  Attribute,
  Command,
  EnumRaw,
  Game,
  GenerateJsonModel,
  Modifier,
  SyntaxKind,
  ViewMode,
} from '../../models';

export const selectExtensions = createAction(
  '[ui] change extensions selection',
  props<{
    game: Game;
    extensions: string[];
    state: boolean;
    extensionNames: string[];
  }>()
);

export const toggleAttribute = createAction(
  '[ui] toggle attribute selection',
  props<{ attribute: Attribute; modifier: Modifier }>()
);

export const selectClass = createAction(
  '[ui] change class selection',
  props<{ game: Game; className: string | 'any' | 'none'; state: boolean }>()
);

export const updateSearchTerm = createAction(
  '[ui] update search term',
  props<{ searchTerm: string; autoOpenSingleResult?: boolean }>()
);

export const toggleCommandListElements = createAction(
  '[ui] toggle command list elements',
  props<{ flag: boolean }>()
);

export const toggleInlineMethodDescription = createAction(
  '[ui] toggle inline method description'
);

export const toggleOpcodePresentation = createAction(
  '[ui] toggle opcode presentation'
);

export const displayOrEditCommandInfo = createAction(
  '[ui] display or edit command',
  props<{ command: Command; extension: string; viewMode: ViewMode }>()
);

export const displayOrEditSnippet = createAction(
  '[ui] display or edit snippet',
  props<{ snippet: string }>()
);

export const displayOrEditEnum = createAction(
  '[ui] display or edit enum',
  props<{ enumToEdit: EnumRaw; viewMode: ViewMode }>()
);

export const displayExtensionList = createAction('[ui] display extension list');
export const displayClassesList = createAction('[ui] display classes list');
export const displayEnumsList = createAction('[ui] display enums list');
export const displayDecisionTree = createAction('[ui] display decision tree');
export const displayFilters = createAction('[ui] display filters');
export const displayDownloads = createAction('[ui] display downloads');

export const stopEditOrDisplay = createAction('[ui] stop edit or display');

export const changePage = createAction(
  '[ui] change page',
  props<{ index: number | 'all' }>()
);

export const scrollTop = createAction('[ui] scroll top');

export const resetFilters = createAction('[ui] reset filters');

export const displayClassOverview = createAction(
  '[ui] display class overview',
  props<{ className: string }>()
);

export const toggleSearchHelp = createAction(
  '[ui] toggle search help',
  props<{ shouldDisplay?: boolean; force?: boolean }>()
);

export const dismissSearchHelp = createAction('[ui] dismiss search help');

export const toggleSidebar = createAction('[ui] toggle sidebar');

export const displayJsonGenerator = createAction('[ui] display json generator');

export const generateNewJson = createAction(
  '[ui] generate new json',
  props<{ model: GenerateJsonModel }>()
);

export const switchSyntaxKind = createAction(
  '[ui] switch syntax kind',
  props<{ syntaxKind: SyntaxKind }>()
);

export const toggleSnippetOnlySearch = createAction('[ui] toggle snippet only search');

export const toggleFunctionDeclaration = createAction('[ui] toggle function declaration');

export const dismissHotkeysInfo = createAction('[ui] dismiss hotkeys info');

export const verifyCommand = createAction('[ui] verify command');