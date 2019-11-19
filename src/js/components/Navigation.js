import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { Navbar, Nav, Form, FormControl, Button } from 'react-bootstrap';

const Navigation = () => {
  const [searchText, setSearchText] = useState( '' );
  const history = useHistory();

  const searchOnChange = ( { target: { value } } ) => {
    setSearchText( value );
  };

  const returnRedirect = () => {
    return history.push( `/FindBooks/${searchText.replace( / /g, '+' )}` );
  };

  const handleKeyPress = ( { key } ) => {
    if ( key === 'Enter' ) {
      returnRedirect();
    }
  };

  return (
    <Navbar fixed="top" bg="dark" className="mb-5" variant="dark">
      <Navbar.Brand>Library</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={NavLink} to="/MyBooks">
          <span id="NavMyBooks" >My Books</span>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/AnnualReport" >
          <span id="NavAnnualReport">Annual Report</span>
        </Nav.Link>
      </Nav>
      <Form inline>
        <FormControl
          type="text"
          onChange={searchOnChange}
          onKeyDown={handleKeyPress}
          placeholder="Find books"
          className="mr-sm-2"
        />
        <Button variant="outline-primary" onClick={returnRedirect} >Search</Button>
      </Form>
    </Navbar>
  );
};

export default Navigation;
