import React from 'react';
import './App.css'
import BookThumb from './BookThumb'
import escapeRegExp from 'escape-string-regexp'
import PropTypes from 'prop-types'

/**
* @function BookList
* @description List book component
* @param {props} queryBooks (Array), books (Array), shelf (String)
* @return jsx expression
*/
function BookList (props) {
	
	let booksToShow;

	if(props.queryBooks && props.queryBooks.length) {
		
		booksToShow = props.queryBooks.map(function (queryBook){

			const bookInShelf = props.books.filter((book) => book.id === queryBook.id);

			if (!!bookInShelf.length){
				queryBook = bookInShelf[0]
			}

			return queryBook;

		}, this);

	} else if (props.books && props.books.length) {
		
		booksToShow = props.books.filter((book) => book.shelf === props.shelf);
		
	} else {

		return (<p>Loading...</p>);

	}

	return (

		<ol className="books-grid">
		{

			booksToShow.map((book) => 
				<li key={book.id}>
					<BookThumb 
						book={book}
						onChangeShelf={props.changeShelf}/>
				</li>
		)}
		</ol>
	)
}

BookList.PropTypes = {
	queryBooks: PropTypes.array,
	books: PropTypes.array,
	shelf: PropTypes.string
}

module.exports = BookList