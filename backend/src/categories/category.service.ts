import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';
import { UpdateCategoryDto } from './update-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepository.find({ relations: ['products'] });
  }

  findOne(id: number) {
    return this.categoryRepository.findOne({
      where: { id },
      relations: ['products'],
    });
  }

  create(data: CreateCategoryDto) {
    const category = this.categoryRepository.create(data);
    return this.categoryRepository.save(category);
  }

  update(id: number, data: UpdateCategoryDto) {
    return this.categoryRepository.update(id, data);
  }

  delete(id: number) {
    return this.categoryRepository.delete(id);
  }
}
