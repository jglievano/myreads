import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'

import './App.css'

class BooksApp extends Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.updateAllBooks()
  }

  updateAllBooks() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  addBook = (book, shelf) => {
    book.shelf = shelf
    this.setState((state) => ({
      books: state.books.concat(book)
    }))
    BooksAPI.update(book, shelf)
  }

  updateBook = (book, shelf) => {
    this.setState((state) => ({
      books: state.books
          .map(b => {
            if (b.id === book.id) {
              b.shelf = shelf
            }
            return b
          })
    }))
    BooksAPI.update(book, shelf)
  }

  render() {
    return (
      <div className='app'>
        <Route exact path='/' render={() => (
          <ListBooks onUpdateBook={this.updateBook}
                     books={this.state.books} />
        )}/>
        <Route path='/search' render={() => (
          <SearchBooks onAddBook={this.addBook} />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
