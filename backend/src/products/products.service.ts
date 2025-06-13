import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity'; // ✅ adapte selon ton chemin réel
import { CreateProductDto } from '../auth/dto/create-product.dto';
import { Vendor } from '../vendors/vendor.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>, // ✅ singulier ici aussi
    @InjectRepository(Vendor)
    private vendorRepository: Repository<Vendor>,
  ) {}

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['vendor'],
    });
  }

  async createForVendor(
    userId: number,
    data: CreateProductDto,
  ): Promise<Product> {
    const vendor = await this.vendorRepository.findOne({
      where: { user: { id: userId } },
    });

    if (!vendor) {
      throw new NotFoundException('Vendor not found');
    }

    const product = this.productRepository.create({
      ...data,
      vendor,
    });

    return this.productRepository.save(product);
  }

  async updateProduct(
    userId: number,
    productId: number,
    data: Partial<CreateProductDto>,
  ) {
    // On vérifie que le produit appartient bien au vendeur connecté
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['vendor', 'vendor.user'],
    });
    if (!product) throw new NotFoundException('Produit non trouvé');
    if (!product.vendor || product.vendor.user.id !== userId) {
      throw new NotFoundException('Accès refusé');
    }
    Object.assign(product, data);
    return this.productRepository.save(product);
  }

  async deleteProduct(userId: number, productId: number) {
    // On vérifie que le produit appartient bien au vendeur connecté
    const product = await this.productRepository.findOne({
      where: { id: productId },
      relations: ['vendor', 'vendor.user'],
    });
    if (!product) throw new NotFoundException('Produit non trouvé');
    if (!product.vendor || product.vendor.user.id !== userId) {
      throw new NotFoundException('Accès refusé');
    }
    await this.productRepository.delete(productId);
    return { message: 'Produit supprimé' };
  }
}
