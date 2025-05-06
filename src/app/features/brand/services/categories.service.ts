import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateCategoryDto } from '../models/category.dto';
import { CreateCategoryResponse, GetBrandCategoriesResponse, DeleteCategoryResponse } from '../models/category.response';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = `${environment.apiUrl}/category`;
  private token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) {}

  createCategory(category: CreateCategoryDto): Observable<CreateCategoryResponse> {
    return this.http.post<CreateCategoryResponse>(`${this.apiUrl}`, category, 
        { headers: {
            'Authorization': `Bearer ${this.token}`
        } 
    });
  }

  getAllCategoriesByBrandId(brandId: string): Observable<GetBrandCategoriesResponse> {
    return this.http.get<GetBrandCategoriesResponse>(`${this.apiUrl}/${brandId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

  deleteCategory(categoryId: string): Observable<DeleteCategoryResponse> {
    return this.http.delete<DeleteCategoryResponse>(`${this.apiUrl}/${categoryId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

}