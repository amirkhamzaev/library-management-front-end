import React, {useState} from 'react';
import AddBook from './components/AddBook';
import UpdateBook from './components/UpdateBook';
import GetAllBooks from './components/GetAllBooks';
import DeleteBook from './components/DeleteBook';
import './styles/App.css'; // Import the CSS file

function App() {
    const [currentSection, setCurrentSection] = useState('add');

    const renderSection = () => {
        switch (currentSection) {
            case 'add':
                return <AddBook/>;
            case 'update':
                return <UpdateBook/>;
            case 'getAll':
                return <GetAllBooks/>;
            case 'delete':
                return <DeleteBook/>;
            default:
                return <AddBook/>;
        }
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Book Management App</h1>
            </header>
            <div className="App-buttons">
                <button className={currentSection === 'add' ? 'active' : ''}
                        onClick={() => setCurrentSection('add')}>Add Book
                </button>
                <button className={currentSection === 'update' ? 'active' : ''}
                        onClick={() => setCurrentSection('update')}>Update Book
                </button>
                <button className={currentSection === 'getAll' ? 'active' : ''}
                        onClick={() => setCurrentSection('getAll')}>Get All Books
                </button>
                <button className={currentSection === 'delete' ? 'active' : ''}
                        onClick={() => setCurrentSection('delete')}>Delete Book
                </button>
            </div>
            {renderSection()}
            <footer className="App-footer">
                <p>© 2024 Book Management App</p>
            </footer>
        </div>
    );
}

export default App;