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
