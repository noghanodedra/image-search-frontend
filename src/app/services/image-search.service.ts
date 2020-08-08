import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageSearchService {

   constructor(private http: HttpClient) {}

  search(formData: FormData): Observable<any> {
    return this.http.post(environment.imageSearchApiUrl, formData);
  }
}
