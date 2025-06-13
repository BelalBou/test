import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UnsplashService {
  private accessKey = 'sbdlZ35f7ubdoBuMjoG42CiDrr2xjn4V0xce0biq7WI'; // 🔐 Remplace par ta clé API
  private baseUrl = 'https://api.unsplash.com';

  constructor(private http: HttpClient) {}

  searchImages(query: string, perPage: number = 10): Observable<any> {
    const params = new HttpParams()
      .set('query', query)
      .set('client_id', this.accessKey)
      .set('per_page', perPage);

    return this.http.get(`${this.baseUrl}/search/photos`, { params });
  }
}
