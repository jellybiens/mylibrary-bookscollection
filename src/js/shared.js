module.exports.updateBooksCollection = ( book ) => {
  const booksCollection = JSON.parse( localStorage.getItem( 'booksCollection' ) || '{}' );
  booksCollection[book.key_id] = {
    ...book,
  };
  localStorage.setItem( 'booksCollection', JSON.stringify( booksCollection ) );
};

module.exports.getBooksCollectionIds = () => {
  const booksCollection = JSON.parse( localStorage.getItem( 'booksCollection' ) || '{}' );
  return Object.keys( booksCollection );
};

const filterBooks = ( keys, books, by, eq ) => {
  return keys.filter( ( key ) => {
    return JSON.stringify( books[key][by] ) === JSON.stringify( eq );
  } ).reduce( ( obj, key ) => {
    obj[key] = books[key];
    return obj;
  }, {} );
};

module.exports.filterBooks = filterBooks;

module.exports.split = () => {
  const books = JSON.parse( localStorage.getItem( 'booksCollection' ) || {} );
  const keys = Object.keys( books );
  const [not, rdn, fin] =
    [
      filterBooks( keys, books, 'read_status', 'not' ),
      filterBooks( keys, books, 'read_status', 'rdn' ),
      filterBooks( keys, books, 'read_status', 'fin' ),
    ];

  return [not, rdn, fin];
};
