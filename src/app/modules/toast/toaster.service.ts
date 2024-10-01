import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ToasterService {
  private toasts: { message: string; type: string; duration: number }[] = [];
  private toastSubject = new Subject<{ message: string; type: string; duration: number }[]>();

  toastState$ = this.toastSubject.asObservable();

  showToast(message: string, type: string = '', duration: number = 3000) { // Duration optional
    const newToast = { message, type, duration };
    this.toasts.push(newToast);
    this.toastSubject.next(this.toasts);

    // Automatically remove the toast after the specified duration
    setTimeout(() => {
      this.toasts = this.toasts.filter(toast => toast !== newToast);
      this.toastSubject.next(this.toasts);
    }, duration);
  }
}
