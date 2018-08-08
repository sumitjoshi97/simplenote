import React, { Component } from 'react';
import { Editor } from 'slate-react';
import { Value } from 'slate';
import * as mark from './Mark/index';
import Toolbar from './Toolbar/Toolbar';
import Icon from 'react-icons-kit';
import { bold } from 'react-icons-kit/feather/bold';
import { italic } from 'react-icons-kit/feather/italic';
import { underline } from 'react-icons-kit/feather/underline';
import { code } from 'react-icons-kit/feather/code';
import { list } from 'react-icons-kit/feather/list';
import {check} from 'react-icons-kit/feather/check'
import * as actions from '../../store/actions/index';
import {connect} from 'react-redux';

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                'text': 'Text here...'
                            }
                        ]
                    }
                ]
            }
        ]
    }
})

export class TextEditor extends Component {
    state = {
        value: initialValue
    }

    onChange = ({ value }) => {
        console.log('onchange', value.toJSON().document.nodes[0].nodes[0].leaves[0].text)
        if(this.props.isActive) {
            this.props.onSetUnactive()
        }
        this.setState({ value })
    }

    onKeyDown = (e, change) => {

        // check for ctrl key press
        if(!e.ctrlKey) { return }
        e.preventDefault()

        switch(e.key) {
            case 'b': {
                change.toggleMark('bold')
                return true
            }

            case 'i': {
                change.toggleMark('italic')
                return true
            }

            case 'c': {
                change.toggleMark('code')
                return true
            }

            case 'l': {
                change.toggleMark('list')
                return true
            }

            case 'u': {
                change.toggleMark('underline')
                return true
            }

            default:
                return true
        }
    }

    onMarkClick = (e, type) => {
        e.preventDefault();

        const { value } = this.state;

        const change = value.change().toggleMark(type)
        this.onChange(change)
    }

    renderMark = props => {
        switch(props.mark.type) {
            case 'bold': 
                return <mark.Boldmark {...props} />

            case 'italic':
                return <mark.ItalicMark {...props} />

            case 'code': 
                return <mark.CodeMark {...props} />

            case 'list':
                return <mark.ListMark {...props} />

            case 'underline':
                return <mark.UnderlineMark {...props} />

            default:
                return true
        }
    }

    onSubmit = () => {
        const note = this.state.value.toJSON()
        this.props.onAddNote(note)

        this.setState({
            value: initialValue
        })
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (JSON.stringify(prevState.value.toJSON()) !== JSON.stringify(nextProps.activeNote) && nextProps.isActive){
            console.log('active state', nextProps.activeNote.document.nodes[0].nodes[0].leaves[0].text)
            return { value: Value.fromJSON(nextProps.activeNote)}
        }
        return null
    }

    render() {
        return (
            <div className="notes">
                <Toolbar>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'bold')}
                        className="tooltip-icon-button">
                        <Icon icon={bold} />
                    </button>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'italic')}
                        className="tooltip-icon-button">
                        <Icon icon={italic} />
                    </button>
                    <button
                        onPointerDown={(e) => this.onMarkClick(e, 'underline')}
                        className="tooltip-icon-button">
                        <Icon icon={underline} />
                    </button>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'code')}
                        className="tooltip-icon-button">
                        <Icon icon={code} />
                    </button>
                    <button 
                        onPointerDown={(e) => this.onMarkClick(e, 'list')}
                        className="tooltip-icon-button">
                        <Icon icon={list} />
                    </button>
                    <button 
                        onPointerDown={this.onSubmit}
                        className="tooltip-icon-button">
                        <Icon icon={check} />
                    </button>
                </Toolbar>

                <Editor 
                value={this.state.value}
                onChange={this.onChange}
                onKeyDown={this.onKeyDown}  
                renderMark={this.renderMark}  
            />
            {/* {console.log(this.state.value.toJSON())} */}
            </div>
           
        )
    }
}

const mapStateToProps = state => {
    return {
        activeNote: state.activeNote,
        isActive: state.isActive
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddNote: (note) => dispatch(actions.addNote(note)),
        onSetUnactive: () => dispatch(actions.setUnactive())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TextEditor);