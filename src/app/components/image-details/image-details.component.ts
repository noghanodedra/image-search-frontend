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
  serverError = false;

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
    this.serverError = false;
    this.imageSearchService
      .search(
        this.currPage,
        this.searchFilterValues.description,
        this.searchFilterValues.fileType,
        this.searchFilterValues.fileSize
      )
      .subscribe((res) => {
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
