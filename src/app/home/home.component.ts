import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticlesService} from '../services/articles.service';
import {Router} from '@angular/router';
import {Article} from '../model/article.model';
import {catchError, switchMap} from 'rxjs/operators';
import {Subscription, throwError, timer} from 'rxjs';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  articles: Article[];
  newArticles: Article[];
  sub: Subscription;

  constructor(private router: Router, private articlesService: ArticlesService) { }

    ngOnInit() {

        this.sub = timer(0, 3600000)
            .pipe(
            switchMap(() => this.articlesService.getArticles())
        ).subscribe(result => {
            this.newArticles = new Array();
                result.hits.forEach(value => {
                    const obj = this.articles.find(value1 => value1.objectID === value.objectID);
                    if (obj === null) {
                        this.newArticles.push(value);
                    }
                });
                if (this.newArticles.length > 0) {
                    this.articlesService.insertArticles(this.newArticles)
                        .subscribe(value2 =>  {
                            this.articles.concat(this.newArticles);
                        });
                }
            });

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

  ngOnDestroy() {
      this.sub.unsubscribe();
  }
}

