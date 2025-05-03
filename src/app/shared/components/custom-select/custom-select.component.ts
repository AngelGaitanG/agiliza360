import { Component, Input, Output, EventEmitter, signal, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomSelectOption } from './custom-select.types';

@Component({
  selector: 'app-custom-select',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-select.component.html',
  styleUrls: ['./custom-select.component.scss']
})
export class CustomSelectComponent implements OnInit, AfterViewInit {
  @Input() label = 'Seleccionar';
  @Input() options: CustomSelectOption[] = [];
  @Input() selected: string | null = null; // valor seleccionado por defecto (value)
  @Output() optionSelected = new EventEmitter<CustomSelectOption>();

  @ViewChild('selectMenu') selectMenu!: ElementRef;
  @ViewChild('selectButton') selectButton!: ElementRef;

  isOpen = signal(false);
  selectedOption = signal<CustomSelectOption | null>(null);
  menuPosition = signal<'bottom' | 'top'>('bottom');

  ngOnInit(): void {
    if (this.selected && this.options.length) {
      const found = this.options.find(opt => opt.value === this.selected) ?? null;
      this.selectedOption.set(found);
    }
  }

  ngAfterViewInit(): void {
    this.updateMenuPosition();
  }

  get displayLabel(): string {
    return this.selectedOption()?.label ?? this.label;
  }

  toggleMenu(): void {
    this.isOpen.update(open => !open);
    if (this.isOpen()) {
      setTimeout(() => this.updateMenuPosition(), 0);
    }
  }

  updateMenuPosition(): void {
    if (!this.selectMenu?.nativeElement || !this.selectButton?.nativeElement) return;

    const buttonRect = this.selectButton.nativeElement.getBoundingClientRect();
    const menuRect = this.selectMenu.nativeElement.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - buttonRect.bottom;
    const spaceAbove = buttonRect.top;
    const menuHeight = menuRect.height;

    // Si hay más espacio abajo que arriba y hay suficiente espacio abajo, o si no hay suficiente espacio arriba
    if ((spaceBelow > spaceAbove && spaceBelow >= menuHeight) || spaceAbove < menuHeight) {
      this.menuPosition.set('bottom');
    } else {
      this.menuPosition.set('top');
    }
  }

  selectOption(option: CustomSelectOption): void {
    if (!option.disabled) {
      this.selectedOption.set(option);
      this.optionSelected.emit(option);
      this.isOpen.set(false);
    }
  }
}