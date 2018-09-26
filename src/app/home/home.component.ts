import { Component, OnInit } from '@angular/core';
import {ArticlesService} from '../services/articles.service';
import {Router} from '@angular/router';
import {Article} from '../model/article.model';
import {ArticleList} from '../model/articleList.model';

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
      .subscribe(value => {
        if (value !== undefined) {
          this.articles = value;
        } else {
          this.articlesService.getArticles()
            .subscribe(value1 => {
              this.articles = value1;
            });
          this.articlesService.insertArticles(this.articles)
            .subscribe(value1 => {
              console.log(value1);
            });
        }
      });
  }

  deleteArticle(article: Article): void {
    this.articlesService.deleteArticle(article.objectId)
      .subscribe(value => {
        this.articles.hits = this.articles.hits.filter(value1 => value1 !== article);
      });
  }
}
