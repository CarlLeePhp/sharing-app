import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/Member';
import { Photo } from '../_models/Photo';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;

  currentSharerId: number;

  constructor(private http: HttpClient) {}

  getMembers() {
    return this.http.get<Member[]>(this.baseUrl + 'users');
  }

  getMember(email: string) {
    return this.http.get<Member>(this.baseUrl + 'users/email/' + email);
  }
  getMemberById(id: number) {
    return this.http.get<Member>(this.baseUrl + 'users/id/' + id);
  }

  updateMember(member: Member) {
    return this.http.put(this.baseUrl + 'users', member);
  }

  uploadePicture(file: File) {
    const formData = new FormData();
    formData.append('File', file);
    return this.http.post<Photo>(this.baseUrl + 'users/add-photo', formData);
  }
}
