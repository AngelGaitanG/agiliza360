import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LayoutState, MenuItem } from '../../../models/layout-state';
import { MainLayoutRoutes } from '../../../main-layout.routes';
import { AuthService } from '../../../../../features/auth/services/auth.service';
import { LayoutService } from '../../../services/main-layout.service';

@Component({
  selector: 'app-main-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-sidebar.component.html',
  styleUrls: ['./main-sidebar.component.scss']
})
export class MainSidebarComponent implements OnInit {

  private mainLayoutRoutes = new MainLayoutRoutes();

  sidebarOpen = false;
  userName: string = '';
  layoutState: LayoutState = {
    type: 'ADMIN',
    role: 'SUPERADMIN',
    brandId: undefined,
    branchId: undefined
  };
  menuItems: MenuItem[] = [];
  isMenuChanging: boolean = false;
  userRole: string = 'MANAGER'; // Valor por defecto

  constructor(
    private authService: AuthService,
    private router: Router,
    private layoutService: LayoutService
  ) {
    this.updateMenuItems();
  }

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  ngOnInit(): void {
    // Guardamos el tipo de layout actual para comparar cambios
    let currentLayoutType = this.layoutState.type;
    let currentBrandId = this.layoutState.brandId;
    let currentBranchId = this.layoutState.branchId;
    
    // Obtenemos el rol del usuario
    this.userRole = this.authService.getUserRole();
    this.layoutState.role = this.userRole as 'SUPERADMIN' | 'OWNER' | 'MANAGER';
    
    // Suscripción a cambios de layout
    this.layoutService.layoutType$.subscribe((layoutType: any) => {
      // Solo actualizamos si hay un cambio real
      if (layoutType !== currentLayoutType) {
        currentLayoutType = layoutType;
        this.layoutState.type = layoutType;
        
        // Verificamos cambios en el brandId
        const brandId = localStorage.getItem('brandId');
        if (brandId !== currentBrandId) {
          currentBrandId = brandId || undefined;
          this.layoutState.brandId = currentBrandId;
        }
        
        // Verificamos cambios en el branchId
        const branchId = localStorage.getItem('branchId');
        if (branchId !== currentBranchId) {
          currentBranchId = branchId || undefined;
          this.layoutState.branchId = currentBranchId;
        }
        
        this.updateMenuItems();
      }
    });

    this.authService.authState$.subscribe((state: any) => {
      if (state.user) {
        this.userName = state.user.name;
        this.userRole = state.user.role;
        this.layoutState.role = this.userRole as 'SUPERADMIN' | 'OWNER' | 'MANAGER';
      }
    });
  }

  private updateMenuItems(): void {
    // Activamos la clase de transición
    this.isMenuChanging = true;
    
    // Primero ponemos los items en null
    this.menuItems = [];
    
    // Esperamos un momento y luego actualizamos con los nuevos items
    setTimeout(() => {
      switch (this.layoutState.type) {
        case 'BRAND':
          this.menuItems = this.mainLayoutRoutes.brandMenuItems.map((item: any) => ({
            ...item,
            path: `/brand/${this.layoutState.brandId}/${item.path}`
          }));
          break;
        case 'BRANCH':
          this.menuItems = this.mainLayoutRoutes.branchMenuItems.map((item: any) => ({
            ...item,
            path: `/branch/${this.layoutState.branchId}/${item.path}`
          }));
          break;
        default:
          this.menuItems = this.mainLayoutRoutes.adminMenuItems;
          break;
      }
      
      // Desactivamos la clase de transición después de un breve retraso
      setTimeout(() => {
        this.isMenuChanging = false;
      }, 50);
    }, 300);
  }

  canShowBackButton(): boolean {
    // Lógica basada en el rol y el tipo de layout
    if (this.userRole === 'superadmin') {
      // El superadmin puede volver al menú admin desde brand o branch
      return this.layoutState.type !== 'ADMIN';
    } else if (this.userRole === 'admin') {
      // El admin de marca solo puede volver a brand desde branch
      return this.layoutState.type === 'BRANCH';
    } else if (this.userRole === 'user') {
      // El usuario normal no tiene opción de volver
      return false;
    }
    return false;
  }

  getBackButtonText(): string {
    if (this.userRole === 'superadmin') {
      if (this.layoutState.type === 'BRANCH') {
        // Si está en branch, primero vuelve a brand
        return 'Volver a Marca';
      }
      // Si está en brand, vuelve a admin
      return 'Volver a Admin';
    } else if (this.userRole === 'admin') {
      // El admin solo puede volver a brand desde branch
      return 'Volver a Marca';
    }
    return 'Volver';
  }

  onBackClick(): void {
    if (this.userRole === 'superadmin') {
      if (this.layoutState.type === 'BRANCH') {
        // Si está en branch, primero vuelve a brand
        this.switchToBrandLayout(this.layoutState.brandId!);
      } else if (this.layoutState.type === 'BRAND') {
        // Si está en brand, vuelve a admin
        this.switchToAdminLayout();
      }
    } else if (this.userRole === 'ADMIN' && this.layoutState.type === 'BRANCH') {
      // Si es admin y está en branch, vuelve a brand
      this.switchToBrandLayout(this.layoutState.brandId!);
    }
  }

  switchToAdminLayout(): void {
    this.layoutService.switchToAdminLayout();
    this.layoutState.type = 'ADMIN';
    this.layoutState.brandId = undefined;
    this.layoutState.branchId = undefined;
    this.menuItems = this.mainLayoutRoutes.adminMenuItems;
  }

  switchToBrandLayout(brandId: string): void {
    this.layoutService.switchToBrandLayout(brandId);
    this.layoutState.type = 'BRAND';
    this.layoutState.brandId = brandId;
    this.layoutState.branchId = undefined;
    this.updateMenuItems();
  }

  onLogoutClick(): void {
    // Eliminar datos de sesión
    localStorage.removeItem('layoutType');
    localStorage.removeItem('brandId');
    localStorage.removeItem('branchId');
    
    // Limpiar estado de autenticación
    this.authService.removeToken();
    
    // Redireccionar a la página de login
    this.router.navigate(['/login']);
  }
}
