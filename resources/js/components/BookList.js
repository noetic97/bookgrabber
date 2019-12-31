import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class BookList extends Component {
  constructor () {
    super()
    this.state = {
      books: [],
      errors: [],
      deleteMessage: '',
      sortTerm: 'default',
    };
    this.handleDeleteBook = this.handleDeleteBook.bind(this);
    this.setSortOrder = this.setSortOrder.bind(this);
  };

  componentDidMount () {
    axios.get('/api/books').then(response => {
      if(response.data.length) {
        response.data.forEach((book) => {
          let author = JSON.parse(book.author);
          book['author'] = author;
        })
        this.setState({
          books: response.data
        })
      } else {
        this.setState({
          books: 'Add Books to Create a List'
        })
      }
    })
  }
  
  handleDeleteBook(id, title) {
    const { books } = this.state;

    axios.post(`/api/books/${id}`, {_method: 'delete'})
      .then(response => {
        let newBooks = books.filter(e => e.id !== id);
        
        this.setState({
          deleteMessage: `${title} was successfully deleted.`,
          books: newBooks,
        })
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }
  
  setSortOrder(sortType) {
    const { books } = this.state;

    let option = sortType.target.value;
    let sortedBooks;

    if (option === 'add-date-desc') {
      let sortedBooks = [...books].sort((a, b) => {
        return a['created_at'] >= b['created_at'] ? -1 : 1;
      })
      this.setState({ 
        sortTerm: option,
        books: sortedBooks
      });
    }
    if (option === 'add-date-asc') {
      let sortedBooks = [...books].sort((a, b) => {
        return a['created_at'] >= b['created_at'] ? 1 : -1;
      })
      this.setState({ 
        sortTerm: option,
        books: sortedBooks
      });
    }
    if (option === 'title' || option === 'author' || option === 'is_read') {
      let sortedBooks = [...books].sort((a, b) => {
        if (option === 'is_read') {
          return a[option] >= b[option] ? -1 : 1;
        } else {
          return a[option] >= b[option] ? 1 : -1;
        }
      })
      this.setState({ 
        sortTerm: option,
        books: sortedBooks
      });
    }
  }

  render () {
    const { books, sortTerm, deleteMessage } = this.state;
    
    if (!books.length) {
      return null;
    }
    
    let bookList = typeof books === 'object' ? books.map((book) => {
      let bookStatusBanner = book.is_read ? <div className="book-is-read">You Read This!</div>
   : '';
      return (
        <div className='list-book' key={book.id}>
          <Link
          className='list-group-item list-group-item-action d-flex justify-content-between align-items-center'
          to={`/${book.id}`}
          >
            <p className='book-title'>{book.title}</p>
          <p className='book-author'>{book.author[0]}</p>
            <div className="read-banner-container">
              <img className='multi-cover-image' src={book.cover_image_url} alt={`${book.title} cover`}></img>
            {bookStatusBanner}
            </div>
          </Link>
          <br></br>
          <button 
          className='btn btn-primary btn-sm'
          onClick={() => this.handleDeleteBook(book.id, book.title)}
          >
            Delete This Book
          </button>
        </div>
      )})
    : 'Add Books to Create a List';

    return (
      <div className='booklist-container'>
        <div className='list'>
          <section className='list-header'>
            <h4>Your Books</h4>
            <section className="list-header-actions">
              <Link className='btn btn-primary btn-sm mb-3' to='/create'>
                <button className="btn btn-primary btn-sm">Add a New Book</button>
              </Link>
              <select 
                name="booklist-sorter" 
                id="booklist-sorter"
                value={sortTerm}
                onChange={this.setSortOrder}
              >
                <option value="default" disabled>Sort Your Books</option>
                <option value="add-date-desc">Date Added Descending</option>
                <option value="add-date-asc">Date Added Ascending</option>
                <option value="title">Title (alphabetical)</option>
                <option value="author">Author (alphabetical)</option>
                <option value="is_read">Marked as Read</option>
              </select>
            </section>
          </section>
          <div className='list-body'>
            {bookList}
          </div>
        </div>
      </div>
    )
  }
}

export default BookList;