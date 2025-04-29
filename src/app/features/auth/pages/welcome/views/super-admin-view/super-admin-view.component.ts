import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-super-admin-view',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="super-admin-view">
      <h1>¡Bienvenido, {{ userName }}!</h1>
      <p class="subtitle">Has iniciado sesión como Super Administrador</p>
      
      <div class="actions">
        <button routerLink="/dashboard" class="btn btn-primary">
          Ir al Dashboard
        </button>
      </div>
    </div>
  `,
  styles: [`
    .super-admin-view {
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

      .actions {
        margin-top: 2rem;
        
        .btn {
          min-width: 200px;
        }
      }
    }
  `]
})
export class SuperAdminViewComponent {
  @Input() userName: string = '';
} 