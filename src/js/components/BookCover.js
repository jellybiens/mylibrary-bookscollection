import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import coverUnknown from '../../imgs/covernotfound.jpg';

const BookCover = (
    {
      bookObj,
      bookInCollection,
      updateCollection,
      pathname,
    },
) => {
  const {
    key_id,
    title,
    cover_i,
    author_name,
    first_publish_year,
    isbn,
    read_status,
    date,
  } = bookObj;
  const cover = cover_i ?
    `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg` :
    coverUnknown;

  const [inCollection, setInCollection] = useState( bookInCollection );
  const [readStatus, setReadStatus] = useState( read_status );
  const [finishDate, setFinishDate] = useState( new Date( date ) );


  // FindBooks
  const handleAddToCollection = () => {
    const bookToUpdate = {
      ...bookObj,
      read_status: 'not',
      date: new Date(),
    };
    setInCollection( true );
    updateCollection( bookToUpdate );
  };

  // MyBooks
  const handleSelectChange = ( { target: { value } } ) => {
    const bookToUpdate = {
      ...bookObj,
      read_status: value,
      date: new Date(),
    };
    setReadStatus( value );
    setFinishDate( new Date() );
    updateCollection( bookToUpdate );
  };

  const handleDateChange = ( value ) => {
    const bookToUpdate = {
      ...bookObj,
      read_status: 'fin',
      date: value,
    };
    setFinishDate( value );
    updateCollection( bookToUpdate );
  };

  const renderBookCoverOptions = () => {
    if ( pathname === '/MyBooks' ) {
      return (
        <>
          <div className="CardBookStatus" >
            <Form>
              <Form.Control className="statusDd" value={readStatus} onChange={handleSelectChange} as="select">
                <option value="not">Not read</option>
                <option value="rdn">Reading</option>
                <option value="fin">Finished</option>
              </Form.Control>
            </Form>
          </div>
          <div className="CardFinishDate" >
            { readStatus === 'fin' &&
              <DatePicker
                id="datePicker"
                className="form-control"
                selected={finishDate}
                onChange={handleDateChange}
                dateFormat="MM/yyyy"
                showMonthYearPicker
              />
            }
          </div>
        </>
      );
    } else if ( pathname.startsWith( '/FindBooks' ) ) {
    // Button to add to collection for FindBooks, can be disabled if already owned
      return (
        <div className="CardButton" >
          <Button
            disabled={inCollection}
            className={inCollection ? 'disabled' : 'addBook'}
            variant={inCollection ? 'outline-success' : 'outline-primary'}
            onClick={handleAddToCollection}
          >
            {inCollection ? 'In collection' : 'Add to my books'}
          </Button>
        </div>
      );
    }
  };

  return (
    <Card key={key_id}>
      <Card.Body className={
        inCollection && pathname.startsWith( '/FindBooks' ) ?
        'CardBody disabled' : 'CardBody'
      }>
        <Card.Title className="CardTitle">{title}</Card.Title>
        <Card.Subtitle className="CardAuthor text-muted">{author_name}</Card.Subtitle>
        <Card.Subtitle className="CardYear text-muted">{first_publish_year ? first_publish_year : 'Unknown Year'}</Card.Subtitle>
        <div className="CardImage">
          <Image rounded
            className="bookThumb"
            src={cover}
          />
        </div>
        <Card.Subtitle className="CardIsbn text-muted">{'ISBN: ' + isbn}</Card.Subtitle>
        {renderBookCoverOptions()}
      </Card.Body>
    </Card>
  );
};

BookCover.propTypes = {
  bookObj: PropTypes.shape( {
    key_id: PropTypes.string,
    title: PropTypes.string,
    cover_i: PropTypes.any,
    author_name: PropTypes.string,
    first_publish_year: PropTypes.number,
    isbn: PropTypes.string,
    read_status: PropTypes.string,
    date: PropTypes.any,
  } ),
  bookInCollection: PropTypes.bool,
  updateCollection: PropTypes.func,
  pathname: PropTypes.string,
};

BookCover.defaultProps = {
  bookObj: {
    key_id: 'xxxxxxxx',
    title: 'Uknown Title',
    cover_i: null,
    author_name: 'Uknown Author',
    first_publish_year: null,
    isbn: '-',
    read_status: 'not',
    date: new Date(),
  },
  bookInCollection: false,
  updateCollection: () => {},
  pathname: '/MyBooks',
};


export default BookCover;
