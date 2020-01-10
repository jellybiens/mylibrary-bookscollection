import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import Navigation from '../Navigation';
import BookShelves from '../BookShelves';

const MyBooks = ( { location: { pathname } } ) => {
  const renderBookCovers = () => {
    const booksCollection = JSON.parse( localStorage.getItem( 'booksCollection' ) ) || {};

    if ( Object.entries( booksCollection ).length === 0 ) {
      return (
        <Grid item xs={12} style={{ 'textAlign': 'center' }} >
          Search for books to add to your collection...
        </Grid>
      );
    }

    return <BookShelves books={booksCollection} pathname={pathname} />;
  };

  return (
    <>
      <Navigation path={pathname} />
      <Grid container spacing={3}>
        {renderBookCovers()}
      </Grid>
    </>
  );
};

MyBooks.propTypes = {
  location: PropTypes.object,
  match: PropTypes.object,
};

export default MyBooks;
