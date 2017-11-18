import React, { Component } from 'react';
import * as BooksAPI from './BooksAPI'
import './App.css'


class BookShelfSelector extends Component {

	changeBookShelf (event){

        if (event.target.value){
        	this.props.book.shelf = event.target.value;
        	this.props.onBookShelfSelection();
        }
    }



	render() {

		return (
			<div className="book-shelf-changer" onChange={this.changeBookShelf} >
				<select>
					<option value="none" disabled>Move to...</option>
					<option value="currentlyReading">Currently Reading</option>
					<option value="wantToRead">Want to Read</option>
					<option value="read">Read</option>
					<option value="none">None</option>
		  		</select>
			</div>
		)
	}
}


module.exports = BookShelfSelector;