import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

/**
 * The root component of the application.
 * Manages the main layout, including a sidebar for navigation.
 */
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MatSidenavModule, MatListModule, RouterModule, NgIf],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  /** The title of the application. */
  title = 'personalplanung-tool';

  /** Controls the open/closed state of the sidebar. */
  isSidebarOpen = true;

  /** Toggles the sidebar's open/closed state. */
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}

