import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  static propTypes = {
    onAddBook: PropTypes.func.isRequired
  }

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({ query })
    if (query) {
      BooksAPI.search(query).then(books => {
        if (books.error) {
          this.setState({ books: [] })
          return
        }
        if (books) {
          this.setState({ books })
        } else {
          this.setState({ books: [] })
        }
      })
    } else {
      this.setState({ books: [] })
    }
  }

  render(props) {
    const { onAddBook } = this.props
    const { query, books } = this.state

    return (
      <div className='search-books'>
        <div className='search-books-bar'>
          <Link to='/'
                className='close-search'>Close</Link>
          <div className='search-books-input-wrapper'>
            <input type='text'
                   placeholder='Search by title or author'
                   value={query}
                   onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className='search-books-results'>
          <ol className='books-grid'>
            {books.map((book) => (
              <li key={book.id}>
                <div className='book'>
                  <div className='book-top'>
                    {book.imageLinks ? (
                      <div className='book-cover'
                           style={{
                             width: 128,
                             height: 193,
                             backgroundImage: 'url("' +
                                 book.imageLinks['thumbnail'] + '")'
                           }}></div>
                    ) : (
                      <div className='book-cover'
                         style={{
                           width: 128,
                           height: 193,
                           backgroundColor: 'black'
                          }}></div>
                    )}
                    <div className='book-shelf-changer'>
                      <select value={book.shelf || 'none'}
                              onChange={(event) => onAddBook(book, event.target.value)}>
                        <option value='none' disabled>Move to...</option>
                        <option value='currentlyReading'>Currently Reading</option>
                        <option value='wantToRead'>Want to Read</option>
                        <option value='read'>Read</option>
                        <option value='none'>None</option>
                      </select>
                    </div>
                  </div>
                  <div className='book-title'>{ book.title }</div>
                  <div className='book-authors'>{ book.authors }</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks