import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ParamsPipe } from './pipes/params.pipe';
import { OpcodePipe } from './pipes/opcode.pipe';
import { reducer } from './state/reducer';
import { StateEffects } from './state/effects';
import { CommandEditorComponent } from './command-editor/command-editor.component';
import { FusejsService } from './fusejs/fusejs.service';
import { FusejsPipe } from './fusejs/fusejs.pipe';
import { ConfigModule } from './config';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ParamsPipe,
    OpcodePipe,
    CommandEditorComponent,
    FusejsPipe,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ConfigModule,
    RouterModule.forRoot(
      [
        {
          path: 'gta3',
          component: DashboardComponent,
          pathMatch: 'full',
        },
        {
          path: '',
          redirectTo: '/gta3',
          pathMatch: 'full',
        },
        {
          path: '**',
          redirectTo: '/gta3',
        },
      ],
      { useHash: false }
    ),
    StoreModule.forRoot({ root: reducer }),
    EffectsModule.forRoot([StateEffects]),
  ],
  exports: [],
  providers: [FusejsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
