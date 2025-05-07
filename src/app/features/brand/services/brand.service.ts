import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Brand } from '../models/brand-models/brand.model';
import { BrandResponse } from '../models/brand-models/create-brand.response';
import { UpdateBrandDto } from '../models/brand-models/brand.dto';

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

  // this.http.post(`${environment.apiUrl}/brand`, formData, {
    //   headers: {
  //     'Authorization': `Bearer ${token}`
  //   }
  createBrand(brand: Partial<Brand>): Observable<BrandResponse> {
    return this.http.post<BrandResponse>(this.apiUrl, brand, {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    });
  }

  updateBrand(id: string, brand: UpdateBrandDto): Observable<BrandResponse> {
    return this.http.patch<BrandResponse>(
      `${this.apiUrl}/${id}/settings`, 
      brand,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        })
      }
    );
  }

  getBrandById(id: string): Observable<BrandResponse> {
    return this.http.get<BrandResponse>(
      `${this.apiUrl}/${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.token}`
        })
      }
    );
  }

  deleteBrand(id: string): Observable<void> {
    const token = localStorage.getItem('token');
    return this.http.delete<void>(
      `${this.apiUrl}/${id}`,
      {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${token}`
        })
      }
    );
  }
} 