import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import BookCover from './BookCover';
import { getBooksCollectionIds, updateBooksCollection } from '../shared';

const BookShelves = ( { books, pathname } ) => {
  const renderBookCovers = () => {
    const bookShelves = [];
    const myCollection = pathname.startsWith( '/FindBooks' ) ? getBooksCollectionIds() : [];
    for ( const key in books ) {
      if ( Object.prototype.hasOwnProperty.call( books, key ) ) {
        const { key_id } = books[key];
        bookShelves.push(
            <Col xs={6} md={4} lg={3} className="bookTile mb-2" key={`_${key_id}_`}>
              <BookCover
                bookObj={{
                  ...books[key],
                }}
                bookInCollection={myCollection.includes( key_id )}
                updateCollection={updateBooksCollection}
                pathname={pathname}
              />
            </Col>
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
