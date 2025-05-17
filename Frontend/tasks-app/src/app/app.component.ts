import { Component } from '@angular/core';
import { MaterialModule } from './modules/material/material.module';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TaskService } from './modules/shared/services/task.service';
import { Task } from './modules/shared/models/task.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MaterialModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Gerenciador de Tarefas';
  isDarkTheme = false;
  tasks: Task[] = [];
  displayedColumns: string[] = ['id', 'title', 'description', 'isCompleted', 'actions'];
  isLoading = true;

  constructor(
    private taskService: TaskService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTasks();
    console.log('TaskListComponent initialized');
  }

  loadTasks(): void {
    this.isLoading = true;
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar tarefas', error);
        this.snackBar.open('Erro ao carregar tarefas', 'Fechar', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  toggleTaskStatus(task: Task): void {
    const updatedTask = {
      title: task.title,
      description: task.description,
      isCompleted: !task.isCompleted
    };

    this.taskService.updateTask(task.id, updatedTask).subscribe({
      next: () => {
        task.isCompleted = !task.isCompleted;
        const status = task.isCompleted ? 'concluída' : 'reaberta';
        this.snackBar.open(`Tarefa ${status} com sucesso!`, 'Fechar', { duration: 3000 });
      },
      error: (error) => {
        console.error('Erro ao atualizar status da tarefa', error);
        this.snackBar.open('Erro ao atualizar status da tarefa', 'Fechar', { duration: 3000 });
      }
    });
  }

  openEditDialog(task: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task, isEdit: true }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.updateTask(task.id, result).subscribe({
          next: (updatedTask) => {
            const index = this.tasks.findIndex(t => t.id === task.id);
            if (index !== -1) {
              this.tasks[index] = updatedTask;
            }
            this.snackBar.open('Tarefa atualizada com sucesso', 'Fechar', { duration: 2000 });
          },
          error: (error) => {
            console.error('Erro ao atualizar tarefa', error);
            this.snackBar.open('Erro ao atualizar tarefa', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: { task: {}, isEdit: false }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.createTask(result).subscribe({
          next: (newTask) => {
            this.tasks.push(newTask);
            this.snackBar.open('Tarefa criada com sucesso', 'Fechar', { duration: 2000 });
          },
          error: (error) => {
            console.error('Erro ao criar tarefa', error);
            this.snackBar.open('Erro ao criar tarefa', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  openConfirmDialog(id: number): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: 'Tem certeza que deseja excluir esta tarefa?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.taskService.deleteTask(id).subscribe({
          next: () => {
            this.tasks = this.tasks.filter(t => t.id !== id);
            this.snackBar.open('Tarefa excluída com sucesso', 'Fechar', { duration: 2000 });
          },
          error: (error) => {
            console.error('Erro ao excluir tarefa', error);
            this.snackBar.open('Erro ao excluir tarefa', 'Fechar', { duration: 3000 });
          }
        });
      }
    });
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        this.snackBar.open('Tarefa excluída com sucesso!', 'Fechar', { duration: 3000 });
      },
      error: (error) => {
        console.error('Erro ao excluir tarefa', error);
        this.snackBar.open('Erro ao excluir tarefa', 'Fechar', { duration: 3000 });
      }
    });
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    const theme = this.isDarkTheme ? 'dark-theme' : 'light-theme';
    document.body.classList.toggle('dark-theme', this.isDarkTheme);
    document.body.classList.toggle('light-theme', !this.isDarkTheme);
  }
}
