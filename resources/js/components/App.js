import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import BookList from './BookList';
import AddBook from './AddBook';
import Book from './Book';

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Switch>
            <Route exact path='/' component={BookList} />
            <Route path='/create' component={AddBook} />
            <Route path='/:id' component={Book} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
