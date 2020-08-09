import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { ImageDetails } from '../models/image-details';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageSearchService {
  HTTP_NO_CONTENT = 204;

  constructor(private http: HttpClient) {}

  search(
    page: number,
    description?: string,
    fileType?: string,
    fileSize?: number
  ): Observable<ImageDetails[]> {
    let params = new HttpParams().set('page', String(page));
    if (description) {
      params = params.set('description', description);
    }
    if (fileSize) {
      params = params.set('fileSize', String(fileSize));
    }
    if (fileType) {
      params = params.set('fileType', fileType);
    }
    if (environment.pageSize) {
      params = params.set('size', String(environment.pageSize));
    }
    return this.http
      .get<ImageDetails[]>(environment.imageSearchApiUrl, {
        observe: 'response',
        params,
      })
      .pipe(
        map((res) => res.body as ImageDetails[]),
        catchError(this.handleError)
      );
  }

  private handleError(err: HttpErrorResponse): Observable<never> {
    const errMsg = err.message || 'Server error';
    return throwError(errMsg);
  }
}
