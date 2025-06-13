export class CreateProductDto {
  title: string;
  description: string;
  price: number;
  image_url: string;
  stock: number;
  category_id: number;
}
