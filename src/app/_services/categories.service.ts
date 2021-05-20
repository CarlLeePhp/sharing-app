import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../_models/Category';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  baseUrl = environment.apiUrl;
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get<Category[]>(this.baseUrl + 'categories');
  }
}
