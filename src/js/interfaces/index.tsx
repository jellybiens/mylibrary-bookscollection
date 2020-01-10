export interface IBookCover {
  key_id: string;
  title: string;
  cover_i: string;
  author_name: string;
  first_publish_year: number;
  isbn: string;
  read_status: string;
  date: string;
}

export interface IBookCoverProps {
  bookObj: IBookCover;
  bookInCollection: boolean;
  updateCollection: void;
  pathname: string;
}