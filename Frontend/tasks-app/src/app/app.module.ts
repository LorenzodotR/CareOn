import { NgModule } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';



@NgModule({
  declarations: [
  ],
  imports: [
    BrowserAnimationsModule,
    GridModule,
    MaterialModule,
    AppRoutingModule
  ]
})
export class AppModule { }
