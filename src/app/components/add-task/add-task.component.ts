import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task } from '../../Task';
import { Subscription } from 'rxjs';
import { UiService } from '../../services/ui.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})
export class AddTaskComponent {
  @Output() onAddTask: EventEmitter<Task> = new EventEmitter();
  text : string ='';
  day : string = '';
  reminder: boolean = false;
  showAddTask?: boolean;
  Subscription?: Subscription;

  constructor(private uiService: UiService){
    this.Subscription = this.uiService.onToggle().subscribe(value => this.showAddTask=value)
  }

  onSubmit() {
    if(!this.text){
      alert('Please add a task!');
    }

    const newTask: Task = {
      text: this.text,
      day: this.day,
      reminder: this.reminder
    }
    
    this.onAddTask.emit(newTask);

    this.text ='';
    this.day = '';
    this.reminder = false;
  }
}
