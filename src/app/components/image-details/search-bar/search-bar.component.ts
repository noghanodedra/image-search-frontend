import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

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
      fileSize: new FormControl('', [Validators.pattern('^[0-9]*$')]),
    });
  }

  search(filters: any): void {
    Object.keys(filters).forEach((key) =>
      filters[key] === '' ? delete filters[key] : key
    );
    console.log(filters);
    this.groupFilters.emit(filters);
  }

  numberOnly(event): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
