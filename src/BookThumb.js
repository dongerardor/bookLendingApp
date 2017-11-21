import React, { Component } from 'react';
import './App.css'
import PropTypes from 'prop-types'

/**
* @class BookThumb
* @description Display one book
*/
class BookThumb extends Component {

	/**
	* @function updateShelf
	* @description Updates the shelf of the book
	* @param {string} shelf One of the following values: 'wantToRead', 'currentlyReading', 'read', 'none'
	* @return Void
	*/
	updateShelf(shelf){
		this.props.onChangeShelf(this.props.book, shelf);
	}

	/**
	* @function render
	* @description Default React render fnc
	* @return jsx expression
	*/
	render(){

		if (this.props.book && this.props.book.constructor === Object){

			return (
				<div className="book">
					<div className="book-top">

						<div className='book-cover'
							style={{
								width: 128, height: 193, backgroundImage: `url(${this.props.book.imageLinks.thumbnail})`
						}}/>

						<div className="book-shelf-changer">
							<select 
								value={!this.props.book.shelf ? 'none' : this.props.book.shelf}
								onChange={((event) => this.updateShelf(event.target.value))} >
								
								<option disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>

					<div className="book-title">
						{this.props.book.title}
					</div>
				
					<div className="book-authors">
						{	this.props.book &&
							this.props.book.authors &&
							this.props.book.authors.map((item, i, arr) => {
								let divider = i<arr.length-1 && ', ';
								return (item + divider);
							})
						 }
					</div>			
				</div>
			)
		} else {
			return (<div className="book"><p>FAILED</p></div>)
		}
	}
}

BookThumb.PropTypes = {
	onChangeShelf: PropTypes.func.isRequired,
	book: PropTypes.object.isRequired
}

module.exports = BookThumb