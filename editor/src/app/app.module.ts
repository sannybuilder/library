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
    StoreModule.forRoot({ root: reducer }),
    EffectsModule.forRoot([StateEffects]),
  ],
  providers: [FusejsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
