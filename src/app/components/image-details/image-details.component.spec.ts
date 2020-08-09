import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ImageDetailsComponent } from './image-details.component';
import { ImageSearchService } from '../../services/image-search.service';
import { of, Observable, throwError } from 'rxjs';
import { ImageDetails } from 'src/app/models/image-details';

describe('ImageDetailsComponent', () => {
  let component: ImageDetailsComponent;
  let fixture: ComponentFixture<ImageDetailsComponent>;
  let service: ImageSearchService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ImageDetailsComponent],
      providers: [
        {
          provide: ImageSearchService,
        },
      ],
    }).compileComponents();
     service = TestBed.inject(ImageSearchService);

  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should test onSearch function', () => {
    // arrange
    const spyOnMethodOnSearch= spyOn(service, 'search').and.callThrough();
    // act
    const event = new MouseEvent('click');
    component.onSearch(event);
    // assert
    expect(spyOnMethodOnSearch).toHaveBeenCalled();
  });

  it('should test onLoadMore function', () => {
    // arrange
    const spyOnMethodOnSearch = spyOn(service, 'search').and.callThrough();
    const spyOnMethodOnLoadMore = spyOn(component, 'onLoadMore').and.callThrough();

    // act
    const event = new MouseEvent('click');
    component.onLoadMore(event);
    // assert
    expect(spyOnMethodOnSearch).toHaveBeenCalled();
    expect(spyOnMethodOnLoadMore).toHaveBeenCalled();

  });

  it('should call loadImageDetails and return list of image detail objects', async(() => {
    const response: ImageDetails[] = [];

    spyOn(service, 'search').and.returnValue(of(response));
    component.loadImageDetails();
    fixture.detectChanges();
    expect(component.records).toEqual(response);
  }));

  it('should call loadImageDetails and server error', async(() => {
    spyOn(service, 'search').and.returnValue(throwError('500 Internal error'));
    component.loadImageDetails();
    fixture.detectChanges();
    expect(component.records.length).toEqual(0);
    expect(component.serverError).toBeTrue();
  }));

  it('should call loadImageDetails and no content from server', async(() => {
    spyOn(service, 'search').and.returnValue(of(null));
    component.loadImageDetails();
    fixture.detectChanges();
    expect(component.noRecords).toBeTrue();
  }));

});
