import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AddBook extends Component {
  constructor (props) {
    super(props)
    this.state = {
      search_term: '',
      book_results: [],
      errors: []
    }
    this.handleFieldChange = this.handleFieldChange.bind(this)
    this.handleAddBook = this.handleAddBook.bind(this)
    this.cleanBookData = this.cleanBookData.bind(this);
    this.fetchBooks = this.fetchBooks.bind(this);
    this.onSubmitHandler = this.onSubmitHandler.bind(this);
  }

  handleFieldChange (e) {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleAddBook (bookToAdd) {
    const book = this.cleanBookData(bookToAdd);
    const { history } = this.props;

    axios.post('/api/books', book)
      .then(response => {
        history.push('/')
      })
      .catch(error => {
        this.setState({
          errors: error.response.data.errors
        })
      })
  }
  
  cleanBookData(bookResults) {
    let title = bookResults.volumeInfo.title ? bookResults.volumeInfo.title : 'NULL';
    let subtitle = bookResults.volumeInfo.subtitle ? bookResults.volumeInfo.subtitle : 'NULL';
    let bookDescription = bookResults.volumeInfo.description ? bookResults.volumeInfo.description : 'NULL';
    let publishedDate = bookResults.volumeInfo.publishedDate ? bookResults.volumeInfo.publishedDate : 'NULL';
    let publisher = bookResults.volumeInfo.publisher ? bookResults.volumeInfo.publisher : 'NULL';
    let coverImageUrl = `https://books.google.com/books/content?id=${bookResults.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`
    let authors = ['Unknown'];
    if (bookResults.volumeInfo.authors) {
      authors = bookResults.volumeInfo.authors;
    }
    let cleanedBook = {
      title,
      subtitle,
      author: JSON.stringify(authors),
      book_description: bookDescription,
      publish_date: publishedDate,
      publisher,
      cover_image_url: coverImageUrl,
    }
    return cleanedBook;
  }
  
  async fetchBooks() {
    let API_URL = `https://www.googleapis.com/books/v1/volumes`;
    // Ajax call to API using Axios
    const result = await axios.get(`${API_URL}?q=${this.state.search_term}&maxResults=20`);
    // Books result
    this.setState({
      book_results: result.data,
    })
  }

// Submit handler
  onSubmitHandler(e) {
    e.preventDefault();
    this.fetchBooks();
  }

  render () {
    let { book_results } = this.state;
    let searchResults;
    
    if (book_results.items) {
      searchResults =
        <div className="results-container">
          {                    
              book_results.items.map((book, i) => {
                let authors = ['Unknown'];
                if (book.volumeInfo.authors) {
                  authors = book.volumeInfo.authors;
                }
                return (
                  <div className="results-book" key={i}>
                    <div>
                      <img alt={`${book.volumeInfo.title} book`} src={`http://books.google.com/books/content?id=${book.id}&printsec=frontcover&img=1&zoom=1&source=gbs_api`} />
                      <div>
                        <h3 className="book-title">{book.volumeInfo.title}</h3>
                        {
                          authors.map((author, i) => {
                            return(
                              <h3 key={i}>By: {authors[i]}</h3>
                            )
                          })
                        }
                      </div>
                    </div>
                    <button 
                      className='btn btn-primary' 
                      onClick={() => this.handleAddBook(book)}
                    >Add Book</button>
                </div>
                  );
                })
          }
        </div>
    }
    return (
      <div className='add-book-container'>
        <div className='add-book'>
          <section>
            <form onSubmit={this.onSubmitHandler}>
              <label>
                <p>Search for books</p>
                <input
                  name='search_term'
                  placeholder="ISBN, Title, or Author"
                  type="search"
                  value={this.state.search_term}
                  onChange={this.handleFieldChange}
                />
                <button type="submit">Search</button>
              </label>
            </form>
          </section>
          {searchResults}
        </div>
        <Link className='navbar-brand' to='/'><button className="back-to-list-btn">Back to List</button></Link>
      </div>
    )
  }
}

export default AddBook;
