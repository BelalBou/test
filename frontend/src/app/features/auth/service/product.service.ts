import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Products {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  category_id: number;
  user_id: number;
  created_at: string;
  stock: number;
  vendor?: {
    id: number;
    business_name?: string;
    name?: string;
  };
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Products[]> {
    return this.http.get<Products[]>(this.apiUrl);
  }
  getById(id: string): Observable<Products> {
    return this.http.get<Products>(`${this.apiUrl}/${id}`);
  }
}
