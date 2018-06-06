import { BaseService } from './../../../services/base/base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users-registered-in-time-chart',
  templateUrl: './users-registered-in-time-chart.component.html',
  styleUrls: ['./users-registered-in-time-chart.component.css']
})
export class UsersRegisteredInTimeChartComponent implements OnInit {

  private months: NumberOfMonth[];
  public lineChartData: Array<any>;
  public lineChartLabels: Array<any>;
  public lineChartOptions: any;
  public lineChartColors: Array<any>;
  public lineChartLegend: boolean;
  public lineChartType: string;

  constructor(private baseService: BaseService) {  }

  ngOnInit() {
    this.lineChartData = [{data: [], label: ''}];
    this.lineChartLegend = true;
    this.lineChartType = 'line';
    this.lineChartOptions = { responsive: true };
    this.lineChartColors = [{ backgroundColor: '#e8425c', borderColor: '#900020' }];

    this.initMonths();
    this.calculatePerMonth();
  }

  private calculatePerMonth() {
    const datasets = [];
    const linesData: LineChartData = {
      data: [],
      label: 'Nieuwe Gebruikers'
    };

    this.baseService.getAllObjects('users').subscribe(users => {
      for (let index = 0; index < users.length; index++) {
        const element = users[index]['insertedAt'];
        const monthNumber = element.getMonth();
        this.months.find(month => month.number === monthNumber).amount++;
      }
      for (let index = 0; index < this.months.length; index++) {
        const element = this.months[index];
        linesData.data.push(element.amount);
      }
      datasets.push(linesData);
      this.lineChartData = datasets;
    });
  }

  public initMonths() {
    this.months = [];
    const monthChartData = [];
    this.months.push({
      number: 0,
      month: 'Januari',
      amount: 0
    });
    this.months.push({
      number: 1,
      month: 'Februari',
      amount: 0
    });
    this.months.push({
      number: 2,
      month: 'Maart',
      amount: 0
    });
    this.months.push({
      number: 3,
      month: 'April',
      amount: 0
    });
    this.months.push({
      number: 4,
      month: 'Mei',
      amount: 0
    });
    this.months.push({
      number: 5,
      month: 'Juni',
      amount: 0
    });
    this.months.push({
      number: 6,
      month: 'Juli',
      amount: 0
    });
    this.months.push({
      number: 7,
      month: 'Augustus',
      amount: 0
    });
    this.months.push({
      number: 8,
      month: 'September',
      amount: 0
    });
    this.months.push({
      number: 9,
      month: 'Oktober',
      amount: 0
    });
    this.months.push({
      number: 10,
      month: 'November',
      amount: 0
    });
    this.months.push({
      number: 11,
      month: 'December',
      amount: 0
    });

    this.months.forEach(month => {
      monthChartData.push(month.month);
    });
    this.lineChartLabels = monthChartData;
  }
}


interface NumberOfMonth {
  number: number;
  month: string;
  amount: number;
}

interface LineChartData {
  data: number[];
  label: string;
}
