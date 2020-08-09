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
  searchFilterValues: any;
  currPage = 0;
  noRecords = false;
  loading = false;
  HTTP_NO_CONTENT = 204;

  constructor(
    private imageSearchService: ImageSearchService,
    private ref: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    /*for (let i = 0; i < 30; i++) {
      let obj = { description: 'test', fileSize: 1, fileType: 'test' };
      this.records.push(obj);
    }*/
    // this.loadImageDetails();
  }

  onSearch(event): void {
    console.log('search filters: ', event);
    this.searchFilterValues = event;
    console.log('search 1: ', event.description);
    console.log('search 1: ', event.fileType);
    console.log('search 1: ', event.fileSize);
    this.currPage = 0;
    this.records = [];
    this.loadImageDetails();
  }

  onLoadMore(event): void {
    this.currPage++;
    this.loadImageDetails();
  }

  loadImageDetails(): void {
    console.log(this.groupFilters);
    this.loading = true;
    this.imageSearchService
      .search(
        this.currPage,
        this.searchFilterValues.description,
        this.searchFilterValues.fileType,
        this.searchFilterValues.fileSize
      )
      .subscribe((res) => {
        console.log(res);
        this.noRecords = false;
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
