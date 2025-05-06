import { Routes } from "@angular/router";

export const BRAND_ROUTES: Routes = [
    {
        path: '',
        loadComponent: () => import('../../layouts/main/main-layout.component').then(m => m.MainLayoutComponent),
        children: [
            // {
            //     path: ':id/dashboard',
            //     loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
            // },
            {
                path: ':id/menu',
                loadComponent: () => import('./pages/menu/menu.component').then(m => m.MenuComponent),
            },
            {
                path: ':id/integration',
                loadComponent: () => import('./pages/integration/integration.component').then(m => m.IntegrationComponent)
            },
            {
                path: ':id/products',
                loadComponent: () => import('./pages/products/products.component').then(m => m.ProductsComponent)
            },
            {
                path: ':id/modifiers',
                loadComponent: () => import('./pages/modifiers/modifiers.component').then(m => m.ModifiersComponent)
            },
            {
                path: ':id/options',
                loadComponent: () => import('./pages/options/options.component').then(m => m.OptionsComponent)
            },
            {
                path: ':id/categories',
                loadComponent: () => import('./pages/categories/categories.component').then(m => m.CategoriesComponent)
            },
            

            // {
            //     path: ':id/branches',
            //     loadComponent: () => import('./pages/branches/branches.component').then(m => m.BranchesComponent)
            // },
            // {
            //     path: ':id/staff',
            //     loadComponent: () => import('./pages/staff/staff.component').then(m => m.StaffComponent)
            // },
            // {
            //     path: ':id/settings',
            //     loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
            // },
            {
                path: ':id',
                redirectTo: ':id/menu',
                pathMatch: 'full'
            }
        ]
    }
] 