import React, {useState} from 'react';
import {getBookById, deleteBook} from '../services/bookService';
import {BookDTO} from "../interfaces/BookDTO";
import './DeleteBook.css';

const DeleteBook = () => {
    const [bookDTO, setBook] = useState<BookDTO>({
        id: null,
        name: '',
        description: '',
        likeCount: 0,
        genreDTOS: [],
        authorDTOS: [],
        userInfoDTOS: [],
        lastUpdatedBy: null,
        lastUpdateTime: null,
        createdBy: null,
        creationTime: null
    });
    const [searchId, setSearchId] = useState('');

    const handleSearch = async () => {
        try {
            const fetchedBook = await getBookById(searchId);
            setBook(fetchedBook);
        } catch (error) {
            console.error('An error occurred while fetching the book.', error);
        }
    };

    const handleDelete = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await deleteBook(searchId);
            alert('Book deleted successfully!');
        } catch (error) {
            console.error('An error occurred while deleting the book.', error);
        }
    };

    return (
        <div className="flex-container">
            <h2>Delete Book</h2>
            <div className="delete-book-form">
                <label>
                    <strong>Book ID:</strong>
                    <input type="text" value={searchId} onChange={e => setSearchId(e.target.value)}
                           placeholder="Enter book ID" className="input-field-style"/>
                </label>
                <button type="button" onClick={handleSearch} className="search-button">Search</button>
                <p><strong>Name:</strong> <em>{bookDTO.name}</em></p>
                <p><strong>Description:</strong> <em>{bookDTO.description}</em></p>
                {bookDTO.genreDTOS.map((genre, index) => (
                    <div key={index} className="genre-input-field">
                        <p><strong>GenreDTO Name:</strong> <em>{genre.name}</em></p>
                        <p><strong>GenreDTO Description:</strong> <em>{genre.description}</em></p>
                    </div>
                ))}
                {bookDTO.authorDTOS.map((author, index) => (
                    <div key={index} className="author-input-field">
                        <p><strong>AuthorDTO Full Name:</strong> <em>{author.fullName}</em></p>
                        <p><strong>AuthorDTO Lived Years:</strong> <em>{author.livedYears}</em></p>
                        <p><strong>About AuthorDTO:</strong> <em>{author.aboutAuthor}</em></p>
                    </div>
                ))}
                <button type="button" onClick={handleDelete} className="delete-button">Delete Book</button>
            </div>
        </div>
    );
};

export default DeleteBook;