import React from 'react';
import PropTypes from 'prop-types';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import Navigation from './Navigation';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import BookShelves from './BookShelves';

const BOOKS_SEARCH_QUERY = gql`
  query BooksSearchQuery($queryString: String = "Lord+of+the+rings") {
    booksResults: booksResults(queryString: $queryString) {
      key_id
      title
      cover_i
      author_name
      first_publish_year
      isbn
    }
  }
`;

const FindBooks = ( { location: { pathname }, match: { params: { queryString } } } ) => {
  const { loading, error, data } = useQuery( BOOKS_SEARCH_QUERY, {
    variables: { queryString },
  } );

  const renderResults = () => {
    if ( loading ) {
      return (
        <Col>
          <Spinner className="d-block m-auto" animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
        </Col>
      );
    }
    if ( error ) return <span>An error occurred.</span>;

    const { booksResults = [] } = data;
    return <BookShelves books={booksResults} pathname={pathname} />;
  };

  return (
    <>
      <Navigation path={pathname} />
      <Container>
        <Row>
          { renderResults() }
        </Row>
      </Container>
    </>
  );
};

FindBooks.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
  queryString: PropTypes.string,
};

export default FindBooks;
