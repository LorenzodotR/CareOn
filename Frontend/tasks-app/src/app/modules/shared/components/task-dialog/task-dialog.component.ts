import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MaterialModule } from '../../../material/material.module';
import { Task } from '../../models/task.model';

export interface TaskDialogData {
  task?: Task;
  isEdit: boolean;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule, CommonModule],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})
export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  dialogTitle: string;
  isMobile = false;
  private destroy$ = new Subject<void>();
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData,
    private breakpointObserver: BreakpointObserver
  ) {
    this.taskForm = this.fb.group({
      id: [null],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: ['', Validators.maxLength(500)],
      completed: [false]
    });
    
    this.dialogTitle = this.data.isEdit ? 'Editar Tarefa' : 'Nova Tarefa';
  }

  ngOnInit(): void {
    if (this.data.isEdit && this.data.task) {
      this.taskForm.patchValue({
        id: this.data.task.id,
        title: this.data.task.title,
        description: this.data.task.description,
        completed: this.data.task.isCompleted
      });
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
      this.dialogRef.updateSize('100%', '100%');
      this.dialogRef.addPanelClass('fullscreen-mobile-dialog');
    } else {
      this.dialogRef.updateSize('500px', '');
      this.dialogRef.removePanelClass('fullscreen-mobile-dialog');
    }
  }

  onSave(): void {
    if (this.taskForm.valid) {
      const formValues = this.taskForm.value;
      
      const taskData = {
        id: formValues.id,
        title: formValues.title,
        description: formValues.description,
        isCompleted: formValues.completed
      };
      
      this.dialogRef.close(taskData);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}