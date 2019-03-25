import React, { PropTypes, Component } from 'react';
import axios from 'axios';
import { Card, CardTitle, CardText } from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import Auth from '../modules/Auth';

import SearchBar from './search-bar';
import NoteList from './note-list';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: ''
    };

    this.getNotes = this.getNotes.bind(this);
    this.getUserInfo = this.getUserInfo.bind(this);
  }

  componentWillMount() {
      this.getNotes();
    }

  getNotes() {
    var userID = Auth.getUser();
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/api/notes/' + userID);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    // Set the authorization HTTP setRequestHeader
    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
        if (xhr.status === 200) {
            console.log(xhr.response);
            this.setState({
                notes: xhr.response
            });
        }
    });
    xhr.send();
  }

  getUserInfo() {
    axios.get("/api/user")
        .then((response) => {
            console.log(response);
        })
  }

  render() {
    return (
      <div>
      <Card className="container">
        <CardTitle
          title="Dashboard"
          subtitle="You should get access to this page only after authentication."
        />

        {this.props.secretData && <CardText style={{ fontSize: '16px', color: 'green' }}>{this.props.secretData}</CardText>}
        <SearchBar onNoteSubmit={this.getNotes} />
      </Card>
      <NoteList notes={this.state.notes} />
    </div>
    );
  }
}

Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};
