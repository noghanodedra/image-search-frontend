import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';
import { ImageSearchService } from '../../services/image-search.service';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-image-details',
  templateUrl: './image-details.component.html',
  styleUrls: ['./image-details.component.scss'],
})
export class ImageDetailsComponent implements OnInit {
  searchText: string;
  @Input() groupFilters: Object;
  @Input() searchByKeyword: string;
  records: any = [];
  searchFilterValues: any = {};
  currPage = 0;
  noRecords = false;
  loading = false;
  HTTP_NO_CONTENT = 204;

  constructor(
    private imageSearchService: ImageSearchService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadImageDetails();
  }

  onSearch(event): void {
    this.searchFilterValues = event;
    this.currPage = 0;
    this.records = [];
    this.loadImageDetails();
  }

  onLoadMore(event): void {
    this.currPage++;
    this.loadImageDetails();
  }

  loadImageDetails(): void {
    this.loading = true;
    this.noRecords = false;
    this.imageSearchService
      .search(
        this.currPage,
        this.searchFilterValues.description,
        this.searchFilterValues.fileType,
        this.searchFilterValues.fileSize
      )
      .subscribe((res) => {
        if (res && res.status === this.HTTP_NO_CONTENT) {
          this.noRecords = true;
        } else {
          if (res.body) {
            this.records.push(...res.body);
          }
        }
        this.loading = false;
      });
  }
}
