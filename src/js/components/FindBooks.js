import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Navigation from './Navigation';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BookShelves from './BookShelves';

const FindBooks = ( { location: { pathname }, match: { params: { searchText } } } ) => {
  const [isLoading, setIsLoading] = useState( true );
  const [foundBooks, setFoundBooks] = useState( [] );

  useEffect( () => {
    fetch( `http://openlibrary.org/search.json?title=${searchText}&has_fulltext=true` )
        .then( ( res ) => res.json() )
        .then( ( json ) => {
          const booksResults =
            json.docs.reduce( ( map, obj ) => {
              map[obj.key] = {
                key_id: obj.key,
                title: obj.title,
                cover_i: obj.cover_i,
                author_name: obj.author_name,
                first_publish_year: obj.first_publish_year,
                isbn: obj.isbn,
              };
              return map;
            }, {} );
          setFoundBooks( booksResults );
          setIsLoading( false );
        } );
  }, [] );

  const renderResults = () => {
    if ( isLoading ) {
      return (
        <Col>
          <Spinner className="d-block m-auto" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      );
    }

    return <BookShelves books={foundBooks} pathname={pathname} />;
  };

  return (
    <>
      <Navigation path={pathname} />
      <Container>
        <Row> { renderResults() } </Row>
      </Container>
    </>
  );
};

FindBooks.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  searchText: PropTypes.string,
};

export default FindBooks;
