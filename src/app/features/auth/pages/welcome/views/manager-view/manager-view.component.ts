import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Branch {
  id: number;
  name: string;
  address: string;
  brandName: string;
  brandLogo: string;
}

@Component({
  selector: 'app-manager-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="manager-view">
      <h1>¡Bienvenido, {{ userName }}!</h1>
      <p class="subtitle">Tus sucursales asignadas</p>
      
      <div class="branches-grid" *ngIf="branches.length > 0">
        <div class="branch-card" *ngFor="let branch of branches">
          <div class="brand-info">
            <img [src]="branch.brandLogo" [alt]="branch.brandName" class="brand-logo">
            <span class="brand-name">{{ branch.brandName }}</span>
          </div>
          <h3>{{ branch.name }}</h3>
          <p>{{ branch.address }}</p>
          <button routerLink="/branch/{{branch.id}}" class="btn btn-primary">
            Gestionar sucursal
          </button>
        </div>
      </div>

      <div class="no-branches" *ngIf="branches.length === 0">
        <p>No tienes sucursales asignadas</p>
        <p class="contact">Por favor, contacta al administrador de tu marca</p>
      </div>
    </div>
  `,
  styles: [`
    .manager-view {
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

      .branches-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
        margin-top: 2rem;
      }

      .branch-card {
        background: var(--gray-100);
        padding: 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--box-shadow);
        transition: var(--transition);

        &:hover {
          transform: translateY(-5px);
        }

        .brand-info {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid var(--gray-300);

          .brand-logo {
            width: 40px;
            height: 40px;
            object-fit: contain;
          }

          .brand-name {
            color: var(--primary);
            font-weight: 500;
          }
        }

        h3 {
          color: var(--gray-900);
          margin-bottom: 0.5rem;
        }

        p {
          color: var(--gray-600);
          margin-bottom: 1rem;
          font-size: 0.9rem;
        }
      }

      .no-branches {
        margin-top: 2rem;
        padding: 2rem;
        background: var(--gray-100);
        border-radius: var(--border-radius);

        p {
          color: var(--gray-600);
          margin-bottom: 0.5rem;
        }

        .contact {
          font-size: 0.9rem;
          color: var(--gray-500);
        }
      }
    }
  `]
})
export class ManagerViewComponent implements OnInit {
  @Input() userName: string = '';
  branches: Branch[] = [];

  ngOnInit(): void {
    // TODO: Obtener las sucursales del manager desde el servicio
    this.branches = [
      {
        id: 1,
        name: 'Sucursal Central',
        address: 'Av. Principal 123',
        brandName: 'Marca Ejemplo',
        brandLogo: 'assets/images/logo-placeholder.png'
      }
    ];
  }
} 