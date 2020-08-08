import { TestBed } from '@angular/core/testing';

import { ImageSearchService } from './image-search.service';

describe('ImageSearchService', () => {
  let service: ImageSearchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageSearchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
