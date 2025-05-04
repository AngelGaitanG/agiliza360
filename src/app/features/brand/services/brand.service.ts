import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Brand } from '../models/brand.model';
import { CreateBrandResponse } from '../models/create-brand.response';

@Injectable({
  providedIn: 'root'
})
export class BrandService {
  private apiUrl = `${environment.apiUrl}/brand`;
  private token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(`${this.apiUrl}/all`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

  getBrandById(id: string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`);
  }
  // this.http.post(`${environment.apiUrl}/brand`, formData, {
  //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  createBrand(brand: Partial<Brand>): Observable<CreateBrandResponse> {
    return this.http.post<CreateBrandResponse>(this.apiUrl, brand, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  updateBrand(id: string, brand: Partial<Brand>): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${id}`, brand);
  }

  deleteBrand(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
} 