import React from 'react';
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom';
import MyBooks from './components/MyBooks';
import FindBooks from './components/FindBooks';
import AnnualReport from './components/AnnualReport';


const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>

          <Redirect path="/" to="/MyBooks" exact />

          <Route path="/MyBooks" component={MyBooks} />
          <Route path="/FindBooks/:searchText" component={FindBooks} />
          <Route path="/AnnualReport" component={AnnualReport} />

        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
