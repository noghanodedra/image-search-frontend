import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ImageDetailsComponent } from './image-details.component';

const routes: Routes = [{ path: '', component: ImageDetailsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImageDetailsRoutingModule { }
