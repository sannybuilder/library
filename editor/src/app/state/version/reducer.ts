import { createReducer, on } from '@ngrx/store';
import { partition, without } from 'lodash';
import { isValidGame } from '../../utils';
import {
  Game,
  GamePlatforms,
  GameVersions,
  Platform,
  Version,
} from '../../models';
import {
  preselectFiltersByGame,
  selectPlatforms,
  selectVersions,
} from './actions';

export interface GameState {
  selectedPlatforms: Platform[];
  selectedVersions: Version[];
}

export interface VersionState {
  games: Record<Game, GameState>;
}

const defaultFilterState: {
  games: Record<Game, GameState>;
} = {
  games: Object.values(Game).reduce((m, v) => {
    m[v] = {
      selectedPlatforms: [],
      selectedVersions: [],
    };
    return m;
  }, {} as Record<Game, GameState>),
};

export const initialState: VersionState = {
  ...defaultFilterState,
};

export const versionReducer = createReducer(
  initialState,
  on(selectPlatforms, (state, { game, platforms, state: forceSelect }) => {
    const selectedPlatforms = state.games[game]?.selectedPlatforms ?? [];

    const selectIf = (condition: boolean, platforms: Platform[]) => {
      return updateState(state, game, {
        selectedPlatforms: condition ? platforms : [Platform.Any],
      });
    };

    if (platforms.includes(Platform.Any)) {
      return selectIf(!forceSelect, GamePlatforms[game]);
    }
    const [selected, unselected] = partition(platforms, (platform) =>
      selectedPlatforms.includes(platform)
    );

    if (forceSelect && unselected.length > 0) {
      const newSelection = [...selectedPlatforms, ...unselected].filter(
        (p) => p !== Platform.Any
      );

      return selectIf(
        newSelection.length !== GamePlatforms[game].length,
        newSelection
      );
    }
    if (!forceSelect && selected.length > 0) {
      const newSelection = without(selectedPlatforms, ...selected);
      return selectIf(newSelection.length !== 0, newSelection);
    }

    return state;
  }),
  on(selectVersions, (state, { game, versions, state: forceSelect }) => {
    const selectedVersions = state.games[game]?.selectedVersions ?? [];

    const selectIf = (condition: boolean, versions: Version[]) => {
      return updateState(state, game, {
        selectedVersions: condition ? versions : [Version.Any],
      });
    };

    if (versions.includes(Version.Any)) {
      return selectIf(!forceSelect, GameVersions[game]);
    }
    const [selected, unselected] = partition(versions, (version) =>
      selectedVersions.includes(version)
    );

    if (forceSelect && unselected.length > 0) {
      const newSelection = [...selectedVersions, ...unselected].filter(
        (p) => p !== Version.Any
      );

      return selectIf(
        newSelection.length !== GameVersions[game].length,
        newSelection
      );
    }
    if (!forceSelect && selected.length > 0) {
      const newSelection = without(selectedVersions, ...selected);
      return selectIf(newSelection.length !== 0, newSelection);
    }

    return state;
  }),
  on(preselectFiltersByGame, (state, { game }) => {
    if (!isValidGame(game)) {
      return state;
    }

    const isRemaster = [
      Game.gta3_unreal,
      Game.vc_unreal,
      Game.sa_unreal,
    ].includes(game);

    const isMobile = [
      Game.gta3_mobile,
      Game.vc_mobile,
      Game.sa_mobile,
    ].includes(game);

    let selectedPlatforms: Platform[] = [];
    let selectedVersions: Version[] = [];

    if (isRemaster) {
      selectedPlatforms = [Platform.PC];
      selectedVersions = [Version._unreal10];
    } else if (isMobile) {
      selectedPlatforms = [Platform.Mobile];
      selectedVersions = GameVersions[game].filter(
        (v) => v !== Version._unreal10
      );
    } else {
      // classic
      selectedPlatforms = [Platform.PC];
      selectedVersions = [Version._10];
    }

    return updateState(state, game, {
      selectedPlatforms,
      selectedVersions,
    });
  })
);

function updateState(
  state: VersionState,
  game: Game,
  newState: Partial<GameState>
) {
  return {
    ...state,
    games: {
      ...state.games,
      [game]: { ...(state.games[game] ?? {}), ...newState },
    },
  };
}
