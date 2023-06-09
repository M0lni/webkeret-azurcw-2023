import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FoglalasComponent } from './foglalas.component';

const routes: Routes = [
  { path: '', component: FoglalasComponent },
  { path: 'successful', loadChildren: () => import('./successful/successful.module').then(m => m.SuccessfulModule) }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FoglalasRoutingModule { }
