const {
  updateBooksCollection,
  getBooksCollectionIds,
  filterBooks,
  split,
} = require( './shared' );

const localStorageMock = ( () => {
  let store = {};
  return {
    getItem: ( key ) => {
      return store[key];
    },
    setItem: ( key, value ) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    resetStore: () => {
      store = { booksCollection: JSON.stringify( booksCollectionExpect ) };
    },
    removeItem: ( key ) => {
      delete store[key];
    },
  };
} )();
Object.defineProperty( window, 'localStorage', { value: localStorageMock } );

beforeEach( () => {
  localStorage.resetStore();
} );

test( 'should add book to empty collection', () => {
  localStorage.clear();
  updateBooksCollection( bookExpect );
  expect( localStorage.getItem( 'booksCollection' ) ).toBe( JSON.stringify( { [bookExpect.key_id]: bookExpect } ) );
  expect( Object.keys( JSON.parse( localStorage.getItem( 'booksCollection' ) ) ).length ).toBe( 1 );
} );

test( 'should return list of book keys', () => {
  const bookIds = getBooksCollectionIds();
  expect( bookIds.sort() ).toEqual( booksIdsExpect.sort() );
} );

test( 'should return list of book filtered by given keys', () => {
  const filteredGrrmBooks = filterBooks( booksIdsExpect, booksCollectionExpect, 'author_name', ['George R.R. Martin'] );
  expect( filteredGrrmBooks ).toEqual( grrmBooksExpect );
} );

test( 'should return array of objects split by read_status', () => {
  const booksSplit = split();
  expect( booksSplit[0] ).toEqual( booksSplitExpect[0] );
  expect( booksSplit[1] ).toEqual( booksSplitExpect[1] );
  expect( booksSplit[2] ).toEqual( booksSplitExpect[2] );
} );


const booksCollectionExpect = {
  '/works/OL13716951W': { 'key_id': '/works/OL13716951W', 'title': 'harry potter things', 'cover_i': 7890711, 'author_name': ['J. K. Rowling'], 'first_publish_year': 2008, 'isbn': ['978-83-8008-297-7'], 'read_status': 'not', 'date': '2019-11-18T13:27:15.987Z' },
  '/works/OL13716956W': { 'key_id': '/works/OL13716956W', 'title': 'Harry Potter and the Prisoner of Azkaban', 'cover_i': 8465053, 'author_name': ['J. K. Rowling'], 'first_publish_year': 1999, 'isbn': ['9788422685227'], 'read_status': 'rdn', 'date': '2019-11-18T13:27:23.354Z' },
  '/works/OL27448W': { 'key_id': '/works/OL27448W', 'title': 'The Lord of the Rings', 'cover_i': 8314541, 'author_name': ['J.R.R. Tolkien'], 'first_publish_year': 1950, 'isbn': ['8020409262'], 'read_status': 'fin', 'date': '2019-11-01T13:27:46.000Z' },
  '/works/OL257940W': { 'key_id': '/works/OL257940W', 'title': 'A Clash of Kings (A Song of Ice and Fire, Book 2)', 'cover_i': 372881, 'author_name': ['George R.R. Martin'], 'first_publish_year': 2000, 'isbn': ['0553381695'], 'read_status': 'fin', 'date': '2019-11-01T13:28:00.000Z' },
  '/works/OL1955941W': { 'key_id': '/works/OL1955941W', 'title': 'A Game of Thrones', 'cover_i': 8464793, 'author_name': ['George R.R. Martin'], 'first_publish_year': 1996, 'isbn': ['9780008249618'], 'read_status': 'fin', 'date': '2019-10-01T12:28:17.000Z' },
};

const bookExpect = {
  'key_id': '/works/OL2577482W', 'title': 'The Last Wish', 'cover_i': 2379022, 'author_name': ['Andrzej Sapkowski'], 'first_publish_year': 2007, 'isbn': ['0316029181'], 'read_status': 'fin', 'date': '2019-08-01T12:29:24.000Z',
};

const grrmBooksExpect = {
  '/works/OL257940W': { 'key_id': '/works/OL257940W', 'title': 'A Clash of Kings (A Song of Ice and Fire, Book 2)', 'cover_i': 372881, 'author_name': ['George R.R. Martin'], 'first_publish_year': 2000, 'isbn': ['0553381695'], 'read_status': 'fin', 'date': '2019-11-01T13:28:00.000Z' },
  '/works/OL1955941W': { 'key_id': '/works/OL1955941W', 'title': 'A Game of Thrones', 'cover_i': 8464793, 'author_name': ['George R.R. Martin'], 'first_publish_year': 1996, 'isbn': ['9780008249618'], 'read_status': 'fin', 'date': '2019-10-01T12:28:17.000Z' },
};

const booksIdsExpect = [
  '/works/OL13716951W',
  '/works/OL13716956W',
  '/works/OL27448W',
  '/works/OL257940W',
  '/works/OL1955941W',
];

const booksSplitExpect = [
  {
    '/works/OL13716951W': { 'key_id': '/works/OL13716951W', 'title': 'harry potter things', 'cover_i': 7890711, 'author_name': ['J. K. Rowling'], 'first_publish_year': 2008, 'isbn': ['978-83-8008-297-7'], 'read_status': 'not', 'date': '2019-11-18T13:27:15.987Z' },
  },
  {
    '/works/OL13716956W': { 'key_id': '/works/OL13716956W', 'title': 'Harry Potter and the Prisoner of Azkaban', 'cover_i': 8465053, 'author_name': ['J. K. Rowling'], 'first_publish_year': 1999, 'isbn': ['9788422685227'], 'read_status': 'rdn', 'date': '2019-11-18T13:27:23.354Z' },
  },
  {
    '/works/OL27448W': { 'key_id': '/works/OL27448W', 'title': 'The Lord of the Rings', 'cover_i': 8314541, 'author_name': ['J.R.R. Tolkien'], 'first_publish_year': 1950, 'isbn': ['8020409262'], 'read_status': 'fin', 'date': '2019-11-01T13:27:46.000Z' },
    '/works/OL257940W': { 'key_id': '/works/OL257940W', 'title': 'A Clash of Kings (A Song of Ice and Fire, Book 2)', 'cover_i': 372881, 'author_name': ['George R.R. Martin'], 'first_publish_year': 2000, 'isbn': ['0553381695'], 'read_status': 'fin', 'date': '2019-11-01T13:28:00.000Z' },
    '/works/OL1955941W': { 'key_id': '/works/OL1955941W', 'title': 'A Game of Thrones', 'cover_i': 8464793, 'author_name': ['George R.R. Martin'], 'first_publish_year': 1996, 'isbn': ['9780008249618'], 'read_status': 'fin', 'date': '2019-10-01T12:28:17.000Z' },
  },
];
