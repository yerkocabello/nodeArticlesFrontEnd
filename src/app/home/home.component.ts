import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../services/articles.service';
import {Router} from '@angular/router';
import {Article} from '../model/article.model';
import {catchError} from 'rxjs/operators';
import {throwError} from 'rxjs';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  articles: Article[];
  articlesFromApi: Article[];
  newArticles: Boolean = false;

  constructor(private router: Router, private articlesService: ArticlesService) { }

  ngOnInit() {
    this.articlesService.getArticlesApi()
        .pipe(catchError(err => err.code === 404
            ? throwError('Not found')
            : throwError(err)))
        .subscribe(value => {
        if (value.length > 0) {
          this.articles = value;
          return;
        } else {
          this.articlesService.getArticles()
            .subscribe(value1 => {
                this.articles = value1.hits;
                this.articlesService.insertArticles(this.articles)
                    .subscribe(value2 =>  {
                        console.log(value2);
                    });
            });
        }
      });
  }

  deleteArticle(article: Article): void {
    this.articlesService.deleteArticle(article.objectID)
      .subscribe(value => {
        this.articles = this.articles.filter(value1 => value1 !== article);
      });
  }

    loadArticlesFromApi() {
        setTimeout(() => {
            this.articlesService.getArticles()
                .subscribe(value1 => {
                    value1.hits.forEach(value => {
                        if (this.articles.indexOf(value) <= 0 ) {
                            this.articles.push(value);
                            this.newArticles = true;
                        }
                    });
                    if (this.newArticles) {
                        this.articlesService.insertArticles(this.articles)
                            .subscribe(value2 =>  {
                                console.log(value2);
                            });
                    }
                });
        }, 5000);
    }
}
