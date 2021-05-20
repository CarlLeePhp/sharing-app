import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Joining } from '../_models/Joining';

@Injectable({
  providedIn: 'root',
})
export class JoiningsService {
  baseUrl = environment.apiUrl;
  editJoining: Joining;

  constructor(private http: HttpClient) {}

  getJoiningsByUser(email) {
    return this.http.get<Joining[]>(this.baseUrl + 'joinings/user/' + email);
  }
  createJoining(joining: Joining) {
    return this.http.post(this.baseUrl + 'joinings/', joining);
  }
  updateQty(joining: Joining) {
    return this.http.put(this.baseUrl + 'joinings/qty', joining);
  }
  updateStatus(joining: Joining) {
    return this.http.put(this.baseUrl + 'joinings/status', joining);
  }
}
