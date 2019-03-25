import React, { Component } from 'react';

import { Card, CardTitle, CardText, CardActions, CardHeader } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RefreshIndicator from 'material-ui/RefreshIndicator';



const spinnerStyle = {
  container: {
    position: 'relative',
  },
  refresh: {
    display: 'inline-block',
    position: 'relative',
  },
};

export default class NoteList extends Component {
    constructor(props) {
        super(props);

        this.state = { notes: '' };

        this.renderNotes = this.renderNotes.bind(this);
    }

    renderNotes() {
        if (this.props.notes.length == 0) {
            return (
                <div style={spinnerStyle.container}>
                    <RefreshIndicator
                        size={40}
                        left={10}
                        top={0}
                        status="loading"
                        style={spinnerStyle.refresh}
                        />
                </div>
            );
        }
        
        if (this.props.notes) {
            return this.props.notes.map((note) => {
                return (
                    <Card className="container" key={note._id}>
                        <CardHeader
                            title={note.note}
                            />
                        <CardActions>
                            <FlatButton label="Edit" />
                            <FlatButton label="Delete" />
                        </CardActions>
                    </Card>
                );
            })
        }
    }

    render() {
        return (
            <div>
                {this.renderNotes()}
            </div>
        );
    }
}
