import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Todo } from './todo.module';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    <div *ngFor="let todo of todos">
      {{ todo.title }}
      <button (click)="update(todo)">Update</button>
      <button (click)="delete(todo)">Delete</button>
    </div>
  `,
  styles: [],
})
export class AppComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private appService: AppService) {}

  ngOnInit(): void {
    this.appService.getTodos().subscribe((todos: Todo[]) => {
      this.todos = todos;
    });
  }

  update(todo: Todo) {
    this.appService.updateTodos(todo).subscribe((todoUpdated: Todo) => {
      this.todos[todoUpdated.id - 1] = todoUpdated;
    });
  }

  delete(todo: Todo) {
    this.appService.deleteTodos(todo).subscribe((todoDelete: Todo) => {
      this.todos = [
        ...this.todos.filter((t) => t.id !== todoDelete.id),
        todoDelete,
      ];
    });
  }
}
