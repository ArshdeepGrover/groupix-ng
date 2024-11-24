import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IBillShare } from 'src/app/models/bill-shared.model';
import { IBill } from 'src/app/models/bill.model';
import { IGroup } from 'src/app/models/group.model';
import { BillsService } from 'src/app/services/bills.service';
import { GroupsService } from 'src/app/services/groups.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
  group_id!: number;
  group!: IGroup;
  bills!: IBill[];
  billsShare!: IBillShare[];
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((res: any) => {
      this.group = res.group;
    });
  }
}
