import { Component } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { Task } from '../../Task';
import { TaskItemComponent } from '../task-item/task-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskItemComponent, AddTaskComponent],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks: Task[] = [];
  constructor(private taskService: TaskService){
    this.taskService.getTasks().subscribe((tasks) => this.tasks = tasks);
  }
  deleteTask(task: Task) {
    this.taskService.deleteTasks(task).subscribe(() => this.tasks = this.tasks.filter(t => t.id !== task.id));
  }
  toggleReminder(task: Task): void{
    task.reminder = !task.reminder;
    this.taskService.updateTaskReminder(task).subscribe();
  }
  addTask(task: Task): void {
    this.taskService.addTask(task).subscribe((tasks) => this.tasks.push(task));
  }
}
