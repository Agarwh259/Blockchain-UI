import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  showloading: boolean = false;

   // Doughnut
   public doughnutChartLabels:string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
   public doughnutChartData:number[] = [350, 450, 100];
   public doughnutChartData1:number[] = [450, 700];
   public doughnutChartData2:number[] = [350, 700];
   
   
   public doughnutChartType:string = 'doughnut';
  
   // events
   public chartClicked(e:any):void {
     console.log(e);
   }
  
   public chartHovered(e:any):void {
     console.log(e);
   }

  public AnimationBarOption;

  constructor() { }

  ngOnInit() {
  }
}
