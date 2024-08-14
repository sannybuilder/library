import { APP_INITIALIZER, inject, NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { FormsModule } from '@angular/forms';
import { ActionReducer, MetaReducer, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  UrlMatchResult,
  UrlSegment,
} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  TranslateModule,
  TranslateLoader,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { localStorageSync } from 'ngrx-store-localstorage';

import { environment } from '../environments/environment';

import {
  ClassParamsPipe,
  OpcodePipe,
  GameTitlePipe,
  GameTitleSimplePipe,
  CodifyPipe,
  InputParamsPipe,
  OutputParamsPipe,
  SingleParamPipe,
  SanitizePipe,
  LinkifyPipe,
  LinkifyClassesPipe,
  PropExtractPipe,
  OpcodeParamsPipe,
  FilterMethodsPipe,
  StripPunctuationPipe,
  MarkdownPipe,
  ExpressifyPipe,
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

// game state
import { gameReducer } from './state/game/reducer';

// version state
import { versionReducer } from './state/version/reducer';
import { VersionEffects } from './state/version/effects';

// enums state
import { EnumsEffects } from './state/enums/effects';
import { enumsReducer } from './state/enums/reducer';

// articles state
import { ArticlesEffects } from './state/articles/effects';
import { articlesReducer } from './state/articles/reducer';

// tree state
import { treeReducer } from './state/tree/reducer';
import { TreeEffects } from './state/tree/effects';

import { ConfigModule } from './config';
import { AuthGuard, RouteGuard } from './route.guard';
import { AppComponent } from './app.component';

import {
  IconComponent,
  ModalComponent,
  PaginationComponent,
  SelectorComponent,
  IconButtonComponent,
  CopyButtonComponent,
} from './components/common';

import {
  CommandEditorComponent,
  CommandInfoComponent,
  CommandListComponent,
  CommandGamesComponent,
  ExtensionListComponent,
  CommandDeclarationComponent,
} from './components/commands';

import {
  FooterComponent,
  HeaderComponent,
  DownloadPanelComponent,
  FilterPanelComponent,
  JsonGeneratorComponent,
  QuizComponent,
} from './components/layout';

import {
  EnumOverviewComponent,
  EnumEditorComponent,
  EnumGamesComponent,
  EnumListComponent,
} from './components/enums';

import {
  ClassOverviewComponent,
  ClassListComponent,
} from './components/classes';

import { HomePageComponent } from './components/home-page/home-page.component';
import { LibraryPageComponent } from './components/library-page/library-page.component';
import { KNOWN_LANGUAGES } from './models';
import { DecisionTreeComponent } from './components/decision-tree/decision-tree.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { catchError, timeout } from 'rxjs/operators';
import { of } from 'rxjs';

class CustomTranslateLoader extends TranslateHttpLoader {
  getTranslation(lang: string) {
    return super.getTranslation(lang).pipe(
      timeout(3000),
      catchError(() => of({}))
    );
  }
}

export function HttpLoaderFactory(http: HttpClient) {
  return new CustomTranslateLoader(http);
}

export function loadTranslations(
  translate: TranslateService,
  cookies: CookieService
) {
  return () => {
    const lang = cookies.get('sblang');
    const knownLang = KNOWN_LANGUAGES.includes(lang) ? lang : 'en';
    return translate.use(knownLang).toPromise();
  };
}

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        ui: [
          'isSearchHelpDismissed',
          'displayOpcodePresentation',
          'displayInlineMethodDescription',
          'isSidebarCollapsed',
        ],
      },
    ],
    rehydrate: true,
  })(reducer);
}
const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];

@NgModule({
  declarations: [
    AppComponent,
    CommandListComponent,
    ClassParamsPipe,
    OpcodePipe,
    GameTitlePipe,
    GameTitleSimplePipe,
    CodifyPipe,
    InputParamsPipe,
    OutputParamsPipe,
    SingleParamPipe,
    SanitizePipe,
    LinkifyPipe,
    LinkifyClassesPipe,
    PropExtractPipe,
    OpcodeParamsPipe,
    FilterMethodsPipe,
    StripPunctuationPipe,
    MarkdownPipe,
    ExpressifyPipe,
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
    CommandGamesComponent,
    PaginationComponent,
    ClassOverviewComponent,
    EnumOverviewComponent,
    EnumEditorComponent,
    EnumGamesComponent,
    EnumListComponent,
    ClassListComponent,
    IconButtonComponent,
    CopyButtonComponent,
    DecisionTreeComponent,
    JsonGeneratorComponent,
    ExtensionListComponent,
    QuizComponent,
    CommandDeclarationComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ConfigModule,
    FormsModule,
    TranslateModule.forRoot({
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    RouterModule.forRoot(
      [
        {
          path: '',
          canActivate: [
            (route: ActivatedRouteSnapshot) =>
              inject(AuthGuard).canActivate(route),
          ],
          children: [
            {
              path: '',
              pathMatch: 'full',
              component: HomePageComponent,
            },
            {
              path: '**',
              canActivate: [
                (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) =>
                  inject(RouteGuard).canActivate(route, state),
              ],
              component: LibraryPageComponent,
              runGuardsAndResolvers: 'always',
            },
          ],
        },
      ],
      { useHash: false, onSameUrlNavigation: 'reload' }
    ),
    StoreModule.forRoot(
      {
        auth: authReducer,
        changes: changesReducer,
        enums: enumsReducer,
        extensions: extensionsReducer,
        game: gameReducer,
        snippets: snippetsReducer,
        ui: uiReducer,
        tree: treeReducer,
        version: versionReducer,
        articles: articlesReducer,
      },
      { metaReducers }
    ),
    EffectsModule.forRoot([
      AuthEffects,
      ChangesEffects,
      EnumsEffects,
      ExtensionsEffects,
      SnippetsEffects,
      UiEffects,
      TreeEffects,
      VersionEffects,
      ArticlesEffects,
    ]),
    DragDropModule,
    ClipboardModule,
    environment.production
      ? []
      : StoreDevtoolsModule.instrument({
          maxAge: 50,
          logOnly: false,
          autoPause: true,
        }),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
  ],
  exports: [],
  providers: [
    CookieService,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: APP_INITIALIZER,
      useFactory: loadTranslations,
      deps: [TranslateService, CookieService],
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
