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
  openMenuIndex: number | null = null; // Nueva propiedad para controlar qué menú está abierto

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

  toggleSubmenu(index: number, event: Event): void {
    event.preventDefault(); // Prevenir la navegación por defecto
    this.openMenuIndex = this.openMenuIndex === index ? null : index;
  }

  ngOnInit(): void {
    // Inicializamos el estado con los valores del localStorage
    const storedBrandId = localStorage.getItem('brandId');
    const storedBranchId = localStorage.getItem('branchId');
    const storedLayoutType = localStorage.getItem('layoutType') as 'ADMIN' | 'BRAND' | 'BRANCH' || 'ADMIN';

    // Actualizamos el estado inicial
    this.layoutState = {
      type: storedLayoutType,
      role: this.userRole as 'SUPERADMIN' | 'OWNER' | 'MANAGER',
      brandId: storedBrandId || undefined,
      branchId: storedBranchId || undefined
    };

    // Actualizamos los items del menú con el estado inicial
    this.updateMenuItems();
    
    // Suscripción a cambios de layout
    this.layoutService.layoutType$.subscribe((layoutType: any) => {
        this.layoutState.type = layoutType;
        
      // Solo actualizamos los IDs si están presentes en localStorage
        const brandId = localStorage.getItem('brandId');
        const branchId = localStorage.getItem('branchId');
      
      if (brandId) {
        this.layoutState.brandId = brandId;
      }
      
      if (branchId) {
        this.layoutState.branchId = branchId;
        }
        
        this.updateMenuItems();
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
    this.isMenuChanging = true;
    this.menuItems = [];
    
    // Verificamos que tengamos un brandId antes de actualizar
    if (this.layoutState.type === 'BRAND' && !this.layoutState.brandId) {
      const storedBrandId = localStorage.getItem('brandId');
      if (storedBrandId) {
        this.layoutState.brandId = storedBrandId;
      } else {
        console.warn('No se encontró brandId para el layout tipo BRAND');
        return;
      }
    }
    
    setTimeout(() => {
      switch (this.layoutState.type) {
        case 'BRAND':
          this.menuItems = this.mainLayoutRoutes.brandMenuItems.map(item => {
            const baseItem = {
            ...item,
            path: `/brand/${this.layoutState.brandId}/${item.path}`
            };

            if (item.children) {
              baseItem.children = item.children.map(child => ({
                ...child,
                path: `/brand/${this.layoutState.brandId}/${child.path}`
              }));
            }

            return baseItem;
          });
          break;
        case 'BRANCH':
          this.menuItems = this.mainLayoutRoutes.branchMenuItems.map(item => ({
            ...item,
            path: `/branch/${this.layoutState.branchId}/${item.path}`
          }));
          break;
        default:
          this.menuItems = this.mainLayoutRoutes.adminMenuItems;
          break;
      }
      
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
    // Guardamos el brandId en localStorage
    localStorage.setItem('brandId', brandId);
    localStorage.setItem('layoutType', 'BRAND');
    
    // Actualizamos el servicio de layout
    this.layoutService.switchToBrandLayout(brandId);
    
    // Actualizamos el estado local
    this.layoutState.type = 'BRAND';
    this.layoutState.brandId = brandId;
    this.layoutState.branchId = undefined;
    
    // Actualizamos los items del menú
    this.updateMenuItems();
  }

  onLogoutClick(): void {
    // Eliminar datos de sesión
    this.authService.logout();
  }
}
