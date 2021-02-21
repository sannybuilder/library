import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { RouterModule } from '@angular/router';

import { ParamsPipe } from './pipes/params.pipe';
import { OpcodePipe } from './pipes/opcode.pipe';
import { reducer } from './state/reducer';
import { StateEffects } from './state/effects';
import { FusejsService } from './fusejs/fusejs.service';
import { FusejsPipe } from './fusejs/fusejs.pipe';
import { ConfigModule } from './config';

import { AppComponent } from './app.component';
import { CommandListComponent } from './components/command-list/command-list.component';
import { CommandEditorComponent } from './components/command-editor/command-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    CommandListComponent,
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
          component: CommandListComponent,
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
