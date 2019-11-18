import React from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import { Container, Row, Col } from 'react-bootstrap';
import BookShelves from './BookShelves';

const MyBooks = ( { location: { pathname } } ) => {
  const renderBookCovers = () => {
    const booksCollection = JSON.parse( localStorage.getItem( 'booksCollection' ) ) || {};

    if ( Object.entries( booksCollection ).length === 0 ) {
      return (
        <Row>
          <Col style={{ 'textAlign': 'center' }} >
            Search for books to add to your collection...
          </Col>
        </Row>
      );
    }

    return <BookShelves books={booksCollection} pathname={pathname} />;
  };

  return (
    <>
      <Navigation path={pathname} />
      <Container>
        <Row> {renderBookCovers()} </Row>
      </Container>
    </>
  );
};

MyBooks.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default MyBooks;
