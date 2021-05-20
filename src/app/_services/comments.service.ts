import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AppComment } from '../_models/AppComment';
import { Sharing } from '../_models/Sharing';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  baseUrl = environment.apiUrl;
  selectedSharing: Sharing;

  constructor(private http: HttpClient) {}

  createComment(appComment: AppComment) {
    return this.http.post(this.baseUrl + 'comments', appComment);
  }
  getCommentsBySharing(id: number) {
    return this.http.get<AppComment[]>(this.baseUrl + 'comments/sharing/' + id);
  }
}
