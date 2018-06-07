import { BaseService } from './../../../services/base/base.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ratings-chart',
  templateUrl: './ratings-chart.component.html',
  styleUrls: ['./ratings-chart.component.css']
})
export class RatingsChartComponent implements OnInit  {

  constructor(private baseService: BaseService) { }

  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [{
          ticks: {
              autoSkip: false,
              suggestedMin: 0,
              suggestedMax: 45
          }
      }],
      xAxes: [{
        ticks: {
            autoSkip: false,
            suggestedMin: 0
        }
    }]
  }
  };

  public barChartLabels: string[] = [];
  public barChartType = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    {data: [], label: 'Aantal keren gewaardeerd'}
  ];

  ngOnInit() {
  this.barChartLabels = [];
  const data = [];

    this.baseService.getSortedObjects('locations', 'rating', false, 10).subscribe(objects => {
      for (let index = 0; index < objects.length; index++) {
        const element = objects[index];
        this.barChartLabels.push(element['name']);
        data.push(element['rating']);
      }
      const clone = JSON.parse(JSON.stringify(this.barChartData));
      clone[0].data = data;
      this.barChartData = clone;
    });
  }
}
