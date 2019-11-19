import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import puppeteer from 'puppeteer';
import 'babel-polyfill';

it( 'renders without crashing', () => {
  const div = document.createElement( 'div' );
  ReactDOM.render( <App />, div );
  ReactDOM.unmountComponentAtNode( div );
} );

it( 'should add a book to collection and set it to finished reading in localStorage', async () => {
  jest.setTimeout( 300000 ); // golly my laptop is slow
  const browser = await puppeteer.launch( {
    headless: false,
    slowMo: 80,
    args: ['--window-size=1080,720'],
  } );
  const page = await browser.newPage();
  await page.goto( 'http://localhost:3000/FindBooks/harry+potter' );

  await page.waitFor( 5000 );

  const localStAdd = await page.evaluate( () => {
    const elements = document.getElementsByClassName( 'addBook' );
    elements[0].click();
    return JSON.parse( localStorage.getItem( 'booksCollection' ) );
  } );

  expect( Object.keys( localStAdd ).length ).toEqual( 1 );

  await page.click( '#NavMyBooks' );
  await page.waitFor( 2000 );

  await page.select( '.statusDd', 'fin' );
  await page.waitFor( 500 );
  await page.click( '#datePicker' );
  await page.waitFor( 500 );
  await page.click( '.react-datepicker__month-2' );
  await page.waitFor( 500 );

  const localStEdit = await page.evaluate( () => {
    return JSON.parse( localStorage.getItem( 'booksCollection' ) );
  } );

  await page.waitFor( 500 );
  await page.close();

  const today = new Date();
  const dateSet = new Date( `01 March ${today.getFullYear()}` );
  const key_id = Object.keys( localStEdit )[0];
  const localStDate = new Date( localStEdit[key_id].date );

  expect( localStDate.getMonth() ).toEqual( dateSet.getMonth() );
  expect( localStDate.getFullYear() ).toEqual( dateSet.getFullYear() );
} );
