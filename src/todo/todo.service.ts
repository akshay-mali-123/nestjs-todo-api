import { Injectable } from '@nestjs/common';
import { Todo } from './entity';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodoService {
  private todos: Todo[] = [];
  private idCounter = 1;

  create(dto: CreateTodoDto): Todo {
    const todo: Todo = {
      id: this.idCounter++,
      title: dto.title,
      description: dto.description || '',
      isCompleted: false,
    };
    this.todos.push(todo);
    return todo;
  }

  findAll(): Todo[] {
    return this.todos;
  }

  findByid(id: number): Todo | string {
    const todo = this.todos.find((todo) => todo.id === id);
    if (todo) {
      return todo;
    }
    return 'Todo not found';
  }

  updateTodo(id: number, dto: UpdateTodoDto): Todo | string {
    const todo = this.findByid(id);
    if (typeof todo === 'string') {
      return todo;
    }
    todo.title = dto.title ?? todo.title;
    todo.description = dto.description ?? todo.description;
    return todo;
  }

  deleteTodo(id: number): string {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return 'Todo not found';
    }

    this.todos = this.todos.filter((todo) => todo.id !== id);
    return 'Todo deleted successfully';
  }

  markCompleted(id: number): Todo | string {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      return 'Todo not found';
    }
    todo.isCompleted = true;
    return todo;
  }
}
