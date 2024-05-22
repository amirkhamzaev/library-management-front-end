// src/components/AddBook.tsx
import React, {useState} from 'react';
import {Book} from '../interfaces/Book';
import {Genre} from '../interfaces/Genre';
import {Author} from '../interfaces/Author';
import {addBook as addBookService} from '../services/bookService';
import './AddBook.css'; // Import the CSS file

const AddBook = () => {
    const [book, setBook] = useState<Book>({
        name: '',
        description: '',
        likeCount: 0,
        genres: [],
        authors: []
    });

    const [genresInput, setGenresInput] = useState<Genre[]>([]);
    const [authorsInput, setAuthorsInput] = useState<Author[]>([]);

    const handleGenreInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, property: keyof Genre) => {
        const newValues = [...genresInput];
        newValues[index][property] = event.target.value;
        setGenresInput(newValues);
        setBook({...book, genres: newValues});
    };

    const handleAuthorInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, property: keyof Author) => {
        const newValues = [...authorsInput];
        newValues[index][property] = event.target.value;
        setAuthorsInput(newValues);
        setBook({...book, authors: newValues});
    };

    const handleAddInput = (field: string) => {
        if (field === 'genres') {
            setGenresInput([...genresInput, {name: '', description: ''}]);
        } else {
            setAuthorsInput([...authorsInput, {fullName: '', livedYears: '', aboutAuthor: ''}]);
        }
    };

    const handleRemoveInput = (index: number, field: string) => {
        if (field === 'genres') {
            const newValues = [...genresInput];
            newValues.splice(index, 1);
            setGenresInput(newValues);
            setBook({...book, genres: newValues});
        } else {
            const newValues = [...authorsInput];
            newValues.splice(index, 1);
            setAuthorsInput(newValues);
            setBook({...book, authors: newValues});
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        await addBookService(book);
    };

    return (
        <form onSubmit={handleSubmit} className="add-book-form">
            <label>
                Name:
                <input type="text" name="name" value={book.name}
                       onChange={(e) => setBook({...book, name: e.target.value})} placeholder='"Sample Book Name"'
                       required className="input-field-style"/>
            </label>
            <label>
                Description:
                <input type="text" name="description" value={book.description}
                       onChange={(e) => setBook({...book, description: e.target.value})}
                       placeholder='"Sample Book Description"'
                       required className="input-field-style"/>
            </label>
            <label>
                Like Count:
                <input type="number" name="likeCount" value={book.likeCount}
                       onChange={(e) => setBook({...book, likeCount: parseInt(e.target.value)})} placeholder='"10"'
                       required className="input-field-style"/>
            </label>
            <div className="genre-author-fields">
                <div className="input-group genre-fields">
                    <div className="input-column">
                        {genresInput.map((genre, index) => (
                            <div key={index} className="input-field genre-input-field">
                                <label>
                                    Genre Name:
                                    <input type="text" value={genre.name}
                                           onChange={(e) => handleGenreInputChange(e, index, 'name')}
                                           placeholder='"Sample Genre Name"'
                                           required className="input-field-style"/>
                                </label>
                                <label>
                                    Genre Description:
                                    <input type="text" value={genre.description}
                                           onChange={(e) => handleGenreInputChange(e, index, 'description')}
                                           placeholder='"Sample Genre Description"'
                                           required className="input-field-style"/>
                                </label>
                                <button type="button" className="remove-button"
                                        onClick={() => handleRemoveInput(index, 'genres')}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="add-button" onClick={() => handleAddInput('genres')}>+ Add Genre
                    </button>
                </div>
                <div className="input-group author-fields">
                    <div className="input-column">
                        {authorsInput.map((author, index) => (
                            <div key={index} className="input-field author-input-field">
                                <label>
                                    Author Full Name:
                                    <input type="text" value={author.fullName}
                                           onChange={(e) => handleAuthorInputChange(e, index, 'fullName')}
                                           placeholder='"Sample Author Full Name"'
                                           required className="input-field-style"/>
                                </label>
                                <label>
                                    Author Lived Years:
                                    <input type="text" value={author.livedYears}
                                           onChange={(e) => handleAuthorInputChange(e, index, 'livedYears')}
                                           placeholder='"Sample Lived Years"'
                                           required className="input-field-style"/>
                                </label>
                                <label>
                                    About Author:
                                    <input type="text" value={author.aboutAuthor}
                                           onChange={(e) => handleAuthorInputChange(e, index, 'aboutAuthor')}
                                           placeholder='"Sample About Author"'
                                           required className="input-field-style"/>
                                </label>
                                <button type="button" className="remove-button"
                                        onClick={() => handleRemoveInput(index, 'authors')}>
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                    <button type="button" className="add-button" onClick={() => handleAddInput('authors')}>+ Add Author
                    </button>
                </div>
            </div>
            <button type="submit" className="save-button">Save</button>
        </form>
    );
};

export default AddBook;