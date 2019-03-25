import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Auth from '../modules/Auth';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };

        this.onInputChange = this.onInputChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onInputChange(term) {
        this.setState({ term });
    }

    onSubmit(event) {
        event.preventDefault();

        console.log("Submit: " + this.state.term);
        

        // create a string for an HTTP body message
        const userID = encodeURIComponent(Auth.getUser());
        const note = encodeURIComponent(this.state.term);
        const noteData = `userID=${userID}&note=${note}`;

        // create an AJAX request
        const xhr = new XMLHttpRequest();
        xhr.open('post', '/api/notes');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            // success

            // set a message
            localStorage.setItem('successMessage', xhr.response.message);

            // make a redirect
            //this.context.router.replace('/login');
        } else {
            // failure

            const errors = xhr.response.errors ? xhr.response.errors : {};
            errors.summary = xhr.response.message;
        }
        });
        xhr.send(noteData);
        
        this.props.onNoteSubmit();
        this.setState({ term: '' });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit} className="input-group">
                    <TextField
                        floatingLabelText="Add note"
                        floatingLabelFixed={true}
                        className="search-bar form-control"
                        value={this.state.term}
                        onChange={event => this.onInputChange(event.target.value)}
                        />
                    <span className="input-group-btn">
                        <RaisedButton label="Submit" type="submit" primary={true} />
                    </span>
                </form>
            </div>
        );
    }
}