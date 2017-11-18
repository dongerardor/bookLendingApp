import React from 'react';
import './App.css'
import BookThumb from './BookThumb'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

class BookList extends React.Component {

	render() {

		let books;

		if (this.props.query !== 'undefined' && this.props.query !== '' && this.props.shelf === 'searching'){
			
			const match = new RegExp(escapeRegExp(this.props.query), 'i');
			
			books = this.props.books.filter(
	      		function(book){
					return match.test(book.title)
	      		}, this);

		} else {

			books = this.props.books.filter((book) => book.shelf === this.props.shelf);
		}


		if (typeof this.props.shelf === 'undefined'){
			return (<p>Loading...</p>);
		} else {
			return (

				<ol className="books-grid">
				{
					books.map((book) => 
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
}

module.exports = BookList