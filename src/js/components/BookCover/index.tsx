import React, { useState } from "react";
import PropTypes from "prop-types";
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@material-ui/core";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { IBookCoverProps, IBookCover } from "../../interfaces";
import useStyles from "./styles";
import coverUnknown from "./imgs/covernotfound.jpg";

const BookCover = (
    {
      bookObj,
      bookInCollection,
      updateCollection,
      pathname,
    }: IBookCoverProps,
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
  }: IBookCover = bookObj;
  const cover: string = cover_i ?
    `http://covers.openlibrary.org/b/id/${cover_i}-M.jpg` :
    coverUnknown;

  const classes = useStyles();
  const [inCollection, setInCollection] = useState<string>(bookInCollection);
  const [readStatus, setReadStatus] = useState(read_status);
  const [finishDate, setFinishDate] = useState(new Date(date));

  // FindBooks
  const handleAddToCollection = () => {
    const bookToUpdate = {
      ...bookObj,
      read_status: "not",
      date: new Date(),
    };
    setInCollection(true);
    updateCollection(bookToUpdate);
  };

  // MyBooks
  const handleSelectChange = ({ target: { value } }) => {
    const bookToUpdate = {
      ...bookObj,
      read_status: value,
      date: new Date(),
    };
    setReadStatus(value);
    setFinishDate(new Date());
    updateCollection(bookToUpdate);
  };

  const handleDateChange = (value) => {
    const bookToUpdate = {
      ...bookObj,
      read_status: "fin",
      date: value,
    };
    setFinishDate(value);
    updateCollection(bookToUpdate);
  };

  // MyBooks || FindBooks || AnnualReport = null
  const renderBookCoverOptions = () => {
    if (pathname === "/MyBooks") {
      return (
        <>
          <FormControl className={classes.formControl}>
            <InputLabel id="read-status-label">Status</InputLabel>
            <Select
              labelId="read-status-label"
              id="read-status-select"
              value={readStatus}
              onChange={handleSelectChange}
            >
              <MenuItem value="not">Not read</MenuItem>
              <MenuItem value="rdn">Reading</MenuItem>
              <MenuItem value="fin">Finished</MenuItem>
            </Select>
          </FormControl>

          { readStatus === "fin" &&
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              className={classes.datepicker}
              views={["year", "month"]}
              label="Finish date"
              minDate={new Date("2000-01-01")}
              maxDate={new Date()}
              format="MMM yyyy"
              value={finishDate}
              onChange={handleDateChange}
            />
          </MuiPickersUtilsProvider>
          }
        </>
      );
    } else if (pathname.startsWith("/FindBooks")) {
    // Button to add to collection for FindBooks, can be disabled if already owned
      return (
        <Button
          disabled={inCollection}
          className={classes.button}
          onClick={handleAddToCollection}
          variant="contained"
          color={inCollection ? "primary" : "secondary"}
        >
          {inCollection ? "In collection" : "Add to my books"}
        </Button>
      );
    }
  };

  return (
    <Card
      key={key_id}
      className={classes.card}
    >
      <CardHeader
        title={title}
        subheader={author_name + ", " + (first_publish_year ? first_publish_year : "Unknown Year")}
      />

      <CardContent>
        <img
          src={cover}
          className="bookThumb"
          alt={title + "_img"}
        />
        <Typography
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {"ISBN: " + isbn}
        </Typography>
      </CardContent>

      <CardActions disableSpacing={true}>
        {renderBookCoverOptions()}

      </CardActions>

    </Card>
  );
};

BookCover.propTypes = {
  bookObj: PropTypes.shape({
    key_id: PropTypes.string,
    title: PropTypes.string,
    cover_i: PropTypes.any,
    author_name: PropTypes.string,
    first_publish_year: PropTypes.number,
    isbn: PropTypes.string,
    read_status: PropTypes.string,
    date: PropTypes.any,
  }),
  bookInCollection: PropTypes.bool,
  updateCollection: PropTypes.func,
  pathname: PropTypes.string,
};

BookCover.defaultProps = {
  bookObj: {
    key_id: "xxxxxxxx",
    title: "Uknown Title",
    cover_i: null,
    author_name: "Uknown Author",
    first_publish_year: null,
    isbn: "-",
    read_status: "not",
    date: new Date(),
  },
  bookInCollection: false,
  updateCollection: () => {},
  pathname: "/MyBooks",
};

export default BookCover;
