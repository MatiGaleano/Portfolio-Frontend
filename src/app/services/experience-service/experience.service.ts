import { Injectable } from '@angular/core';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Work } from '../../models/works.interface';
import { environment } from 'src/environments/environment';
import { BYPASS_JW_TOKEN } from '../authentication/interceptor.service';


@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  baseUrl = `${environment.API_URL}/api/work`;

  constructor(private http: HttpClient) {}

  getWorks(): Observable<Work[]> {
    return this.http.get<Work[]>(this.baseUrl, {
      context: new HttpContext().set(BYPASS_JW_TOKEN, true),
    });    
  }

  getWorkById(id: number): Observable<Work> {
    return this.http.get<Work>(`${this.baseUrl}/${id}`, {
      context: new HttpContext().set(BYPASS_JW_TOKEN, true),
    });
  }

  postWork(data: Work): Observable<Work> {
    return this.http.post<Work>(this.baseUrl, data);
  }

  putWork(data: Work): Observable<Work> {
    return this.http.put<Work>(this.baseUrl, data);
  }

  deleteWork(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
