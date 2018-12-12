import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-dashboard',
  templateUrl: './position-dashboard.component.html',
  styleUrls: ['./position-dashboard.component.css']
})
export class PositionDashboardComponent implements OnInit {
  selectedIndex = 0;
  private tabData:any = [];
  constructor() { }

  ngOnInit() {
    this.tabData.push(  {
      name : "Transactions",
      isActive : true
    },{
      name : "Positions",
      isActive : false
    }
   );
  }
  onAddTab($event){
    if($event.isActive){
      this.tabData.push($event);
      this.selectedIndex = this.tabData.length-1;      
    }  
  }
}
