// src/components/AddBook.tsx
import React, {useState} from 'react';
import {BookDTO} from '../interfaces/BookDTO';
import {GenreDTO} from '../interfaces/GenreDTO';
import {AuthorDTO} from '../interfaces/AuthorDTO';
import {addBook as addBookService} from '../services/bookService';
import './AddBook.css'; // Import the CSS file

const AddBook = () => {
    const [book, setBook] = useState<BookDTO>({
        id: 0,
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

    const [genresInput, setGenresInput] = useState<GenreDTO[]>([]);
    const [authorsInput, setAuthorsInput] = useState<AuthorDTO[]>([]);

    const handleGenreInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, property: keyof GenreDTO) => {
        const newValues = [...genresInput];
        // @ts-ignore
        newValues[index][property as keyof GenreDTO] = event.target.value;
        setGenresInput(newValues);
        setBook({...book, genreDTOS: newValues});
    };

    const handleAuthorInputChange = (event: React.ChangeEvent<HTMLInputElement>, index: number, property: keyof AuthorDTO) => {
        const newValues = [...authorsInput];
        // @ts-ignore
        newValues[index][property as keyof AuthorDTO] = event.target.value;
        setAuthorsInput(newValues);
        setBook({...book, authorDTOS: newValues});
    };

    const handleAddInput = (field: string) => {
        if (field === 'genreDTOS') {
            setGenresInput([...genresInput, {
                id: 0,
                name: '',
                description: '',
                bookDTOS: [],
                lastUpdatedBy: null,
                lastUpdateTime: null,
                createdBy: null,
                creationTime: null
            }]);
        } else {
            setAuthorsInput([...authorsInput, {
                id: 0,
                fullName: '',
                livedYears: '',
                aboutAuthor: '',
                bookDTOS: [],
                lastUpdatedBy: null,
                lastUpdateTime: null,
                createdBy: null,
                creationTime: null
            }]);
        }
    };

    const handleRemoveInput = (index: number, field: string) => {
        if (field === 'genreDTOS') {
            const newValues = [...genresInput];
            newValues.splice(index, 1);
            setGenresInput(newValues);
            setBook({...book, genreDTOS: newValues});
        } else {
            const newValues = [...authorsInput];
            newValues.splice(index, 1);
            setAuthorsInput(newValues);
            setBook({...book, authorDTOS: newValues});
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await addBookService(book);
            alert('Book added successfully!');
        } catch (error) {
            alert(`An error occurred: ${(error as Error).message}`);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit} className="add-book-form">
                <h2>Add Book</h2>
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
                <div className="genre-author-fields">
                    <div className="input-group genre-fields">
                        <div className="input-column">
                            {genresInput.map((genre, index) => (
                                <div key={index} className="input-field genre-input-field">
                                    <label>
                                        GenreDTO Name:
                                        <input type="text" value={genre.name}
                                               onChange={(e) => handleGenreInputChange(e, index, 'name')}
                                               placeholder='"Sample GenreDTO Name"'
                                               required className="input-field-style"/>
                                    </label>
                                    <label>
                                        GenreDTO Description:
                                        <input type="text" value={genre.description}
                                               onChange={(e) => handleGenreInputChange(e, index, 'description')}
                                               placeholder='"Sample GenreDTO Description"'
                                               required className="input-field-style"/>
                                    </label>
                                    <button type="button" className="remove-button"
                                            onClick={() => handleRemoveInput(index, 'genreDTOS')}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="add-button" onClick={() => handleAddInput('genreDTOS')}>+ Add
                            GenreDTO
                        </button>
                    </div>
                    <div className="input-group author-fields">
                        <div className="input-column">
                            {authorsInput.map((author, index) => (
                                <div key={index} className="input-field author-input-field">
                                    <label>
                                        AuthorDTO Full Name:
                                        <input type="text" value={author.fullName}
                                               onChange={(e) => handleAuthorInputChange(e, index, 'fullName')}
                                               placeholder='"Sample AuthorDTO Full Name"'
                                               required className="input-field-style"/>
                                    </label>
                                    <label>
                                        AuthorDTO Lived Years:
                                        <input type="text" value={author.livedYears}
                                               onChange={(e) => handleAuthorInputChange(e, index, 'livedYears')}
                                               placeholder='"Sample Lived Years"'
                                               required className="input-field-style"/>
                                    </label>
                                    <label>
                                        About AuthorDTO:
                                        <input type="text" value={author.aboutAuthor}
                                               onChange={(e) => handleAuthorInputChange(e, index, 'aboutAuthor')}
                                               placeholder='"Sample About AuthorDTO"'
                                               required className="input-field-style"/>
                                    </label>
                                    <button type="button" className="remove-button"
                                            onClick={() => handleRemoveInput(index, 'authorDTOS')}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <button type="button" className="add-button" onClick={() => handleAddInput('authorDTOS')}>+ Add
                            AuthorDTO
                        </button>
                    </div>
                </div>
                <button type="submit" className="save-button">Save</button>
            </form>
        </div>
    );
};

export default AddBook;