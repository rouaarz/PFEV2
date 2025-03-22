import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChartsubscribersComponent } from './chartsubscribers/chartsubscribers.component';

const routes: Routes = [
  {path:'',component:ChartsubscribersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsubscribersRoutingModule { }
