import React from 'react'
import PropTypes from 'prop-types'
import * as BooksAPI from './BooksAPI'
import './App.css'
import BookList from './BookList'



class BooksApp extends React.Component {

	state = {
	/**
	 * TODO: Instead of using this state variable to keep track of which page
	 * we're on, use the URL in the browser's address bar. This will ensure that
	 * users can use the browser's back and forward buttons to navigate between
	 * pages, as well as provide a good URL they can bookmark and share.
	 */
		showSearchPage: false,
		query: '',
		books: []
		
	}

	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState( {
				books
			})
		})
	}

	onChangeShelf(updatedBook, shelf){

		const updatedBooks = this.state.books.map(function(book){
			if (book.id === updatedBook.id){
				book.shelf = shelf;
			}
			return book;
		});

		this.setState( {
			'books': updatedBooks
		})
	}

	updateQuery = (query) => {
		this.setState({ query: query.trim() })
	}

	clearQuery = () => {
		this.setState({ query: '' })
	}


  	render() {

		return (
			<div className="app">
				
				{this.state.showSearchPage ? (
					
					<div className="search-books">
						<div className="search-books-bar">
						<a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
						<div className="search-books-input-wrapper">
						
							<input
								type='text'
								placeholder='Search by title or author'
								value={this.state.query}
								onChange={(event) => this.updateQuery(event.target.value)}
							/>

						</div>
					</div>
				
					<div className="search-books-results">
						<ol className="books-grid"></ol>

						<BookList
							books={this.state.books}
							shelf='searching'
							changeShelf={this.onChangeShelf.bind(this)}
							query={this.state.query}
						/>
					</div>
				</div>
				
				) : (
				
				<div className="list-books">
					<div className="list-books-title">
						<h1>MyReads</h1>
					</div>

					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Currently Reading</h2>
								<div className="bookshelf-books">
									
									 <BookList
										books={this.state.books}
										shelf='currentlyReading'
										changeShelf={this.onChangeShelf.bind(this)}
									/>
								</div>
							</div>
						</div>
					</div>

					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Want to read</h2>
								<div className="bookshelf-books">

									<BookList
										books={this.state.books}
										shelf='wantToRead'
										changeShelf={this.onChangeShelf.bind(this)}
									/>

								</div>
							</div>
						</div>
					</div>

					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Read</h2>
								<div className="bookshelf-books">
							
									<BookList
										books={this.state.books}
										shelf='read'
										changeShelf={this.onChangeShelf.bind(this)}
									/>

								</div>
							</div>
						</div>
					</div>

					<div className="open-search">
						<a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
					</div>
				</div>
				)}
			
			</div>
		)
	}
}

export default BooksApp