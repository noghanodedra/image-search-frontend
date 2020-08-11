import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';

import { ImageSearchService } from '../../services/image-search.service';

@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss'],
})
export class ImageDetailsComponent implements OnInit {
  searchText: string;
  // tslint:disable-next-line: ban-types
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  records: any = [];
  searchFilterValues: any = {};
  currPage = 0;
  noRecords = false;
  loading = false;
  serverError = false;

  constructor(
    private imageSearchService: ImageSearchService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadImageDetails();
  }

  onSearch(event: any): void {
    this.searchFilterValues = event;
    this.currPage = 0;
    this.records = [];
    this.loadImageDetails();
  }

  onLoadMore(event: any): void {
    this.currPage++;
    this.loadImageDetails();
  }

  loadImageDetails(): void {
    this.loading = true;
    this.noRecords = false;
    this.serverError = false;
    this.imageSearchService
      .search(
        this.currPage,
        this.searchFilterValues.description,
        this.searchFilterValues.fileType,
        this.searchFilterValues.fileSize
      )
      .subscribe(
        (res) => {
          if (!res) {
            this.noRecords = true;
          } else {
            this.records.push(...res);
          }
          this.loading = false;
        },
        (err: Error) => {
          this.serverError = true;
          this.loading = false;
        }
      );
  }
}
