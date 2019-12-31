import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Book extends Component {
  constructor (props) {
    super(props)
    this.state = {
      book: {}
    };
    this.handleMarkBookAsRead = this.handleMarkBookAsRead.bind(this)
  }

  componentDidMount () {
    const bookId = this.props.match.params.id

    axios.get(`/api/books/${bookId}`).then(response => {
      let author = JSON.parse(response.data.author);
      response.data['author'] = author;
      this.setState({
        book: response.data
      })
    })
  }
  
  handleMarkBookAsRead () {
    const { book } = this.state;

      axios.put(`/api/books/${book.id}`)
      .then((response) => {
        book.is_read = response.data.is_read;
        this.setState({
          book
        })
      })
  }

  render () {
    const { book } = this.state;
    
    if (!book.id) {
      return null;
    }
    let authors = <div>
                    <p>By: {book.author[0]}</p>
                  </div>;
    if (book.author.length > 1) {
      let authors =
      <div>
        {
          book.author.map((author, i) => {
            return (
                <p key={i}>By: {book.author[i]}</p>
            )
          })
        }
      </div>
    }
    
    let markBookStatus = book.is_read ? 'Mark as Unread' : 'Mark as Read';
    let bookStatusBanner = book.is_read ? <div className="book-is-read">You Read This!</div>
 : '';

    return (
      <div className="book-container">
        <div className="book">
          <div className="book-header">
            <h2 className="book-title">{`${book.title} - ${book.subtitle}`}</h2>
          </div>
          <div className="book-body">
            <h3>{authors}</h3>
            <div className="read-banner-container">
              <img className="single-cover-image" src={book.cover_image_url} alt={`${book.title} cover`}></img>
              {bookStatusBanner}
            </div>
            <p className="publish-date">Published: {book.publish_date}</p>
            <p className="publisher">Publisher: {book.publisher}</p>
            <p>{book.book_description}</p>

            <button 
              className="btn btn-primary btn-sm"
              onClick={this.handleMarkBookAsRead}
            >
              {markBookStatus}
            </button>
            <hr />
          </div>
        </div>
        <Link className='navbar-brand' to='/'><button className="back-to-list-btn">Back to List</button></Link>
      </div>
    )
  }
}

export default Book;
