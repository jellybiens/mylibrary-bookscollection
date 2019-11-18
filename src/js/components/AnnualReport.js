import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col, Table } from 'react-bootstrap';
import NumericInput from 'react-numeric-input';
import Navigation from './Navigation';
import BookShelves from './BookShelves';
import { split } from '../shared';

const AnnualReport = ( { location: { pathname } } ) => {
  const [not, rdn, fin] = split();
  const [booksInView, setBooksInView] = useState( {} );
  const [selectedRow, setSelectedRow] = useState( null );
  const [viewYear, setViewYear] = useState( new Date().getFullYear() );

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const renderReport = () => {
    // create array of month values
    const monthsCount = {};
    Object.keys( fin ).map(
        ( key_id, i ) => {
          const date = new Date( fin[key_id].date );
          const date_id = monthNames[date.getMonth()] + '-' + date.getFullYear();
          monthsCount[date_id] = monthsCount[date_id] ?
            Object.assign( monthsCount[date_id], { [key_id]: fin[key_id] }, {} ) :
            { [key_id]: fin[key_id] };
        } );

    // create table of months for set year, input values of array vals set above
    const tableRows = [];
    for ( let i = 0; i < 12; i++ ) {
      const month_id = monthNames[i] + '-' + viewYear;
      const total = monthsCount[month_id] ? Object.keys( monthsCount[month_id] ).length : 0;
      const onClickHandler = monthsCount[month_id] ?
        () => loadBookShelves( monthsCount[month_id], month_id ) :
        () => loadBookShelves( {}, month_id );
      tableRows.push(
          <tr key={month_id}
            className={selectedRow === month_id ? 'highlight' : ''}
            onClick={onClickHandler}
          >
            <th>{monthNames[i]}</th>
            <td>{total}</td>
          </tr>
      );
    }

    return (
      <Table striped bordered hover varient="dark" size="sm" className="ReportTable">
        <tbody>
          <tr
            className={selectedRow === 'not' ? 'highlight' : ''}
            onClick={() => loadBookShelves( not, 'not' )}
          >
            <th>Books to read</th>
            <td>{Object.keys( not ).length}</td>
          </tr>
          <tr
            className={selectedRow === 'rdn' ? 'highlight' : ''}
            onClick={() => loadBookShelves( rdn, 'rdn' )}
          >
            <th>Currently reading</th>
            <td>{Object.keys( rdn ).length}</td>
          </tr>
          <tr className="dateRow">
            <th colSpan="2">
              <div className="inputContainer">
                <NumericInput
                  defaultValue="2019"
                  min={ 2000 }
                  max={new Date().getFullYear()}
                  step={ 1 }
                  onChange={( valueAsNumber ) => setViewYear( valueAsNumber )}
                  precision={ 0 }
                />
              </div>
            </th>
          </tr>
          {tableRows}
        </tbody>
      </Table>
    );
  };
  const loadBookShelves = ( books, row ) => {
    setBooksInView( books );
    setSelectedRow( row );
  };

  const renderShelvesDefault = () => {
    return Object.entries( booksInView ).length === 0 ?
    ( <Col style={{ 'textAlign': 'center' }} > Select row to view books. </Col> ) :
    ( <BookShelves books={booksInView} pathname={pathname} /> );
  };

  return (
    <>
      <Navigation path={pathname} />
      <Container fluid className="AnnualReportContainer">
        <Row>
          <Col xs={12} sm={12} md={4}>
            <Container className="ReportContainer">
              <Row> { renderReport() } </Row>
            </Container>
          </Col>
          <Col xs={12} sm={12} md={8}>
            <Container className="ShelvesContainer">
              <Row> { renderShelvesDefault() } </Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </>
  );
};

AnnualReport.propTypes = {
  location: PropTypes.object,
};

export default AnnualReport;
