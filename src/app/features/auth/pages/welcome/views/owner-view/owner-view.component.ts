import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrandService} from '../../../../../../features/brand/services/brand.service';
import { Brand } from '../../../../../../features/brand/models/brand.model';

@Component({
  selector: 'app-owner-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="owner-view">
      <h1>¡Bienvenido, {{ userName }}!</h1>
      <p class="subtitle">Tus marcas registradas</p>
      
      <div class="brands-grid" *ngIf="brands.length > 0">
        <div class="brand-card" *ngFor="let brand of brands">
          <img [src]="brand.logo" [alt]="brand.name" class="brand-logo">
          <h3>{{ brand.name }}</h3>
          <p>{{ brand.description }}</p>
          <button routerLink="/brand/{{brand._id}}" class="btn btn-primary">
            Gestionar
          </button>
        </div>
      </div>

      <div class="no-brands" *ngIf="brands.length === 0">
        <p>No tienes marcas registradas</p>
        <button routerLink="/brand/new" class="btn btn-primary">
          Crear nueva marca
        </button>
      </div>

      <div class="loading" *ngIf="loading">
        <p>Cargando marcas...</p>
      </div>

      <div class="error-message" *ngIf="error">
        {{ error }}
      </div>
    </div>
  `,
  styles: [`
    .owner-view {
      text-align: center;
      
      h1 {
        color: var(--primary);
        margin-bottom: 1rem;
        font-size: 2rem;
      }

      .subtitle {
        color: var(--gray-600);
        margin-bottom: 2rem;
        font-size: 1.1rem;
      }

      .brands-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }

      .brand-card {
        background: var(--gray-100);
        padding: 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        transition: var(--transition);

        &:hover {
          transform: translateY(-5px);
        }

        .brand-logo {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-bottom: 1rem;
        }

        h3 {
          color: var(--primary);
          margin-bottom: 0.5rem;
        }

        p {
          color: var(--gray-600);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      }

      .no-brands {
        margin-top: 2rem;
        padding: 2rem;
        background: var(--gray-100);
        border-radius: var(--border-radius);

        p {
          color: var(--gray-600);
          margin-bottom: 1rem;
        }
      }

      .loading {
        margin-top: 2rem;
        color: var(--gray-600);
      }

      .error-message {
        margin-top: 2rem;
        padding: 1rem;
        background-color: rgba(var(--error-rgb), 0.1);
        color: var(--error);
        border-radius: var(--border-radius);
      }
    }
  `]
})
export class OwnerViewComponent implements OnInit {
  @Input() userName: string = '';
  brands: Brand[] = [];
  loading = true;
  error: string | null = null;

  constructor(private brandService: BrandService) {}

  ngOnInit(): void {
    this.loadBrands();
  }

  private loadBrands(): void {
    this.loading = true;
    this.error = null;

    this.brandService.getAllBrands().subscribe({
      next: (brands) => {
        this.brands = brands;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Error al cargar las marcas. Por favor, intente nuevamente.';
        this.loading = false;
        console.error('Error loading brands:', err);
      }
    });
  }
} 