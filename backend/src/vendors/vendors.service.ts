import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vendor } from './vendor.entity';

@Injectable()
export class VendorsService {
  constructor(
    @InjectRepository(Vendor)
    private readonly vendorRepository: Repository<Vendor>,
  ) {}

  // Récupérer tous les vendeurs avec l'utilisateur lié
  findAll(): Promise<Vendor[]> {
    return this.vendorRepository.find({
      relations: ['user'],
    });
  }

  // Récupérer un vendeur avec ses produits
  async findOne(id: number): Promise<Vendor | null> {
    return this.vendorRepository.findOne({
      where: { id },
      relations: ['user', 'products'],
    });
  }

  // Créer un nouveau vendeur
  async create(data: Partial<Vendor>): Promise<Vendor> {
    const vendor = this.vendorRepository.create(data);
    return this.vendorRepository.save(vendor);
  }

  // (optionnel) Supprimer un vendeur
  async remove(id: number): Promise<void> {
    await this.vendorRepository.delete(id);
  }

  async findByUserId(userId: number): Promise<Vendor | null> {
    const vendor = await this.vendorRepository.findOne({
      where: { user: { id: userId } },
      relations: ['user', 'products'],
    });
    return vendor || null;
  }

  async updateByUserId(
    userId: number,
    updateData: Partial<Vendor>,
  ): Promise<Vendor | null> {
    const vendor = await this.findByUserId(userId);
    if (!vendor) return null;
    Object.assign(vendor, updateData);
    return this.vendorRepository.save(vendor);
  }
}
