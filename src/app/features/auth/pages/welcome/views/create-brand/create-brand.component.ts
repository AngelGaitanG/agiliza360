import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-brand',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent {
  @Output() close = new EventEmitter<void>();

  goBack(): void {
    this.close.emit();
  }
}

