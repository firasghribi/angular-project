import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

/**
 * Represents the navigation component of the application.
 */
@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  /**
   * An array of navigation items.
   */
  navigationItems: { name: string; href: string; }[];

  constructor() {
    this.navigationItems = [
      { name: 'Users', href: 'users' },
      { name: 'Products', href: 'products' }
    ];
  }
}
