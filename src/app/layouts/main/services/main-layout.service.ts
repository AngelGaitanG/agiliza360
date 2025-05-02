import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LayoutState } from '../models/layout-state';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  private layoutTypeSubject = new BehaviorSubject<LayoutState['type']>('ADMIN');
  layoutType$ = this.layoutTypeSubject.asObservable();

  constructor(private router: Router) {
    // Inicializar con valores del localStorage
    const savedLayoutType = localStorage.getItem('layoutType') as LayoutState['type'] | null;
    if (savedLayoutType && (savedLayoutType === 'ADMIN' || savedLayoutType === 'BRAND' || savedLayoutType === 'BRANCH')) {
      this.layoutTypeSubject.next(savedLayoutType);
    }
  }

  // Método para actualizar el tipo de layout
  setLayoutType(type: LayoutState['type']): void {
    // Solo emitimos si hay un cambio real
    if (this.layoutTypeSubject.value !== type) {
      localStorage.setItem('layoutType', type);
      this.layoutTypeSubject.next(type);
    }
  }

  // Método para cambiar a layout admin
  switchToAdminLayout(): void {
    localStorage.setItem('layoutType', 'ADMIN');
    localStorage.removeItem('brandId');
    localStorage.removeItem('branchId');
    this.layoutTypeSubject.next('ADMIN');
    this.router.navigate(['/admin']);
  }

  // Método para cambiar a layout brand
  setBrandId(brandId: string | undefined): void {
    if (brandId) {
      const currentType = this.layoutTypeSubject.value;
      
      // Solo actualizamos si es necesario
      if (currentType !== 'BRAND' || localStorage.getItem('brandId') !== brandId) {
        localStorage.setItem('layoutType', 'BRAND');
        localStorage.setItem('brandId', brandId);
        this.layoutTypeSubject.next('BRAND');
      }
    }
  }

  // Método para cambiar a layout branch
  setBranchId(branchId: string | undefined, brandId?: string): void {
    if (branchId) {
      const currentType = this.layoutTypeSubject.value;
      
      // Si se proporciona un brandId, lo guardamos (para poder volver a la marca después)
      if (brandId) {
        localStorage.setItem('brandId', brandId);
      } else if (!localStorage.getItem('brandId')) {
        // Si no se proporciona brandId y no hay uno guardado, intentamos usar un valor por defecto
        // Esto es solo una medida de seguridad, lo ideal es siempre proporcionar el brandId
        localStorage.setItem('brandId', '1'); // Valor por defecto, ajustar según necesidad
      }
      
      // Solo actualizamos si es necesario
      if (currentType !== 'BRANCH' || localStorage.getItem('branchId') !== branchId) {
        localStorage.setItem('layoutType', 'BRANCH');
        localStorage.setItem('branchId', branchId);
        this.layoutTypeSubject.next('BRANCH');
      }
    }
  }

  // Método para cambiar a layout brand y navegar
  switchToBrandLayout(brandId: string): void {
    this.setBrandId(brandId);
    this.router.navigate([`/brand/${brandId}/dashboard`]);
  }

  // Método para cambiar a layout branch y navegar
  switchToBranchLayout(branchId: string, brandId?: string): void {
    this.setBranchId(branchId, brandId);
    this.router.navigate([`/branch/${branchId}/orders`]);
  }

  getCurrentLayout(): LayoutState['type'] {
    return this.layoutTypeSubject.value;
  }

  getBrandId(): string | null {
    return localStorage.getItem('brandId');
  }

  getBranchId(): string | null {
    return localStorage.getItem('branchId');
  }
} 