import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() records = [];
  @Output() loadMore: EventEmitter<any> = new EventEmitter<any>();

  selector = '.content';

  constructor() {}

  ngOnInit(): void {
    console.log('rec', this.records);
  }

  onScrollDown() {
    console.log('scrolled down!!', this.records);
    this.loadMore.emit();
  }
}
