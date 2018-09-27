export class Article extends Object {

  created_at: string;
  title: string;
  url: string;
  author: string;
  points: number;
  story_text: string;
  comment_text: string;
  num_comments: string;
  story_id: number;
  story_title: string;
  story_url: string;
  parent_id: number;
  created_at_i: number;
  _tags: Array<string>;
  objectID: string;
  _highlightResult: {
    author: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: Array<string>;
    }
    comment_text: {
      value: string;
      matchLevel: string;
      fullyHighlighted: boolean;
      matchedWords: Array<string>;
    }
    story_title: {
      value: string;
      matchLevel: string;
      matchedWords: Array<string>;
    }
    story_url: {
          value: string;
          matchLevel: string;
          matchedWords: Array<string>;
    }
  };

}
