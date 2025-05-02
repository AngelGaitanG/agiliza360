
export interface LayoutState {
    type: 'ADMIN' | 'BRAND' | 'BRANCH';
    role: 'SUPERADMIN' | 'OWNER' | 'MANAGER';
    brandId?: string;
    branchId?: string;
  }
 export interface MenuItem {
    path: string;
    title: string;
    icon: string;
  }