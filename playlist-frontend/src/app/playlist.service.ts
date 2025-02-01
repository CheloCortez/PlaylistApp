import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlaylistService {

  private baseUrl = 'http://localhost:8080/lists';
  private username = 'user'; 
  private password = 'password';

  constructor(private http: HttpClient) { }

  private createAuthorizationHeader(): HttpHeaders {
    const headers = new HttpHeaders({
      'Authorization': 'Basic ' + btoa(this.username + ':' + this.password)
    });
    return headers;
  }

  getPlaylists(): Observable<any> {
    return this.http.get(this.baseUrl, { headers: this.createAuthorizationHeader() });
  }

  addPlaylist(playlist: Object): Observable<Object> {
    return this.http.post(this.baseUrl, playlist, { headers: this.createAuthorizationHeader() });
  }

  deletePlaylist(name: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${name}`, { headers: this.createAuthorizationHeader() });
  }

  getPlaylist(name: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${name}`, { headers: this.createAuthorizationHeader() });
  }
}
