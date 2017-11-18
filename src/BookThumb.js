import React, { Component } from 'react';
import './App.css'

function BookThumb (props) {

	return (
		<div className="book">
			<div className="book-top">
				
				<div className='book-cover'
					style={{
						width: 128, height: 193, backgroundImage: `url(${props.book.imageLinks.thumbnail})`
				}}/>

				<div className="book-shelf-changer">
					
					<select onChange = {((event) => props.onChangeShelf(props.book, event.target.value))} >
						<option value="">Move to...</option>
						<option value="currentlyReading">Currently Reading</option>
						<option value="wantToRead">Want to Read</option>
						<option value="read">Read</option>
						<option value="none">None</option>
			  		</select>
				</div>
				
				<div className="book-title">
					{props.book.title}
				</div>
			
				<div className="book-authors">
					{props.book.authors.join(', ')}
				</div>			
			</div>
		</div>
	)
}

module.exports = BookThumb