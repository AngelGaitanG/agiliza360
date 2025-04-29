import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SuperAdminViewComponent } from './views/super-admin-view/super-admin-view.component';
import { OwnerViewComponent } from './views/owner-view/owner-view.component';
import { ManagerViewComponent } from './views/manager-view/manager-view.component';
import { UserRole } from '../../../../core/types/auth.types';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule, RouterModule, SuperAdminViewComponent, OwnerViewComponent, ManagerViewComponent],
  template: `
    <div class="welcome-container">
      <div class="welcome-card">
        <ng-container [ngSwitch]="userRole">
          <!-- SuperAdmin View -->
          <app-super-admin-view *ngSwitchCase="'SUPERADMIN'" 
            [userName]="userName">
          </app-super-admin-view>

          <!-- Owner View -->
          <app-owner-view *ngSwitchCase="'OWNER'"
            [userName]="userName">
          </app-owner-view>

          <!-- Manager View -->
          <app-manager-view *ngSwitchCase="'MANAGER'"
            [userName]="userName">
          </app-manager-view>

          <!-- Default View -->
          <div *ngSwitchDefault class="error-message">
            Rol no reconocido. Por favor, contacte al administrador.
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .welcome-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
      padding: 20px;
    }

    .welcome-card {
      background: white;
      padding: 2.5rem;
      border-radius: var(--border-radius);
      box-shadow: var(--box-shadow);
      width: 100%;
      max-width: 800px;
      animation: fadeIn 0.5s ease-in-out;
    }

    .error-message {
      color: var(--error);
      text-align: center;
      padding: 1rem;
      background-color: rgba(var(--error-rgb), 0.1);
      border-radius: var(--border-radius);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `]
})
export class WelcomeComponent implements OnInit {
  userRole: UserRole | null = null;
  userName: string = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    console.log('WelcomeComponent initialized');
    const userData = localStorage.getItem('currentUser');
    console.log('User data from localStorage:', JSON.parse(userData || '{}'));
    
    this.authService.getCurrentUser().subscribe({
      next: (user) => {
        console.log('User in WelcomeComponent:', user);
        if (user) {
          this.userRole = user.role;
          this.userName = user.fullName;
        }
      },
      error: (error) => {
        console.error('Error in WelcomeComponent:', error);
      }
    });
  }
} 