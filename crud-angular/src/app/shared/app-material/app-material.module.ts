import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
 exports: [
  MatCardModule,
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatProgressSpinnerModule,
  MatDialogModule
 ],
})
export class AppMaterialModule { }
