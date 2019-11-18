import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import BookCover from './BookCover';
import { getBooksCollectionIds, updateBooksCollection } from '../shared';

const BookShelves = ( { books, pathname } ) => {
  const renderBookCovers = () => {
    const myCollection = getBooksCollectionIds();
    return Object.keys( books ).map(
        ( key_id, i ) => {
          const {
            title,
            cover_i,
            author_name,
            first_publish_year,
            isbn,
            read_status,
            date,
          } = books[key_id];
          return (
            <Col xs={6} md={4} lg={3} className="bookTile mb-2" key={[i, key_id].join( '-' )}>
              <BookCover
                key_id={key_id}
                title={title}
                cover_i={cover_i}
                author_name={author_name}
                first_publish_year={first_publish_year}
                isbn={isbn}
                myBooks={pathname === '/MyBooks'}
                report={pathname === '/AnnualReport'}
                read_status={read_status}
                date={date}
                bookOwned={myCollection.includes( key_id )}
                updateCollection={updateBooksCollection}
              />
            </Col>
          );
        } );
  };

  return renderBookCovers();
};

BookShelves.propTypes = {
  books: PropTypes.object,
  pathname: PropTypes.string,
};

export default BookShelves;
