import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface NotificationState {
  show: boolean;
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notificationState = new BehaviorSubject<NotificationState>({
    show: false,
    message: '',
    type: 'success'
  });

  notification$ = this.notificationState.asObservable();

  showNotification(message: string, type: 'success' | 'error' = 'success', duration: number = 3000) {
    this.notificationState.next({
      show: true,
      message,
      type
    });

    setTimeout(() => {
      this.notificationState.next({
        show: false,
        message: '',
        type: 'success'
      });
    }, duration);
  }
} 