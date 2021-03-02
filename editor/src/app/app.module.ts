import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { ParamsPipe, OpcodePipe, AttrFilterPipe } from './pipes';
import { reducer } from './state/reducer';
import { StateEffects } from './state/effects';
import { FusejsService } from './fusejs/fusejs.service';
import { FusejsPipe } from './fusejs/fusejs.pipe';
import { ConfigModule } from './config';

import { AppComponent } from './app.component';
import { CommandListComponent } from './components/command-list/command-list.component';
import { CommandEditorComponent } from './components/command-editor/command-editor.component';
import { HeaderComponent } from './components/header/header.component';
import { CommandInfoComponent } from './components/command-info/command-info.component';
import { HomeComponent } from './components/home/home.component';
import { RouteGuard, RouteResolver } from './route.guard';
import { FooterComponent } from './components/footer/footer.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SelectorComponent } from './components/selector/selector.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandListComponent,
    ParamsPipe,
    OpcodePipe,
    FusejsPipe,
    AttrFilterPipe,
    CommandEditorComponent,
    HeaderComponent,
    CommandInfoComponent,
    HomeComponent,
    FooterComponent,
    SelectorComponent,
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
          pathMatch: 'full',
          component: HomeComponent,
        },
        {
          path: '**',
          canActivate: [RouteGuard],
          resolve: {
            data: RouteResolver,
          },
          component: CommandListComponent,
        },
      ],
      { useHash: false }
    ),
    StoreModule.forRoot({ root: reducer }),
    EffectsModule.forRoot([StateEffects]),
  ],
  exports: [],
  providers: [
    FusejsService,
    RouteGuard,
    RouteResolver,
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
