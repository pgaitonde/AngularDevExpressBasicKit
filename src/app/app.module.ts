import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DrawerComponent } from './drawer/drawer.component'
import { NavMenuComponent } from './nav-menu/nav-menu.component'
import { NotfoundComponent } from './notfound/notfound.component';
import { BroadcasterService } from './shared/services/broadcaster/broadcaster.service';
import { GlobalAccessService } from './shared/services/global-access/global-access.service';
import { HttpMenuItemService } from './shared/services/http/menu-item/http-menu-item.service';
import { EnvironmentService } from '../environments/environment';
import { MaterialDesignModule } from '../app/material-design/material-design.module'
import { HttpClientModule } from '@angular/common/http';
import { PositionDashboardComponent } from './position-dashboard/position-dashboard.component';
import { PositionGridComponent } from './position-grid/position-grid.component';
import { TransactionGridComponent } from './transaction-grid/transaction-grid.component';
import { DxPivotGridModule, DxPivotGridComponent, DxChartModule, DxChartComponent, DxTemplateModule,DxSelectBoxModule,
  DxPopupModule, DxDataGridModule, DxBulletModule, DxPieChartModule} from 'devextreme-angular';
import { ChartModuleComponent } from './chart-module/chart-module.component';
import { MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule } from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';

@NgModule({
  declarations: [
    AppComponent,
    NotfoundComponent,
    DrawerComponent,
    NavMenuComponent,
    PositionDashboardComponent,
    PositionGridComponent,
    TransactionGridComponent,
    ChartModuleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialDesignModule,
    HttpClientModule,
    DxPivotGridModule,
    DxChartModule,
    DxTemplateModule,
    DxPopupModule,
    DxDataGridModule,
    DxBulletModule,
    DxSelectBoxModule,
    DxPieChartModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [
    BroadcasterService,
    GlobalAccessService,
    HttpMenuItemService,
    EnvironmentService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
