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
import { rootReducer } from './state/reducer';
import { RootEffects } from './state/effects';
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
import { AuthService } from './auth/auth.service';
import { authReducer } from './auth/auth.reducer';
import { StateFacade } from './state/facade';
import { CommandsService } from './state/service';
import { AuthFacade } from './auth/auth.facade';
import { AuthEffects } from './auth/auth.effects';

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
    StoreModule.forRoot({ root: rootReducer, auth: authReducer }),
    EffectsModule.forRoot([RootEffects, AuthEffects]),
  ],
  exports: [],
  providers: [
    AuthFacade,
    StateFacade,
    AuthService,
    CommandsService,
    CookieService,
    FusejsService,
    RouteGuard,
    AuthGuard,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
