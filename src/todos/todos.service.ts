import { Injectable } from '@nestjs/common';
import { TodoDto } from './dto/todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './entities/todo.entity';
@Injectable()
export class TodosService {
  constructor(@InjectRepository(Todo) private repo: Repository<Todo>) {}

  create(createTodoDto: TodoDto) {
    const todo = this.repo.create(createTodoDto);
    return this.repo.save(todo);
  }

  findAll() {
    return this.repo.find({
      relations: ['user'],
      select: {
        id: true,
        title: true,
        completed: true,
        user: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
    });
  }

  findOne(id: number) {
    return this.repo.findOne({
      where: { id },
      relations: ['user'],
      select: {
        id: true,
        title: true,
        completed: true,
        user: {
          id: true,
          name: true,
          email: true,
          username: true,
        },
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const todo = this.repo.create(updateTodoDto);
    await this.repo.save(todo);
    return this.findOne(id);
  }

  remove(id: number) {
    return this.repo.delete({ id });
  }
}
