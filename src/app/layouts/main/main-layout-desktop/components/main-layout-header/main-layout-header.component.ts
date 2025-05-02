import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-main-layout-header',
  templateUrl: './main-layout-header.component.html',
  styleUrls: ['./main-layout-header.component.scss'],
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class MainLayoutHeaderComponent {
  searchQuery: string = '';

  onSearch(): void {
    // Aquí implementaremos la lógica de búsqueda
    console.log('Buscando:', this.searchQuery);
  }
}
