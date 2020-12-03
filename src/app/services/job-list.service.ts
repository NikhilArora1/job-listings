import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobListService {
  private githubApi;

  constructor(private http: HttpClient) {
    this.githubApi = 'https://cors-anywhere.herokuapp.com/https://jobs.github.com/positions';
  }

  getJobs(description, isFullTime, location): Observable<any> {
    return this.http.get(`${this.githubApi}.json?description=${description}&full-time=${isFullTime}&location=${location}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  getJobDetails(id): Observable<any> {
    return this.http.get(`${this.githubApi}/${id}.json`)
      .pipe(
        catchError(this.handleError)
      );
  }

  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
