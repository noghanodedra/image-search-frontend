import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  ngOnInit(): void {}

  onScrollDown(): void {
    this.loadMore.emit();
  }
}
