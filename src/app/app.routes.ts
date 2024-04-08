import { Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { ProductsComponent } from './products/products.component';

/**
 * Defines the routes for the application.
 */
export const routes: Routes = [
    /**
     * Redirects to the 'users' path when the root path is accessed.
     */
    { path: '', redirectTo: 'users', pathMatch: 'full' },
    
    /**
     * Represents the route for the 'users' component.
     */
    { path: 'users', component: UsersComponent },
    
    /**
     * Represents the route for the 'products' component.
     */
    { path: 'products', component: ProductsComponent },
]

