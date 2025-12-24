import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodoService } from './todo.service';
import { Todo } from './entity';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Controller('todo')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  create(@Body() dto: CreateTodoDto): Todo {
    return this.todoService.create(dto);
  }

  @Get()
  findAll(): Todo[] {
    return this.todoService.findAll();
  }

  @Get(':id')
  findById(@Param('id', ParseIntPipe) id: number): Todo | string {
    return this.todoService.findByid(id);
  }

  @Patch(':id/complete')
  markCompleted(@Param('id', ParseIntPipe) id: number): Todo | string {
    return this.todoService.markCompleted(id);
  }

  @Patch(':id')
  updateTodo(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTodoDto,
  ): Todo | string {
    return this.todoService.updateTodo(id, dto);
  }

  @Delete(':id')
  deleteTodo(@Param('id', ParseIntPipe) id: number): string {
    return this.todoService.deleteTodo(id);
  }
}
