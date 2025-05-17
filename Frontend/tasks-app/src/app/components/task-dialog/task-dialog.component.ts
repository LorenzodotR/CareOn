
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../modules/shared/models/task.model';
import { MaterialModule } from '../../modules/material/material.module';

export interface TaskDialogData {
  task?: Task;
  isEdit: boolean;
}

@Component({
  selector: 'app-task-dialog',
  standalone: true,
  imports: [MaterialModule, ReactiveFormsModule ],
  templateUrl: './task-dialog.component.html',
  styleUrl: './task-dialog.component.scss'
})

export class TaskDialogComponent implements OnInit {
  taskForm: FormGroup;
  dialogTitle: string;
  
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TaskDialogData
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
  }

  onSave(): void {
    if (this.taskForm.valid) {
      this.dialogRef.close(this.taskForm.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
