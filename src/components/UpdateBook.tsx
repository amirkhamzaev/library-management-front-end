import React, {useState, ChangeEvent} from 'react';
import {getBookById, updateBook} from '../services/bookService';
import {BookDTO} from "../interfaces/BookDTO";
import './UpdateBook.css';
import {GenreDTO} from "../interfaces/GenreDTO";
import {AuthorDTO} from "../interfaces/AuthorDTO";

const UpdateBook = () => {
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


    const handleUpdate = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const updatedBook = await updateBook(searchId, bookDTO) as BookDTO;
            setBook(updatedBook);
        } catch (error) {
            console.error('An error occurred while updating the book.', error);
        }
    };

    const handleGenreChange = (e: ChangeEvent<HTMLInputElement>, index: number, property: keyof GenreDTO) => {
        const newGenres = [...bookDTO.genreDTOS];
        // @ts-ignore
        newGenres[index][property as keyof GenreDTO] = e.target.value as any;
        setBook({...bookDTO, genreDTOS: newGenres});
    };

    const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>, index: number, property: keyof AuthorDTO) => {
        const newAuthors = [...bookDTO.authorDTOS];
        // @ts-ignore
        newAuthors[index][property as keyof AuthorDTO] = e.target.value as any;
        setBook({...bookDTO, authorDTOS: newAuthors});
    };

    const handleAddGenre = () => {
        setBook({
            ...bookDTO,
            genreDTOS: [
                ...bookDTO.genreDTOS,
                {
                    id: 0,
                    name: '',
                    description: '',
                    bookDTOS: [],
                    lastUpdatedBy: null,
                    lastUpdateTime: null,
                    createdBy: null,
                    creationTime: null
                }
            ]
        });
    };

    const handleRemoveGenre = (index: number) => {
        const newGenres = [...bookDTO.genreDTOS];
        newGenres.splice(index, 1);
        setBook({...bookDTO, genreDTOS: newGenres});
    };

    const handleAddAuthor = () => {
        setBook({
            ...bookDTO,
            authorDTOS: [
                ...bookDTO.authorDTOS,
                {
                    id: 0,
                    fullName: '',
                    livedYears: '',
                    aboutAuthor: '',
                    bookDTOS: [],
                    lastUpdatedBy: null,
                    lastUpdateTime: null,
                    createdBy: null,
                    creationTime: null
                }
            ]
        });
    };

    const handleRemoveAuthor = (index: number) => {
        const newAuthors = [...bookDTO.authorDTOS];
        newAuthors.splice(index, 1);
        setBook({...bookDTO, authorDTOS: newAuthors});
    };


    return (
        <div className="flex-container">
            <h2>Update Book</h2>
            <form onSubmit={handleUpdate} className="update-book-form">
                <label>
                    Book ID:
                    <input type="text" value={searchId} onChange={e => setSearchId(e.target.value)}
                           placeholder="Enter book ID" className="input-field-style"/>
                </label>
                <button type="button" onClick={handleSearch} className="update-button">Search</button>
                <label>
                    Name:
                    <input type="text" name="name" value={bookDTO.name}
                           onChange={(e) => setBook({...bookDTO, name: e.target.value})}
                           placeholder="Title" className="input-field-style"/>
                </label>
                <label>
                    Description:
                    <input type="text" name="description" value={bookDTO.description}
                           onChange={(e) => setBook({...bookDTO, description: e.target.value})}
                           placeholder="Description" className="input-field-style"/>
                </label>
                {bookDTO.genreDTOS.map((genre, index) => (
                    <div key={index} className="genre-input-field">
                        <label>
                            GenreDTO Name:
                            <input type="text" value={genre.name}
                                   onChange={e => handleGenreChange(e, index, 'name')}
                                   placeholder="GenreDTO Name" className="input-field-style"/>
                        </label>
                        <label>
                            GenreDTO Description:
                            <input type="text" value={genre.description}
                                   onChange={e => handleGenreChange(e, index, 'description')}
                                   placeholder="GenreDTO Description" className="input-field-style"/>
                        </label>
                        <button type="button" onClick={() => handleRemoveGenre(index)}
                                className="remove-button">Remove Genre
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddGenre} className="add-button">Add Genre</button>

                {bookDTO.authorDTOS.map((author, index) => (
                    <div key={index} className="author-input-field">
                        <label>
                            AuthorDTO Full Name:
                            <input type="text" value={author.fullName}
                                   onChange={e => handleAuthorChange(e, index, 'fullName')}
                                   placeholder="AuthorDTO Full Name" className="input-field-style"/>
                        </label>
                        <label>
                            AuthorDTO Lived Years:
                            <input type="text" value={author.livedYears}
                                   onChange={e => handleAuthorChange(e, index, 'livedYears')}
                                   placeholder="AuthorDTO Lived Years" className="input-field-style"/>
                        </label>
                        <label>
                            About AuthorDTO:
                            <input type="text" value={author.aboutAuthor}
                                   onChange={e => handleAuthorChange(e, index, 'aboutAuthor')}
                                   placeholder="About AuthorDTO" className="input-field-style"/>
                        </label>
                        <button type="button" onClick={() => handleRemoveAuthor(index)}
                                className="remove-button">Remove Author
                        </button>
                    </div>
                ))}
                <button type="button" onClick={handleAddAuthor} className="add-button">Add Author</button>
                <button type="submit" className="update-button">Update Book</button>
            </form>
        </div>
    );
};

export default UpdateBook;