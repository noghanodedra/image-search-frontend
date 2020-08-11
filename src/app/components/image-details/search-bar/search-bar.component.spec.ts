import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';

import { SearchBarComponent } from './search-bar.component';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [SearchBarComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test onSearch function', () => {
    const filters = {};
    spyOn(component.groupFilters, 'emit').and.callThrough();

    const nativeElement = fixture.nativeElement;
    const button = nativeElement.querySelector('button');
    button.dispatchEvent(new Event('click'));

    fixture.detectChanges();

    expect(component.groupFilters.emit).toHaveBeenCalledWith(filters);
  });

  it('should test checkNumberOnly function', async () => {
    fixture.detectChanges();
    spyOn(component, 'checkNumberOnly').and.callThrough();

    const input = fixture.debugElement.query(
      By.css('input[formControlName="fileSize"]')
    );
    const fileSizeInput = input.nativeElement;
    const event = new KeyboardEvent('keypress', {
      key: '111',
    });
    fileSizeInput.dispatchEvent(event);
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(component.checkNumberOnly).toHaveBeenCalled();
    });
  });

  it('should test checkNumberOnly function with custom event', () => {
    const event = { which: 111 };
    spyOn(component, 'checkNumberOnly').and.callThrough();
    component.checkNumberOnly(event);
    expect(component.checkNumberOnly).toHaveBeenCalledWith(event);
  });
});
