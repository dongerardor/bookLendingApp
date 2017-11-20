import React, { Component } from 'react';
import './App.css'


class BookThumb extends Component {

	updateShelf(shelf){
		this.props.onChangeShelf(this.props.book, shelf);
	}

	render(){
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
					{this.props.book.authors}
				</div>			
			</div>
		)
	}
}

module.exports = BookThumb