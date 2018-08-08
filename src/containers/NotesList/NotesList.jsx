import React, { Component } from 'react'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

export class NotesList extends Component {

    render() {
        const notesList = this.props.notes.map((note, index) => (
            <li 
                key={index} 
                onPointerDown={() => this.props.onClickNote(note)}
                className="note">{note.document.nodes[0].nodes[0].leaves[0].text}</li>
        ))
        return (
            <div className="notes-tags">
                <h5 style={{padding: '1rem 0'}}>notes here</h5>
                <ul className="notes-list">
                    {notesList}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        notes: state.notes,
        activeNote: state.activeNote
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onClickNote: (note) => dispatch(actions.setActiveNote(note))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesList);