import React, { Component } from 'react';
import TextEditor from './containers/TextEditor/TextEditor';
import NotesList from './containers/NotesList/NotesList';
// import './App.css';

class App extends Component {
    render() {
        return (
            <div className="App">
                <NotesList />
                <TextEditor />
            </div>
        );
    }
}

export default App;