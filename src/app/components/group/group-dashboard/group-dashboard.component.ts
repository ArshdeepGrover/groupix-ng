import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as ApexCharts from 'apexcharts';
import { IBill, IBillGraph } from 'src/app/models/bill.model';
import { IGroup } from 'src/app/models/group.model';
import { BillsService } from 'src/app/services/bills.service';
import {
  Countries,
  ICountyDetails,
} from 'src/app/store/countries-details.store';

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.scss'],
})
export class GroupDashboardComponent implements OnInit, OnDestroy {
  group_id!: number;
  bills!: IBillGraph[];
  countryDetails = Countries;
  currency: any;
  isLoading = true;
  chart: any;
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
}
