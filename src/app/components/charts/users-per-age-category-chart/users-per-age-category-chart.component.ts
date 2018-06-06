import { element } from 'protractor';
import { BaseService } from './../../../services/base/base.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-users-per-age-category-chart',
  templateUrl: './users-per-age-category-chart.component.html',
  styleUrls: ['./users-per-age-category-chart.component.css']
})
export class UsersPerAgeCategoryChartComponent implements OnInit {
  public doughnutChartLabels: string[] = ['Onderbouw', 'Middenbouw', 'Bovenbouw'];
  public doughnutChartData: number[];
  public colors: any[] = [ { backgroundColor: ['#9999ff', '#4ce7b3', '#ffd56f'], borderColor: 'transparent' } ];
  public doughnutChartType = 'doughnut';

  constructor(private baseService: BaseService, private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
   this.doughnutChartData = [];
   this.calculateAgeGroups();
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  private calculateAgeGroups() {
    let primary = 0;
    let secondary = 0;
    let tertiary = 0;
    const chartData = [];

    const condition = new Date(Date.now()).getFullYear();
    this.baseService.getAllObjects('users').subscribe(users => {
      for (let index = 0; index < users.length; index++) {
        const date = users[index]['birthdate'];

        if ((condition - date.getFullYear()) < 7) {
          primary++;
        } else if ((condition - date.getFullYear()) <= 9) {
          secondary++;
        } else {
          tertiary++;
        }
      }
      chartData.push(primary);
      chartData.push(secondary);
      chartData.push(tertiary);
      this.doughnutChartData = chartData;
    });
  }
}
