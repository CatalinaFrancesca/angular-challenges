import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from './todo.module';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private todosUrl = 'https://jsonplaceholder.typicode.com/todos';
  constructor(private http: HttpClient) {}

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.todosUrl);
  }

  updateTodos(todo: Todo): Observable<Todo> {
    const url = `https://jsonplaceholder.typicode.com/todos/${todo.id}`;
    const body = JSON.stringify({
      todo: todo.id,
      title: randText(),
      body: todo.body,
      userId: todo.userId,
    });

    const headers = new HttpHeaders({
      'Content-type': 'application/json; charset=UTF-8',
    });
    return this.http.put<Todo>(url, body, { headers });
  }

  deleteTodos(todo: Todo): Observable<Todo> {
    const url = `https://jsonplaceholder.typicode.com/todos/${todo.id}`;
    return this.http.delete<Todo>(url);
  }
}
