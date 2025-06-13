import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Vendor {
  id: number;
  business_name: string;
  description?: string;
  image_url?: string;
  location?: string;
  user: {
    firstname: string;
    lastname: string;
  };
  products?: {
    id: number;
    title: string;
    price: number;
    image_url: string;
    description?: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Vendor[]> {
    return this.http.get<Vendor[]>('http://localhost:3000/vendors');
  }

  getById(id: number): Observable<Vendor> {
    return this.http.get<Vendor>(`http://localhost:3000/vendors/${id}`);
  }

  getMyVendor(): Observable<Vendor> {
    return this.http.get<Vendor>('http://localhost:3000/vendors/me');
  }
}
