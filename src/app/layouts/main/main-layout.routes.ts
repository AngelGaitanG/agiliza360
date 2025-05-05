import { MenuItem } from "./models/layout-state";

export class MainLayoutRoutes {

    
    adminMenuItems: MenuItem[] = [
    { path: '/admin/ai-monitor', title: 'Monitoreo de AI', icon: 'fi-rr-user-robot' },
    { path: '/admin/restaurants', title: 'Restaurantes', icon: 'fi-rr-shop  ' },
    { path: '/admin/delivery-partners', title: 'Motorizados', icon: 'fi-rr-moped' },
  ];

  brandMenuItems: MenuItem[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'fi-rr-apps' },
    { path: 'branches', title: 'Sucursales', icon: 'fi-rr-window-restore' },
    { path: 'menu', title: 'Menú', icon: 'fi-rr-restaurant' },
    { path: 'staff', title: 'Personal', icon: 'fi-rr-users-alt' },
    { path: 'settings', title: 'Configuración', icon: 'fi-rr-document-gear' },
    { path: 'integration', title: 'Integración', icon: 'fi-rr-cloud-download' },
  ];

  branchMenuItems: MenuItem[] = [
    { path: 'dashboard', title: 'Dashboard', icon: 'fi-rr-apps' },
    { path: 'orders', title: 'Órdenes', icon: 'fi-rr-file-invoice-dollar' },
    { path: 'tables', title: 'Mesas', icon: 'fi-rr-terrace' },
    { path: 'staff', title: 'Personal', icon: 'fi-rr-users-alt' },
    { path: 'reports', title: 'Reportes', icon: 'fi-rr-insurance' },
  ];
}