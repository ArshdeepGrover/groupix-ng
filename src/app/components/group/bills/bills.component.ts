import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBill } from 'src/app/models/bill.model';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
  styleUrls: ['./bills.component.scss'],
})
export class BillsComponent implements OnInit {
  group_id!: number;
  bills!: IBill[];
  constructor(
    private billService: BillsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.group_id = Number(params['id']);
      this.getBills();
    });
  }
  getBills() {
    this.billService.index(this.group_id).subscribe((res) => {
      this.bills = res;
    });
  }
}
