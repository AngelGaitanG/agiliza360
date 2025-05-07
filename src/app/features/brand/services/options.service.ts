import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { OptionDTO } from '../models/option-models/option.dto';
import { CreateOptionResponse, DeleteOptionResponse, GetOptionsByBrandResponse } from '../models/option-models/option.response';

@Injectable({
  providedIn: 'root'
})
export class OptionService {
  private apiUrl = `${environment.apiUrl}/option`;
  private token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) {}

  createOption(option: OptionDTO): Observable<CreateOptionResponse> {
    return this.http.post<CreateOptionResponse>(`${this.apiUrl}`, option, 
        { headers: {
            'Authorization': `Bearer ${this.token}`
        } 
    });
  }

  getAllOptionsByBrandId(brandId: string): Observable<GetOptionsByBrandResponse> {
    return this.http.get<GetOptionsByBrandResponse>(`${this.apiUrl}/${brandId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

  deleteOption(optionId: string): Observable<DeleteOptionResponse> {
    return this.http.delete<DeleteOptionResponse>(`${this.apiUrl}/${optionId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

}