import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Interest } from '../_models/Interest';

@Injectable({
  providedIn: 'root',
})
export class InterestsService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  addInterest(interest: Interest) {
    return this.http.post(this.baseUrl + 'interests', interest);
  }

  deleteInterest(id: number) {
    return this.http.delete(this.baseUrl + 'interests/' + id);
  }
}
