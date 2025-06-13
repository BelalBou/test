import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';
import { VendorsService } from '../vendors/vendors.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private vendorsService: VendorsService,
  ) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(userData: Partial<User>): Promise<User> {
    const user = this.usersRepository.create(userData);
    return this.usersRepository.save(user);
  }

  async updateRole(id: number, role: 'client' | 'vendor') {
    await this.usersRepository.update(id, { role });
  }

  async findById(id: number): Promise<User | null> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async becomeVendor(userId: number): Promise<User> {
    const user = await this.findById(userId);
    if (!user) throw new NotFoundException('Utilisateur non trouvé');

    user.role = 'vendor';
    await this.usersRepository.save(user);

    const existing = await this.vendorsService.findByUserId(user.id);
    if (!existing) {
      await this.vendorsService.create({
        user,
        business_name: `${user.firstname} ${user.lastname}`,
        description: '',
        image_url: '',
        location: '',
      });
    }

    return user;
  }
  async update(id: number, data: Partial<User>) {
    return this.usersRepository.update(id, data);
  }
}
