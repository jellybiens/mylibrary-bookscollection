import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Button, AppBar, Toolbar, Typography, Link, InputBase } from '@material-ui/core';

const Navigation = () => {
  const [queryString, setQueryString] = useState( '' );
  const history = useHistory();

  const searchOnChange = ( { target: { value } } ) => {
    setQueryString( value );
  };

  const returnRedirect = () => {
    return history.push( `/FindBooks/${queryString.replace( / /g, '+' )}` );
  };

  const handleKeyPress = ( { key } ) => {
    if ( key === 'Enter' ) {
      returnRedirect();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" noWrap>
                Material-UI
        </Typography>
        <Link conponent={NavLink} to="/MyBooks">
                My Books
        </Link>
        <Link component={NavLink} to="/MyBooks">
                Annual Report
        </Link>
        <InputBase
          placeholder="Search library…"
          inputProps={
            {
              'aria-label': 'search',
              'onChange': searchOnChange,
              'onKeyDown': handleKeyPress,
            }
          }
        />
        <Button variant="outline-primary" onClick={returnRedirect} >Search</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
