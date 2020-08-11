import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

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

  onSearch(filters: any): void {
    Object.keys(filters).forEach((key) =>
      filters[key] === '' ? delete filters[key] : key
    );
    this.groupFilters.emit(filters);
  }

  checkNumberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
}
