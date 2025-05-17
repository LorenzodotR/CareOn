import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatDialogActions, MatDialogContent } from '@angular/material/dialog';
import { MatError, MatFormField } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

@NgModule({
    imports: [
        MatDialogActions,
        MatDialogContent,
        MatFormField,
        MatError
    ],
    exports: [
        MatError,
        MatInputModule,
        MatFormField,
        MatDialogContent,
        MatDialogActions,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatCheckboxModule,
        MatTableModule,
    ]
})
export class MaterialModule { }
