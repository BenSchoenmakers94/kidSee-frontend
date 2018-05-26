import { BaseService } from './../../services/base/base.service';
import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSelect } from '@angular/material';
import { Subject } from 'rxjs/Subject';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { takeUntil, take } from 'rxjs/operators';
import { BaseModel } from '../../models/baseModel';

@Component({
  selector: 'app-mat-select-wrapper',
  templateUrl: './mat-select-wrapper.component.html',
  styleUrls: ['./mat-select-wrapper.component.css']
})
export class MatSelectWrapperComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() primaryObject: BaseModel;

  @Input() objectType: string;

  /** control for the selected bank */
  public bankCtrl: FormControl = new FormControl();

   /** control for the MatSelect filter keyword */
  public bankFilterCtrl: FormControl = new FormControl();

    /** control for the selected bank for multi-selection */
  public bankMultiCtrl: FormControl = new FormControl();

   /** control for the MatSelect filter keyword multi-selection */
  public bankMultiFilterCtrl: FormControl = new FormControl();

  /** list of banks */
  private banks: BaseModel[];

  /** list of banks filtered by search keyword */
  public filteredBanks: ReplaySubject<BaseModel[]> = new ReplaySubject<BaseModel[]>(1);

  /** list of banks filtered by search keyword for multi-selection */
  public filteredBanksMulti: ReplaySubject<BaseModel[]> = new ReplaySubject<BaseModel[]>(1);

  /** Subject that emits when the component has been destroyed. */
  private _onDestroy = new Subject<void>();

  constructor(
    private baseService: BaseService
  ) { }

  ngOnInit() {
    this.baseService.getAllObjects(this.objectType).subscribe(objects => {
      this.banks = objects;
      // set initial selection
    this.bankCtrl.setValue(this.banks[10]);

    // load the initial bank list
    this.filteredBanks.next(this.banks.slice());
    this.filteredBanksMulti.next(this.banks.slice());

    // listen for search field value changes
    this.bankFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanks();
      });
    this.bankMultiFilterCtrl.valueChanges
      .pipe(takeUntil(this._onDestroy))
      .subscribe(() => {
        this.filterBanksMulti();
      });

    });
  }

  ngAfterViewInit() { }

  ngOnDestroy() {
    this._onDestroy.next();
    this._onDestroy.complete();
  }

  private filterBanks() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankFilterCtrl.value;
    if (!search) {
      this.filteredBanks.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanks.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }

  private filterBanksMulti() {
    if (!this.banks) {
      return;
    }
    // get the search keyword
    let search = this.bankMultiFilterCtrl.value;
    if (!search) {
      this.filteredBanksMulti.next(this.banks.slice());
      return;
    } else {
      search = search.toLowerCase();
    }
    // filter the banks
    this.filteredBanksMulti.next(
      this.banks.filter(bank => bank.name.toLowerCase().indexOf(search) > -1)
    );
  }
}
