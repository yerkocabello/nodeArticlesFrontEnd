import {Article} from './article.model';

export class ArticleList extends Object {

  exhaustiveNbHits: boolean;
  hits: Article[];
  hitsPerpage: number;
  nbHits: number;
  nbPages: number;
  page: number;
  params: string;
  processingTimeMS: number;
  query: string;
}
