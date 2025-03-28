// Import-Anweisungen für Angular-Kernfunktionalität und Angular Material-Komponenten
import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'; // Modul für Sidebar-Funktionalität
import { MatListModule } from '@angular/material/list'; // Modul für Navigationslisten
import { RouterModule } from '@angular/router'; // Modul für Routing-Funktionalität
import { NgIf } from '@angular/common';  // Direktive für konditionale Darstellung von Elementen

// Deklaration der Haupt-Komponente der Anwendung
@Component({
  selector: 'app-root', // HTML-Tag zur Nutzung der Komponente
  standalone: true, // Eigenständige Komponente ohne Modul
  imports: [MatSidenavModule, MatListModule, RouterModule, NgIf], // Importierte Module und Direktiven
  templateUrl: './app.component.html', // Verweis auf die zugehörige HTML-Datei
  styleUrls: ['./app.component.scss'] // Verweis auf die zugehörige SCSS-Datei
})

export class AppComponent {
  
  // Titel der Anwendung (kann dynamisch genutzt werden)
  title = 'personalplanung-tool';

  // Status, ob die Sidebar geöffnet (true) oder geschlossen (false) ist
  isSidebarOpen = true;

  // Methode zum Umschalten (Ein-/Ausklappen) der Sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen; // Umkehrung des aktuellen Zustands der Sidebar
  }
}

