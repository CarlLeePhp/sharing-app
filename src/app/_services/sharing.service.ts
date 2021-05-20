import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Photo } from '../_models/Photo';
import { Sharing } from '../_models/Sharing';

@Injectable({
  providedIn: 'root',
})
export class SharingService {
  baseUrl = environment.apiUrl;
  currentSharing: Sharing; // sharing-form page, for creating and editing sharing
  searchResults: Sharing[];
  detailSharing: Sharing; // detail sharing page

  constructor(private http: HttpClient) {}
  getSharings() {
    return this.http.get<Sharing[]>(this.baseUrl + 'sharings');
  }
  searchSharings(categoryId: number = 0, keyword: string = '') {
    return this.http.get<Sharing[]>(
      this.baseUrl + 'sharings/search/' + categoryId + '/' + keyword
    );
  }
  getSharingsByUser(email) {
    return this.http.get<Sharing[]>(this.baseUrl + 'sharings/user/' + email);
  }
  getSharingById(id) {
    return this.http.get<Sharing>(this.baseUrl + 'sharings/id/' + id);
  }
  getRecommendSharings(email: string) {
    return this.http.get<Sharing[]>(
      this.baseUrl + 'sharings/interest/' + email
    );
  }
  getPublishedSharings() {
    return this.http.get<Sharing[]>(this.baseUrl + 'PublishedSharings');
  }

  getCompletedSharings() {
    return this.http.get<Sharing[]>(this.baseUrl + 'CompletedSharings');
  }

  updateSharing(sharing: Sharing) {
    return this.http.put(this.baseUrl + 'sharings', sharing);
  }
  createSharing(sharing: Sharing) {
    return this.http.post(this.baseUrl + 'sharings', sharing);
  }

  uploadePicture(file: File, sharingId: number) {
    const formData = new FormData();
    formData.append('File', file);
    formData.append('SharingId', sharingId.toString());
    return this.http.post<Photo>(this.baseUrl + 'sharings/add-photo', formData);
  }
}
