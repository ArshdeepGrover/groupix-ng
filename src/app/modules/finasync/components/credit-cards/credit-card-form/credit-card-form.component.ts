import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ECardType } from 'src/app/modules/finasync/models/credit-card.model';
import { CreditCardService } from 'src/app/modules/finasync/services/credit-card.service';
import { bank_names } from 'src/app/modules/finasync/stores/bank-names-list.store';

@Component({
  selector: 'app-credit-card-form',
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.scss'],
})
export class CreditCardFormComponent implements OnInit {
  creditCardForm: FormGroup;
  isUpdateMode = false;
  cardUuid!: string;
  bankNames = bank_names;
  ECardType = ECardType;

  constructor(
    private fb: FormBuilder,
    private creditCardService: CreditCardService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.creditCardForm = this.fb.group({
      card_holder_name: ['', Validators.required],
      card_nickname: [''],
      card_number: [
        '',
        [Validators.required, Validators.pattern(/^\d{4}-\d{4}-\d{4}-\d{4}$/)],
      ],
      bank_name: ['', Validators.required],
      card_type: [ECardType.VISA, Validators.required],
      expiry_date: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern(/^\d{3}$/)]],
      limit: ['', Validators.required],
      balance: ['', Validators.required],
      status: ['active', Validators.required],
      is_primary: [false],
    });
  }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['id']) {
        this.isUpdateMode = true;
        this.cardUuid = params['id'];
        this.loadCreditCardDetails(this.cardUuid);
      }
    });
  }

  loadCreditCardDetails(uuid: string) {
    this.creditCardService.show(uuid).subscribe((card) => {
      this.creditCardForm.patchValue(card);
    });
  }

  onSubmit() {
    if (this.creditCardForm.invalid) {
      this.creditCardForm.markAllAsTouched(); // Show all errors
      return;
    }

    if (this.isUpdateMode) {
      this.creditCardService
        .update(this.cardUuid, this.creditCardForm.value)
        .subscribe((card) => {
          this.router.navigate(['/credit-cards']);
        });
    } else {
      this.creditCardService
        .create(this.creditCardForm.value)
        .subscribe((card) => {
          this.router.navigate(['/credit-cards']);
        });
    }
  }

  formatExpiryDate(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters
    if (value.length > 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }

    // Ensure month is valid (01-12)
    const [month, year] = value.split('/');
    if (month && parseInt(month) > 12) {
      value = '12/' + (year || '');
    }

    event.target.value = value;
  }

  formatCreditCardNumber(event: any) {
    let value = event.target.value.replace(/\D/g, ''); // Remove non-numeric characters

    // Ensure the value is no longer than 16 digits
    if (value.length > 16) {
      value = value.slice(0, 16);
    }

    // Auto-insert dashes every 4 digits
    const formattedValue =
      value
        .match(/.{1,4}/g) // Group digits into sets of 4
        ?.join('-') || '';

    event.target.value = formattedValue;

    // Update the form control value
    this.creditCardForm.controls['card_number'].setValue(formattedValue, {
      emitEvent: false, // Prevent infinite loop
    });
  }
}
