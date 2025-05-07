import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { BrandService} from '../../../../../../features/brand/services/brand.service';
import { Brand } from '../../../../../brand/models/brand-models/brand.model';

@Component({
  selector: 'app-owner-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './owner-view.component.html',
  styleUrls: ['./owner-view.component.scss']
})
export class OwnerViewComponent implements OnInit {
  @Input() userName: string = '';
  @Output() showCreateBrand = new EventEmitter<boolean>();
  brands: Brand[] = [];
  loading = true;
  error: string | null = null;

  constructor(private brandService: BrandService, private router: Router) {}

  ngOnInit(): void {
    this.loadBrands();
  }
  
  setBrandSubdomain(brandId: string): void {
    console.log(brandId, 'brandId');
    console.log(this.brands, 'brands dentro del set');
    const subdomain = this.brands.find(brand => brand._id === brandId)?.subdomain;
    localStorage.setItem('brand-subdomain', subdomain || '');
  }

  private loadBrands(): void {
    this.loading = true;
    this.error = null;

    this.brandService.getAllBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
        console.log(brands, 'brands');
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las marcas. Por favor, intente nuevamente.';
        this.loading = false;
        console.error('Error loading brands:', err);
      }
    });
  }

  toggleCreateBrand(): void {
    this.showCreateBrand.emit(true);
  }
} 