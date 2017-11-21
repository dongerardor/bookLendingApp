import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BookList from './BookList';
import { Link } from 'react-router-dom';
import { Route } from 'react-router-dom';

/**
* @class BookThumb
* @description Main app
*/
class BooksApp extends React.Component {

	state = {
		query: '',
		books: [],
		queryBooks: []
	}

	/**
	* @function componentDidMount
	* @description Event which loads all the books in user's shelf, setting the state with them
	* @return Void
	*/
	componentDidMount() {
		BooksAPI.getAll().then((books) => {
			this.setState( {
				books
			})
		})
	}

	/**
	* @function onChangeShelf
	* @description Event which updates the shelf of a book
	* @param {Object} updatedBook Book to be updated 
	* @param {string} shelf One of the following values: 'wantToRead', 'currentlyReading', 'read', 'none'
	* @return Void
	*/
	onChangeShelf(updatedBook, shelf){
		
		BooksAPI.update(updatedBook, shelf).then(() => {
			
			BooksAPI.getAll().then((books) => {
				this.setState( {
					books
				})
			})

			if (!!this.state.query){
				BooksAPI.search(this.state.query, 10).then((queryBooks) => {
					this.setState( {
						queryBooks
					})
				}) 
			}
		})
	}

	/**
	* @function updateQuery
	* @description Updates the query state
	* @param {string} query
	* @return Void
	*/
	updateQuery = (query) => {
		
		this.setState({ query: query });

		BooksAPI.search(this.state.query, 10).then((queryBooks) => {
			this.setState({
				queryBooks
			})
		})
	}

	/**
	* @function clearQuery
	* @description Clear query
	* @return Void
	*/
	clearQuery = () => {
		this.setState({ query: '', queryBooks: [] })
	}

	/**
	* @function render
	* @description Default React render fnc
	* @return jsx expression. Three sections page or search page
	*/
  	render() {
		return (
			<div className="app">
				<Route
					path='/search'
					render={
						() => (
							<div className="search-books">
								<div className="search-books-bar">
									
									<Link 
										to='/'
										className="close-search"
										onClick={(event) => this.clearQuery()}>
									</Link>
									
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
										changeShelf={this.onChangeShelf.bind(this)}
										query={this.state.query}
										queryBooks={this.state.queryBooks}
									/>
								</div>
							</div>
						)
					}
				/>
				
				<Route
					exact path='/'
					render={
						() => (
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
									<Link
										to='/search'
										onClick={(event) => this.clearQuery()}>
										Add a book
									</Link>
								</div>
							</div>
						)
					}
				/>
			</div>
		)
	}
}

export default BooksApp