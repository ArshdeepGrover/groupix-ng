import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html',
  styleUrls: ['./toaster.component.scss']
})
export class ToasterComponent implements OnInit {
  @Input() message: string = '';
  @Input() type:string = '';
  @Input() duration: number = 3000;
  @Input() index!: number;
  visible: boolean = false;

  private toastHeight: number = 80; // Adjust this if the toasts have different height

  constructor() {}

  ngOnInit(): void {
    this.visible = true;
   this.setDuration();
  }

  setDuration() {
    setTimeout(() => {
      this.visible = false;
    }, this.duration);
  }

  get toastClass() {
    switch (this.type) {
      case 'success':
        return 'text-green-800 border-t-4 border-green-300 bg-green-50 dark:text-green-400 dark:bg-gray-800 dark:border-green-800';
      case 'warning':
        return 'text-yellow-800 border-t-4 border-yellow-300 bg-yellow-50 dark:text-yellow-300 dark:bg-gray-800 dark:border-yellow-800';
      case 'error':
        return 'text-red-800 border-t-4 border-red-300 bg-red-50 dark:text-red-400 dark:bg-gray-800 dark:border-red-800';
      default:
        return 'text-blue-800 border-t-4 border-blue-300 bg-blue-50 dark:text-blue-400 dark:bg-gray-800 dark:border-blue-800';
    }
  }

  get toastPosition() {
    return {
      top: `${this.index * this.toastHeight + 112}px`,  // Space each toast based on index
      zIndex: 1000 - this.index // Ensure the most recent toast is always on top
    };
  }
}
