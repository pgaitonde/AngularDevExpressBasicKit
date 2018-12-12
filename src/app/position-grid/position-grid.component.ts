import { NgModule, Component, ViewChild, AfterViewInit, enableProdMode, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxPivotGridModule,
         DxPivotGridComponent,
         DxChartModule,
         DxChartComponent, 
         DxDataGridComponent} from 'devextreme-angular';

import { Service } from '../service/service.service';

if(!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-position-grid',
  templateUrl: './position-grid.component.html',
  styleUrls: ['./position-grid.component.css']
})
export class PositionGridComponent implements AfterViewInit {
  @ViewChild(DxPivotGridComponent) pivotGrid: DxPivotGridComponent;
  //@ViewChild(DxChartComponent) chart: DxChartComponent;
  @ViewChild("drillDownDataGrid") drillDownDataGrid: DxDataGridComponent;

  @Output() addTab = new EventEmitter();
  
  pivotGridDataSource: any;
  drillDownDataSource: any;
  salesPopupVisible = false;
  salesPopupTitle = "";
  constructor(service: Service) {
    this.customizeTooltip = this.customizeTooltip.bind(this);

    this.pivotGridDataSource = {
      fields: [{
        caption: "Region",
        width: 120,
        dataField: "region",
        area: "row",
        sortBySummaryField: "Total"
      }, {
        caption: "City",
        dataField: "city",
        width: 150,
        area: "row"
      }, {
        dataField: "date",
        dataType: "date",
        area: "column"
      }, {
        groupName: "date",
        groupInterval: "month",
        visible: false
      }, {
        caption: "Total",
        dataField: "amount",
        dataType: "number",
        summaryType: "sum",
        format: "currency",
        area: "data"
      }],
      store: service.getSales()
    }


    
  }

  ngAfterViewInit() {

    setTimeout(() => {
        var dataSource = this.pivotGrid.instance.getDataSource();
        // dataSource.expandHeaderItem('row', ['North America']);
        // dataSource.expandHeaderItem('column', [2013]);
    }, 0);
  }

  customizeTooltip(args) {
    return {
      html: args.seriesName + " | Total<div class='currency'>" + args.valueText + "</div>"
    };
  }

  onPivotCellClick($event){
    let obj = {
      name : "Transactions",
      isActive : true
    }

    //this.addTab.emit(obj);
  }
}