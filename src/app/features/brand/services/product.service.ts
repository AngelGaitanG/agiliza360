import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateProductResponse, GetProductsByBrandResponse, DeleteProductResponse } from '../models/product.response';
import { ProductDTO } from '../models/product.dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = `${environment.apiUrl}/product`;
  private token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) {}

  createProduct(product: ProductDTO): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(`${this.apiUrl}`, product, 
        { headers: {
            'Authorization': `Bearer ${this.token}`
        } 
    });
  }

  getAllProductsByBrandId(brandId: string): Observable<GetProductsByBrandResponse> {
    return this.http.get<GetProductsByBrandResponse>(`${this.apiUrl}/${brandId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

  deleteProduct(productId: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(`${this.apiUrl}/${productId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

}