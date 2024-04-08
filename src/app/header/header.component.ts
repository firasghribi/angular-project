import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

/**
 * Represents the HeaderComponent of the application.
 */
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  /**
   * Represents the current URL of the application.
   */
  currentUrl: string | undefined;

  constructor(private router: Router) {
    // get full url
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl = event.url.slice(1)
        this.currentUrl = this.currentUrl.charAt(0).toUpperCase() + this.currentUrl.slice(1);
      }
    });
  }
}