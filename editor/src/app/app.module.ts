import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import {
  ClassParamsPipe,
  KeywordParamsPipe,
  OpcodePipe,
  GameTitlePipe,
  ParametrifyPipe,
  InputParamsPipe,
  OutputParamsPipe,
  SingleParamPipe,
  AttrTitlePipe,
} from './pipes';

// extensions state
import { extensionsReducer } from './state/extensions/reducer';
import { ExtensionsEffects } from './state/extensions/effects';

// snippets state
import { snippetsReducer } from './state/snippets/reducer';
import { SnippetsEffects } from './state/snippets/effects';

// auth state
import { authReducer } from './state/auth/reducer';
import { AuthEffects } from './state/auth/effects';

// changes state
import { changesReducer } from './state/changes/reducer';
import { ChangesEffects } from './state/changes/effects';

// ui state
import { uiReducer } from './state/ui/reducer';
import { UiEffects } from './state/ui/effects';

import { HlPropPipe } from './fusejs';
import { ConfigModule } from './config';

import { AppComponent } from './app.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LibraryPageComponent } from './components/library-page/library-page.component';

import { CommandListComponent } from './components/command-list/command-list.component';
import { CommandEditorComponent } from './components/command-editor/command-editor.component';
import { HeaderComponent } from './components/header/header.component';
import { CommandInfoComponent } from './components/command-info/command-info.component';
import { AuthGuard, RouteGuard } from './route.guard';
import { FooterComponent } from './components/footer/footer.component';
import { SelectorComponent } from './components/selector/selector.component';
import { DownloadPanelComponent } from './components/download-panel/download-panel.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { ModalComponent } from './components/modal/modal.component';
import { IconComponent } from './components/icon/icon.component';
import { SupportedGamesComponent } from './components/supported-games/supported-games.component';
import { PaginationComponent } from './components/pagination/pagination.component';
import { GameEffects } from './state/game/effects';
import { gameReducer } from './state/game/reducer';

@NgModule({
  declarations: [
    AppComponent,
    CommandListComponent,
    ClassParamsPipe,
    KeywordParamsPipe,
    OpcodePipe,
    GameTitlePipe,
    ParametrifyPipe,
    InputParamsPipe,
    OutputParamsPipe,
    SingleParamPipe,
    HlPropPipe,
    CommandEditorComponent,
    HeaderComponent,
    CommandInfoComponent,
    HomePageComponent,
    FooterComponent,
    SelectorComponent,
    DownloadPanelComponent,
    FilterPanelComponent,
    LibraryPageComponent,
    ModalComponent,
    IconComponent,
    SupportedGamesComponent,
    AttrTitlePipe,
    PaginationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ConfigModule,
    RouterModule.forRoot(
      [
        {
          path: '',
          canActivate: [AuthGuard],
          children: [
            {
              path: '',
              pathMatch: 'full',
              component: HomePageComponent,
            },
            {
              path: '**',
              canActivate: [RouteGuard],
              component: LibraryPageComponent,
            },
          ],
        },
      ],
      { useHash: false }
    ),
    StoreModule.forRoot({
      extensions: extensionsReducer,
      auth: authReducer,
      snippets: snippetsReducer,
      ui: uiReducer,
      changes: changesReducer,
      game: gameReducer,
    }),
    EffectsModule.forRoot([
      ExtensionsEffects,
      AuthEffects,
      SnippetsEffects,
      UiEffects,
      ChangesEffects,
      GameEffects,
    ]),
    DragDropModule,
    // StoreDevtoolsModule.instrument({
    //   maxAge: 25,
    //   logOnly: false,
    // }),
  ],
  exports: [],
  providers: [
    CookieService,

    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
