import { Component, OnInit } from '@angular/core';
import { resolve } from 'path';

@Component({
  selector: 'app-ratings-chart',
  templateUrl: './ratings-chart.component.html',
  styleUrls: ['./ratings-chart.component.css']
})
export class RatingsChartComponent implements OnInit {

  public selectedType = 'locations';
  public selectedChart = 'doughnut';
  public selectedSorting = 'high';
  public selectedAmount = '10';

  public displayChart = false;

  public chartOptions: any;
  public chartLabels: string[];
  public chartType: string;
  public chartLegend: boolean;
  public chartData: Array<any>;

  public once: boolean;

  constructor() { }

  ngOnInit() {
    this.once = true;
  }

  public clearChart(): Promise<any> {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      this.displayChart = false;
      this.chartData = [];
      this.chartLabels = [];
      this.chartLegend = false;
      this.chartOptions = {};
      this.chartType = '';
      resolve('true');
    });
  }

  public generateChart() {
    this.clearChart().then(result => {
      this.once = true;
      this.chartLabels = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
      this.chartType = this.selectedChart;
      this.chartLegend = true;
      if (this.once) {
        this.chartData = [
          {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
          {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'}
        ];
        this.once = false;
      } else {
        this.chartData = [
          {data: [0], label: 'Series C'}
        ];
      }
      this.chartOptions = {
        scaleShowVerticalLines: false,
        responsive: true
      };

      this.displayChart = true;
    });
  }

  //Bar-chart
  //search function --> result = thing to search for --> mat-select pre-filled options?

}
