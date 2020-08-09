import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { ImageDetailsRoutingModule } from './image-details-routing.module';
import { ImageDetailsComponent } from './image-details.component';
import { ListComponent } from './list/list.component';
import { SearchBarComponent } from './search-bar/search-bar.component';

@NgModule({
  declarations: [ImageDetailsComponent, ListComponent, SearchBarComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ImageDetailsRoutingModule,
    InfiniteScrollModule,
  ],
  exports: [ImageDetailsComponent, ListComponent, SearchBarComponent],
})
export class ImageDetailsModule {}
