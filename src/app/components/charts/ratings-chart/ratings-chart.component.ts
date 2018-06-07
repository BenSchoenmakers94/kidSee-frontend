import { BaseService } from './../../../services/base/base.service';
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
  public selectedSorting = 'true';
  public selectedAmount = '10';

  public displayChart = false;

  public chartOptions: any;
  public chartLabels: string[];
  public chartType: string;
  public chartLegend: boolean;
  public chartData: Array<any>;

  public once: boolean;

  constructor(private baseService: BaseService) { }

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
    const asc = this.selectedSorting === 'true' ? true : false;
    this.clearChart().then(result => {
      this.baseService.getFilteredAndSortedObjects(
        this.selectedType,
        'rating-count',
        this.selectedType,
      'rating',
      asc,
      +this.selectedAmount).subscribe(ratingObjects => {
        for (let index = 0; index < ratingObjects.length; index++) {
          const element = ratingObjects[index];
          this.baseService.getObjectFromId(element['objectId'], element['objectType'].concat('s')).subscribe(resultingObject => {

          });
        }
      });
      this.displayChart = true;
    });
  }

  //Bar-chart
  //search function --> result = thing to search for --> mat-select pre-filled options?

}
