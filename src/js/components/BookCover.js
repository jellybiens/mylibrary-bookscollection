import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Image, Card, Button, Form } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import coverUnknown from '../../imgs/covernotfound.jpg';

const BookCover = (
    {
      key_id,
      title,
      cover_i,
      author_name,
      first_publish_year,
      isbn,
      read_status,
      date,
      myBooks,
      report,
      bookOwned,
      updateCollection,
    },
) => {
  const cover = cover_i ?
    `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg` :
    coverUnknown;

  const [inCollection, setInCollection] = useState( bookOwned );
  const [readStatus, setReadStatus] = useState( read_status );
  const [finishDate, setFinishDate] = useState( new Date( date ) );


  // FindBooks
  const handleAddToCollection = () => {
    const bookToAdd = {
      key_id,
      title,
      cover_i,
      author_name: [author_name[0]],
      first_publish_year,
      isbn: [isbn[0]],
      read_status: readStatus,
      date: new Date(),
    };
    setInCollection( true );
    updateCollection( bookToAdd );
  };

  // MyBooks
  const handleSelectChange = ( { target: { value: read_status } } ) => {
    const bookToUpdate = {
      key_id,
      title,
      cover_i,
      author_name: [author_name[0]],
      first_publish_year,
      isbn: [isbn[0]],
      read_status,
      date: finishDate,
    };
    setReadStatus( read_status );
    updateCollection( bookToUpdate );
  };

  const handleDateChange = ( date ) => {
    const bookToUpdate = {
      key_id,
      title,
      cover_i,
      author_name: [author_name[0]],
      first_publish_year,
      isbn: [isbn[0]],
      read_status: readStatus,
      date,
    };
    setFinishDate( date );
    updateCollection( bookToUpdate );
  };

  const renderOptions = () => {
    if ( myBooks ) {
      return (
        <>
          <div className="CardBookStatus" >
            <Form>
              <Form.Control className="statusDd" value={readStatus} onChange={handleSelectChange} as="select">
                <option value="not">Not read</option>
                <option value="rdn">Reading</option>
                <option id="optfin" value="fin">Finished</option>
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
    }
    // Button to add to collection for FindBooks, can be disabled is already owned
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
  };

  return (
    <Card>
      <Card.Body className={
        inCollection && !myBooks && !report ?
        'CardBody disabled' : 'CardBody'
      }>
        <Card.Title className="CardTitle">{title}</Card.Title>
        <Card.Subtitle className="CardAuthor text-muted">{author_name[0]}</Card.Subtitle>
        <Card.Subtitle className="CardYear text-muted">{first_publish_year ? first_publish_year : 'Unknown Year'}</Card.Subtitle>
        <div className="CardImage">
          <Image rounded
            className="bookThumb"
            src={cover}
          />
        </div>
        <Card.Subtitle className="CardIsbn text-muted">{'ISBN: ' + isbn[0]}</Card.Subtitle>
        {!report && renderOptions()}
      </Card.Body>
    </Card>
  );
};

BookCover.propTypes = {
  key_id: PropTypes.string,
  title: PropTypes.string,
  cover_i: PropTypes.any,
  author_name: PropTypes.arrayOf( PropTypes.string ),
  first_publish_year: PropTypes.number,
  isbn: PropTypes.arrayOf( PropTypes.string ),
  read_status: PropTypes.string,
  date: PropTypes.any,
  myBooks: PropTypes.bool,
  report: PropTypes.bool,
  bookOwned: PropTypes.bool,
  updateCollection: PropTypes.func,
};

BookCover.defaultProps = {
  key_id: 'xxxxxxxx',
  title: 'Uknown Title',
  cover_i: null,
  author_name: ['Uknown Author'],
  first_publish_year: null,
  isbn: ['-'],
  read_status: 'not',
  myBooks: false,
  report: false,
  bookOwned: false,
  updateCollection: () => {},
};


export default BookCover;
