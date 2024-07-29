import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000';
  private authenticated = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient) {}

  isAuthenticated(): Observable<boolean> {
    return this.authenticated.asObservable();
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
      tap(response => {
        if (response.success) {
          this.authenticated.next(true);
        }
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.authenticated.next(false);
  }

  private handleError(error: HttpErrorResponse) {
    
    console.error('Error en la solicitud:', error);
  
    return throwError('Something bad happened; please try again later.');
  }
}


