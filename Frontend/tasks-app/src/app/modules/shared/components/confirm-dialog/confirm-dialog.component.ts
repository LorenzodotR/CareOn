import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MaterialModule } from '../../../material/material.module';

export interface ConfirmDialogData {
  title: string;
  message: string;
  confirmButtonText: string;
  cancelButtonText: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent implements OnInit, OnDestroy {
  isMobile = false;
  private destroy$ = new Subject<void>();
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData,
    private breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit(): void {
    if (!this.data.title) {
      this.data.title = 'Confirmação';
    }
    
    if (!this.data.confirmButtonText) {
      this.data.confirmButtonText = 'Confirmar';
    }
    
    if (!this.data.cancelButtonText) {
      this.data.cancelButtonText = 'Cancelar';
    }
    
    this.breakpointObserver
      .observe([Breakpoints.XSmall])
      .pipe(takeUntil(this.destroy$))
      .subscribe(result => {
        this.isMobile = result.matches;
        this.adjustDialogSize();
      });
  }
  
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  
  private adjustDialogSize(): void {
    if (this.isMobile) {
      this.dialogRef.updateSize('95%', '');
      this.dialogRef.addPanelClass('mobile-confirm-dialog');
    } else {
      this.dialogRef.updateSize('350px', '');
      this.dialogRef.removePanelClass('mobile-confirm-dialog');
    }
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }
}