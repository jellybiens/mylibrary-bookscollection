import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import { AppBar, Tabs, Tab, Button, InputBase, Grid } from '@material-ui/core';
import useStyles from './styles';
import SearchIcon from '@material-ui/icons/Search';


const Navigation = ( { path } ) => {
  const [queryString, setQueryString] = useState( '' );
  const history = useHistory();
  const classes = useStyles();

  const searchOnChange = ( { target: { value } } ) => {
    setQueryString( value );
  };

  const returnRedirect = () => {
    const qs = queryString.replace( / /g, '+' );
    if ( qs === '' ) return;
    return history.push( `/FindBooks/${qs}` );
  };

  const handleKeyPress = ( { key } ) => {
    if ( key === 'Enter' ) {
      returnRedirect();
    }
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Grid container spacing={3}>
          <Grid item xs={8} >
            <Tabs
              className={classes.tabs}
              value={path}
              aria-label="nav tabs example"
              variant="fullWidth"
            >
              <Tab value={'/MyBooks'} label="My Books" component={NavLink} to="/MyBooks" />
              <Tab value={'/AnnualReport'} label="Annual Report" component={NavLink} to="/AnnualReport" />
            </Tabs>
          </Grid>
          <Grid item xs={2} >
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={
                  {
                    'onChange': searchOnChange,
                    'onKeyDown': handleKeyPress,
                  }
                }
              />
            </div>
          </Grid>
          <Grid item xs={2}>
            <Button
              className={classes.buttonSearch}
              onClick={returnRedirect}
              variant="contained"
              color="primary"
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </AppBar>
    </div>
  );
};

Navigation.propTypes = {
  path: PropTypes.string,
};

export default Navigation;
