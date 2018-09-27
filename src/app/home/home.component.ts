import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../services/articles.service';
import {Router} from '@angular/router';
import {Article} from '../model/article.model';
import {ArticleList} from '../model/articleList.model';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: ArticleList;

  constructor(private router: Router, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getArticlesApi()
        .pipe(catchError(err => err.code === 404
            ? throwError('Not found')
            : throwError(err)))
        .subscribe(value => {
        if (value.hits !== undefined) {
            console.log('se encontraron desde base de datos');
            console.log(value.hits);
          this.articles = value;
        } else {
            console.log('obtener desde url');
          this.articlesService.getArticles()
            .subscribe(value1 => {
              this.articles = value1;
              console.log(value1);
            });
          /*this.articlesService.insertArticles(this.articles)
            .subscribe(value1 => {
              console.log(value1);
            });*/
        }
      });
  }

  deleteArticle(article: Article): void {
    this.articlesService.deleteArticle(article.objectId)
      .subscribe(value => {
        this.articles.hits = this.articles.hits.filter(value1 => value1 !== article);
      });
  }

  goURL(article: Article): void {
      console.log("navegando a nueva url");
      if (article.story_url !== undefined) {
         this.router.navigateByUrl(article.story_url);
      } else {
          this.router.navigateByUrl(article.url);
      }
  }
}
