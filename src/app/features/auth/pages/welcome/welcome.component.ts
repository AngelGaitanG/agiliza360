import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SuperAdminViewComponent } from './views/super-admin-view/super-admin-view.component';
import { OwnerViewComponent } from './views/owner-view/owner-view.component';
import { ManagerViewComponent } from './views/manager-view/manager-view.component';
import { CreateBrandComponent } from './views/create-brand/create-brand.component';
import { UserRole } from '../../../../core/types/auth.types';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule, 
    SuperAdminViewComponent, 
    OwnerViewComponent, 
    ManagerViewComponent,
    CreateBrandComponent
  ],
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent implements OnInit {
  userRole: UserRole | null = null;
  userName: string = '';
  showCreateBrand = false;

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

  onShowCreateBrand(show: boolean): void {
    this.showCreateBrand = show;
  }
} 