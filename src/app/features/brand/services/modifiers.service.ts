import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { CreateModifierResponse, GetModifiersResponse, DeleteModifierResponse } from '../models/modifier-models/modifier.response';
import { ModifierDTO } from '../models/modifier-models/modifier.dto';

@Injectable({
  providedIn: 'root'
})
export class ModifiersService {
  private apiUrl = `${environment.apiUrl}/modifier`;
  private token = localStorage.getItem('auth_token');

  constructor(private http: HttpClient) {}

  createModifier(modifier: ModifierDTO): Observable<CreateModifierResponse> {
    return this.http.post<CreateModifierResponse>(`${this.apiUrl}`, modifier, 
        { headers: {
            'Authorization': `Bearer ${this.token}`
        } 
    });
  }

  getAllProductsByBrandId(brandId: string): Observable<GetModifiersResponse> {
    return this.http.get<GetModifiersResponse>(`${this.apiUrl}/${brandId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

  deleteModifier(modifierId: string): Observable<DeleteModifierResponse> {
    return this.http.delete<DeleteModifierResponse>(`${this.apiUrl}/${modifierId}`, {
        headers: {
            'Authorization': `Bearer ${this.token}`
        }
    });
  }

}