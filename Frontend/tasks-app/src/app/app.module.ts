import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './modules/material/material.module';
import { AppRoutingModule } from './app.routes';



@NgModule({
  declarations: [
  ],
  imports: [
    MaterialModule,
    AppRoutingModule,
    CommonModule
  ]
})
export class AppModule { }
