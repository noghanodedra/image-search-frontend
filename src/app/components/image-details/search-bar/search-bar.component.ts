import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Output() groupFilters: EventEmitter<any> = new EventEmitter<any>();

  allowedFileTypes = environment.allowedFileTypes;
  form: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.fb.group({
      description: new FormControl(''),
      fileType: new FormControl(''),
      fileSize: new FormControl(''),
    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach((key) =>
      filters[key] === '' ? delete filters[key] : key
    );
    this.groupFilters.emit(filters);
  }
}
