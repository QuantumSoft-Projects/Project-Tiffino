import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment.dev';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl + '/admin';
  private superAdminLoginUrl = environment.apiUrl + '/token';
  private adminRegisterUrl = `${this.baseUrl}/register`;
  private adminLoginUrl = `${this.baseUrl}/login`;
  private forgotPasswordUrl = `${this.baseUrl}/forgot-password`;
  private resetPasswordUrl = `${this.baseUrl}/reset-password`;
  private changePasswordUrl = `${this.baseUrl}/change-password`;
  private sendCredentialsUrl = `${this.baseUrl}/credential`;

  private userSubject = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  adminLogin(username: string, password: string): Observable<string> {
    localStorage.removeItem('adminToken');
    return this.http.post<string>(
      this.adminLoginUrl,
      { username, password },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
        responseType: 'text' as 'json',
      }
    ).pipe(
      tap((token) => {
        localStorage.setItem('adminToken', token);
      }),
      catchError(this.handleError)
    );
  }

  superAdminLogin(username: string, password: string): Observable<any> {
    return this.http.post(this.superAdminLoginUrl, { username, password }, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }).pipe(
      tap((response: any) => {
        localStorage.setItem('superAdminToken', response.token);
      }),
      catchError(this.handleError)
    );
  }

  registerAdmin(adminData: any, profilePicture: File): Observable<any> {
    const token = localStorage.getItem('superAdminToken');
    if (!token) {
      return this.handleUnauthorizedError();
    }

    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    const formData = new FormData();
    formData.append('adminData', new Blob([JSON.stringify(adminData)], { type: 'application/json' }));
    formData.append('profilePicture', profilePicture);

    return this.http.post(this.adminRegisterUrl, formData, { headers, responseType: 'text' }).pipe(
      tap((response: string) => {
        if (response === "Admin added successfully!") {
          alert('Registration Successful! Redirecting to login...');
        }
      }),
      catchError(this.handleError)
    );
  }

  adminForgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.forgotPasswordUrl}?email=${encodeURIComponent(email)}`, {}, { responseType: 'text' }).pipe(
      tap(() => {
        this.snackBar.open('OTP sent to email successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'center',
          panelClass: ['snackbar-success'],
        });
      }),
      catchError(this.handleError)
    );
  }

  adminResetPassword(otp: string, newPassword: string, confirmPassword: string): Observable<any> {
    const params = new URLSearchParams();
    params.append('otp', otp);
    params.append('newPassword', newPassword);
    params.append('confirmPassword', confirmPassword);

    return this.http.post(`${this.resetPasswordUrl}?${params.toString()}`, {}, { responseType: 'text' }).pipe(
      tap(() => console.log('Password reset successful!')),
      catchError(this.handleError)
    );
  }

  changePassword(email: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.put(this.changePasswordUrl, { email, oldPassword, newPassword }).pipe(
      catchError(this.handleError)
    );
  }

  sendCredentialsToEmail(email: string): Observable<any> {
    return this.http.post(this.sendCredentialsUrl, null, {
      params: { email },
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'text' as 'json'
    }).pipe(catchError(this.handleError));
  }

  getUser(): Observable<any> {
    return this.userSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('superAdminToken');
    localStorage.removeItem('userRole');
    this.userSubject.next(null);
  }

  private handleUnauthorizedError(): Observable<never> {
    return throwError(() => new Error('Authorization token is missing or expired!'));
  }

  private handleError(error: any): Observable<never> {
    console.error('API error:', error);
    return throwError(() => new Error(error.error || 'An error occurred.'));
  }
}