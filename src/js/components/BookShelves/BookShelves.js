import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import BookCover from '../BookCover';
import { getBooksCollectionIds, updateBooksCollection } from './actions';

const BookShelves = ( { books, pathname } ) => {
  const renderBookCovers = () => {
    const bookShelves = [];
    const myCollection = pathname.startsWith( '/FindBooks' ) ? getBooksCollectionIds() : [];
    for ( const key in books ) {
      if ( Object.prototype.hasOwnProperty.call( books, key ) ) {
        const { key_id } = books[key];
        bookShelves.push(
            <Grid item xs={6} md={4} lg={3} className="bookTile mb-2" key={`_${key_id}_`}>
              <BookCover
                bookObj={{
                  ...books[key],
                }}
                bookInCollection={myCollection.includes( key_id )}
                updateCollection={updateBooksCollection}
                pathname={pathname}
              />
            </Grid>
        );
      }
    }
    return bookShelves;
  };

  return renderBookCovers();
};

BookShelves.propTypes = {
  books: PropTypes.any,
  pathname: PropTypes.string,
};

export default BookShelves;
