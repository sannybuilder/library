import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

import {
  ClassParamsPipe,
  KeywordParamsPipe,
  OpcodePipe,
  AttrFilterPipe,
  GameTitlePipe,
  ParametrifyPipe,
} from './pipes';

// extensions state
import { extensionsReducer } from './state/extensions/reducer';
import { ExtensionsEffects } from './state/extensions/effects';
import { ExtensionsFacade } from './state/extensions/facade';
import { ExtensionsService } from './state/extensions/service';

// snippets state
import { snippetsReducer } from './state/snippets/reducer';
import { SnippetsEffects } from './state/snippets/effects';
import { SnippetsService } from './state/snippets/service';
import { SnippetsFacade } from './state/snippets/facade';

// auth state
import { AuthService } from './state/auth/auth.service';
import { authReducer } from './state/auth/auth.reducer';
import { AuthFacade } from './state/auth/auth.facade';
import { AuthEffects } from './state/auth/auth.effects';

import { FusejsService } from './fusejs/fusejs.service';
import { FusejsPipe } from './fusejs/fusejs.pipe';
import { ConfigModule } from './config';

import { AppComponent } from './app.component';
import { CommandListComponent } from './components/command-list/command-list.component';
import { CommandEditorComponent } from './components/command-editor/command-editor.component';
import { HeaderComponent } from './components/header/header.component';
import { CommandInfoComponent } from './components/command-info/command-info.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard, RouteGuard } from './route.guard';
import { FooterComponent } from './components/footer/footer.component';
import { SelectorComponent } from './components/selector/selector.component';
import { DownloadPanelComponent } from './components/download-panel/download-panel.component';
import { FilterPanelComponent } from './components/filter-panel/filter-panel.component';
import { LibraryPageComponent } from './components/library-page/library-page.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandListComponent,
    ClassParamsPipe,
    KeywordParamsPipe,
    OpcodePipe,
    FusejsPipe,
    AttrFilterPipe,
    GameTitlePipe,
    ParametrifyPipe,
    CommandEditorComponent,
    HeaderComponent,
    CommandInfoComponent,
    HomeComponent,
    FooterComponent,
    SelectorComponent,
    DownloadPanelComponent,
    FilterPanelComponent,
    LibraryPageComponent,
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
              component: HomeComponent,
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
    }),
    EffectsModule.forRoot([ExtensionsEffects, AuthEffects, SnippetsEffects]),
  ],
  exports: [],
  providers: [
    ExtensionsFacade,
    ExtensionsService,
    AuthFacade,
    AuthService,
    SnippetsFacade,
    SnippetsService,
    CookieService,
    FusejsService,
    RouteGuard,
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
