import React from 'react';
import './App.css'
import BookThumb from './BookThumb'
import escapeRegExp from 'escape-string-regexp'

class BookList extends React.Component {



	render() {

		let booksToShow;

		if(this.props.queryBooks && this.props.queryBooks.length) {
			
			booksToShow = this.props.queryBooks.map(function (queryBook){

				const bookInShelf = this.props.books.filter((book) => book.id === queryBook.id);

				if (!!bookInShelf.length){
					queryBook = bookInShelf[0]
				}

				return queryBook;

			}, this);

		} else if (this.props.books && this.props.books.length) {
			
			booksToShow = this.props.books.filter((book) => book.shelf === this.props.shelf);
			
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
							onChangeShelf={this.props.changeShelf}/>
					</li>
			)}
			</ol>
		)
	}
}

module.exports = BookList