import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { ImageSearchService } from './image-search.service';
import { environment } from '../../environments/environment';
import { ImageDetails } from '../models/image-details';

describe('ImageSearchService', () => {
  let service: ImageSearchService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ImageSearchService],
    });
    service = TestBed.inject(ImageSearchService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('search function ->should return data as per query', () => {
    const dummyData: ImageDetails[] = [
      {
        description: 'test',
        fileSize: 1,
        fileType: 'png',
      },
    ];
    service.search(0, 'test', 'png', 11).subscribe((resp) => {
      expect(resp.length).toBe(1);
      expect(resp).toEqual(dummyData);
    });

    const expectedURL =
      environment.imageSearchApiUrl +
      '?page=0&description=test&fileSize=11&fileType=png&size=20';
    const req = httpMock.expectOne(expectedURL);
    expect(req.request.method).toEqual('GET');
    expect(req.cancelled).toBeFalsy();
    req.flush(dummyData);
  });

  it('handleError Function -> handle 500 error', () => {
    const expectedURL =
      environment.imageSearchApiUrl +
      '?page=0&description=test&fileSize=11&fileType=png&size=20';
    let response: any;
    let errResponse: any;
    const mockErrorResponse = { status: 500, statusText: 'Server error' };
    const data = 'Server error';
    service.search(0, 'test', 'png', 11).subscribe(
      (res) => (response = res),
      (err) => (errResponse = err)
    );
    httpMock.expectOne(expectedURL).error(null, mockErrorResponse);
    expect(errResponse).toContain(data);
  });
});
