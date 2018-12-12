import { NgModule, Component, enableProdMode, OnInit, ViewChild } from '@angular/core';
import { formatDate } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { DxChartComponent, DxDataGridComponent, DxPieChartModule, DxChartModule } from 'devextreme-angular';
import { CashFlows, TransactionService } from '../service/transaction-grid.service';

if (!/localhost/.test(document.location.host)) {
  enableProdMode();
}

@Component({
  selector: 'app-transaction-grid',
  templateUrl: './transaction-grid.component.html',
  styleUrls: ['./transaction-grid.component.css'],
  providers: [TransactionService]
})
export class TransactionGridComponent implements OnInit {



  @ViewChild(DxDataGridComponent) pivotGrid2: DxDataGridComponent;

  cashflows: CashFlows[];

  saleAmountHeaderFilter: any;
  applyFilterTypes: any;
  currentFilter: any;
  showFilterRow: boolean;
  showHeaderFilter: boolean;
  columnResizingMode: string;
  resizingModes: string[] = ["nextColumn", "widget"];

  constructor(service: TransactionService) {
    this.cashflows = service.getCashflows()

    this.showFilterRow = true;
    this.showHeaderFilter = true;
    this.columnResizingMode = this.resizingModes[1];
  }

  ngOnInit() {
  }

  onFileSave(e) {
    e.fileName = "Transactions " + formatDate(new Date(), "MM-dd-yyyy hh:mm:ss a", 'en-US');
  }

  hello(e) {
    this.showFilterRow = false;
  }

  highlightCell(e) {
    if (e.row.rowType === "data") {
      if (e.column.dataField === "IRR" || e.column.dataField === "Cash Flow Amount") {
        if (e.value >= 0) {
          e.cellElement.style.color = 'green'
        } else {
          e.cellElement.style.color = 'red'
        }
      }
    }
  }

  onContextMenu(e) {
    if (e.row.rowType === "data") {
      e.items = [{
        text: "View Underling Data",
        onItemClick: this.hello(e)
      },
      {
        text: "View Dependencies"
      }];
    }
  }



}
