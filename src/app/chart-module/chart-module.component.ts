import { Component, OnInit, ViewChild } from '@angular/core';
import { DxChartModule, DxPieChartModule } from 'devextreme-angular';
import { IRRs, TransactionService } from '../service/transaction-grid.service';

@Component({
  selector: 'app-chart-module',
  templateUrl: './chart-module.component.html',
  styleUrls: ['./chart-module.component.scss'],
  providers: [TransactionService]
})
export class ChartModuleComponent implements OnInit {

  @ViewChild(DxChartModule) pivotGrid4: DxChartModule;
  @ViewChild(DxPieChartModule) pivotGrid5: DxPieChartModule;
  resolveOverlappingTypes = ["shift", "hide", "none"];

  irr: IRRs[];
  constructor(service: TransactionService) {
    this.irr = service.getIRR()
  }

  ngOnInit() {
  }

  pointClickHandler(e) {
    this.toggleVisibility(e.target);
  }

  legendClickHandler(e) {
    let arg = e.target,
      item = e.component.getAllSeries()[0].getPointsByArg(arg)[0];

    this.toggleVisibility(item);
  }

  toggleVisibility(item) {
    if(item.isVisible()) {
        item.hide();
    } else { 
        item.show();
    }
}
customizeLabel(arg){
  return arg.originalValue.toFixed(2) + ' %'
};

  customizeTooltip(arg: any) {
    // return {
    //     text: arg.argumentText + ' : ' + arg.originalValue + ' %'
    // };

    return {
      html: "<div><div class='tooltip-header'>" +
        arg.argumentText + "</div>" +
        "<div class='tooltip-body'><div class='series-name'>" +
        arg.argumentText +
        ": </div><div class='value-text'>" +
        arg.originalValue.toFixed(2) + "% </div></div></div>"
    };
  }
}
