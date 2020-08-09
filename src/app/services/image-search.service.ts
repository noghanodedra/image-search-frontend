import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ImageSearchService {
  constructor(private http: HttpClient) {}

  search(
    page: number,
    description?: string,
    fileType?: string,
    fileSize?: number
  ): Observable<any> {

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
    return this.http
      .get(environment.imageSearchApiUrl, { observe: 'response', params })
      .pipe(catchError(this.handleError));
  }
  handleError(error: HttpErrorResponse): any {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
