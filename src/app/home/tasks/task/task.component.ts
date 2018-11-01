import { Component, OnInit, Input } from '@angular/core';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  @Input() task: Task;

  constructor() { }

  ngOnInit() { }
}
