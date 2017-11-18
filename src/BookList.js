import React, { Component } from 'react';
import './App.css'
import BookThumb from './BookThumb'

class BookList extends React.Component {

	render() {

		if (typeof this.props.shelf === 'undefined'){
			return (<p>Loading...</p>);
		} else {
			return (

			<ol className="books-grid">
				{
					this.props.books.filter((book) => book.shelf === this.props.shelf)
					.map((book) => 
						<li key={book.id}>
							<BookThumb 
								book={book}
								onChangeShelf={this.props.changeShelf}/>
						</li>
					)
				}
			</ol>
			)
		}
	}
}

module.exports = BookList