import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-input-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="error-icon" *ngIf="show" (click)="toggleMessage()">
      <i class="fas fa-exclamation"></i>
      <div class="error-message" *ngIf="isMessageVisible">
        <div class="error-content">
          <span>{{ message }}</span>
        </div>
        <div class="error-arrow"></div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      position: absolute;
      top: 50%;
      right: -30px;
      transform: translateY(-50%);
      z-index: 1000;
    }

    .error-icon {
      width: 20px;
      height: 20px;
      background-color: rgba(199, 44, 65, 0.7);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      position: relative;
      transition: all 0.3s ease;
      
      &:hover {
        transform: scale(1.1);
        box-shadow: 0 0 10px rgba(199, 44, 65, 0.3);
      }

      i {
        color: white;
        font-size: 12px;
      }
    }

    .error-message {
      position: absolute;
      top: 50%;
      right: calc(100% + 10px);
      transform: translateY(-50%);
      background-color: rgba(199, 44, 65, 0.7);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      font-size: 0.775rem;
      font-weight: 200;
      animation: fadeIn 0.2s ease;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      width: max-content;
      max-width: 400px;
      z-index: 1000;
    }

    .error-content {
      display: flex;
      align-items: flex-start;
      white-space: normal;
      word-wrap: break-word;
      line-height: 1.4;
    }

    .error-arrow {
      position: absolute;
      top: 50%;
      right: -6px;
      transform: translateY(-50%);
      width: 0;
      height: 0;
      border-top: 6px solid transparent;
      border-bottom: 6px solid transparent;
      border-left: 6px solid rgba(199, 44, 65, 0.7);
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translate(-10px, -50%);
      }
      to {
        opacity: 1;
        transform: translate(0, -50%);
      }
    }
  `]
})
export class InputErrorComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  isMessageVisible: boolean = false;

  toggleMessage() {
    this.isMessageVisible = !this.isMessageVisible;
  }
} 