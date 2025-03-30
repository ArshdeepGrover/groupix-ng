import { Component } from '@angular/core';
import { ICreditCard } from 'src/app/modules/finasync/models/credit-card.model';
import { CreditCardService } from 'src/app/modules/finasync/services/credit-card.service';
import { ToasterService } from 'src/app/modules/toast/toaster.service';
import { faTrash, faStar, faEdit } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-credit-card-list',
  templateUrl: './credit-card-list.component.html',
  styleUrls: ['./credit-card-list.component.scss'],
})
export class CreditCardListComponent {
  creditCards: ICreditCard[] = [];
  loading = true;
  icons = {
    faTrash,
    faStar,
    faEdit,
  };
  constructor(
    private creditCardService: CreditCardService,
    private toastrService: ToasterService
  ) {}

  ngOnInit(): void {
    this.getCreditCards();
  }

  // Fetch all credit cards
  getCreditCards(): void {
    this.creditCardService.index().subscribe((data) => {
      this.creditCards = data;
      this.loading = false;
    });
  }

  // Add new credit card
  addCreditCard(card: ICreditCard): void {
    this.creditCardService.create(card).subscribe(
      (data) => {
        if (data) {
          this.creditCards.push(data);
          this.toastrService.showToast('Credit card added', 'success');
        }
      },
      () => this.toastrService.showToast('Failed to add credit card', 'danger')
    );
  }

  // Update existing credit card
  updateCreditCard(card: ICreditCard): void {
    if (!card.uuid) return;
    this.creditCardService.update(card.uuid, card).subscribe(
      (data) => {
        this.toastrService.showToast('Credit card updated', 'success');
        const findIndex = this.creditCards.findIndex(
          (c) => c.uuid === card.uuid
        );
        this.creditCards[findIndex] = data;
      },
      () =>
        this.toastrService.showToast('Failed to update credit card', 'danger')
    );
  }

  // Delete credit card
  deleteCreditCard(uuid: string) {
    this.creditCardService.delete(uuid).subscribe(
      (data) => {
        if (data) {
          this.creditCards = this.creditCards.filter((c) => c.uuid !== uuid);
          this.toastrService.showToast('Credit card deleted', 'success');
        }
      },
      () =>
        this.toastrService.showToast('Failed to delete credit card', 'danger')
    );
  }

  // Set primary credit card
  setPrimary(uuid: string): void {
    this.creditCardService.setPrimary(uuid).subscribe((data) => {
      if (data) {
        this.creditCards = this.creditCards.map((c) => {
          c.is_primary = c.uuid === uuid;
          return c;
        });
        this.toastrService.showToast('Primary credit card updated', 'success');
      }
    });
  }
}
