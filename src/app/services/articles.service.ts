import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ArticleList} from '../model/articleList.model';
import {Article} from '../model/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {

  constructor(private http: HttpClient) { }
  url = 'https://hn.algolia.com/api/v1/search_by_date?query=nodejs';
  apiUrl = 'http://localhost:3000/api/articles';

  getArticlesApi(): Observable<Article[]> {
    return this.http.get<Article[]>(this.apiUrl);
  }

  getArticles(): Observable<ArticleList> {
    return this.http.get<ArticleList>(this.url);
  }

  insertArticles(articles: Article[]): Observable<Article[]> {
    return this.http.post<Article[]>(this.apiUrl, articles);
  }

  deleteArticle(id: string): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  }
}
