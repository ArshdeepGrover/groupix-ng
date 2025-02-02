import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ApexCharts from 'apexcharts';
import { IBillShareWithSum } from 'src/app/models/bill-shared.model';
import { IBillGraph } from 'src/app/models/bill.model';
import { BillsService } from 'src/app/services/bills.service';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss'],
})
export class GroupDashboardComponent implements OnInit, OnDestroy {
  group_id!: number;
  bills!: IBillGraph[];
  currency: any;
  isLoading = true;
  chart: any;
  billShareWithSum!: IBillShareWithSum;
  amountYouOwe: number = 0;
  amountYouLent: number = 0;

  constructor(
    private billService: BillsService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.parent?.params.subscribe((params) => {
      this.group_id = Number(params['id']);
      this.getBills();
      this.getShareBills();
      this.getAmountYouOwe();
      this.getAmountYouLent();
    });
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }

  getBills() {
    this.billService
      .indexForGraph(this.group_id)
      .subscribe((res: IBillGraph[]) => {
        this.bills = res;
        this.generateGraphData();
      });
  }

  generateGraphData() {
    this.isLoading = false;
    const options = {
      chart: {
        height: '100%',
        maxWidth: '100%',
        type: 'area',
        fontFamily: 'Inter, sans-serif',
        dropShadow: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      },
      tooltip: {
        enabled: true,
        x: {
          show: false,
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          opacityFrom: 0.55,
          opacityTo: 0,
          shade: '#a06fdd',
          gradientToColors: ['#a06fdd'],
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 6,
      },
      grid: {
        show: false,
        strokeDashArray: 4,
        padding: {
          left: 2,
          right: 2,
          top: 0,
        },
      },
      series: [
        {
          name: 'Expense Amount',
          data: this.bills.map((bill) => bill.total_amount),
          color: '#a06fdd',
        },
      ],
      xaxis: {
        categories: this.bills.map((bill) => bill.date),
        labels: {
          show: false,
        },
        axisBorder: {
          show: true,
        },
        axisTicks: {
          show: true,
        },
      },
      yaxis: {
        show: false,
      },
    };
    if (
      document.getElementById('area-chart') &&
      typeof ApexCharts !== 'undefined' &&
      !this.isLoading
    ) {
      this.chart = new ApexCharts(
        document.getElementById('area-chart'),
        options
      );
      this.chart.render();
    }
  }

  getShareBills() {
    this.billService
      .getSharedBillsWithSum(this.group_id)
      .subscribe((res: IBillShareWithSum) => {
        this.billShareWithSum = res;
      });
  }
  getAmountYouOwe() {
    this.billService.getAmountYouOwe(this.group_id).subscribe((res) => {
      this.amountYouOwe = res;
    });
  }
  getAmountYouLent() {
    this.billService.getAmountYouLent(this.group_id).subscribe((res) => {
      this.amountYouLent = res;
    });
  }
}
