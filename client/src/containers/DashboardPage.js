import React from 'react';
import Auth from '../modules/Auth';
import Dashboard from '../components/Dashboard';

class DashboardPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            secretData: ''
        };
    }

    // Executes after initial rendering
    componentDidMount() {
        const xhr = new XMLHttpRequest();
        xhr.open('get', '/api/dashboard');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        // Set the authorization HTTP setRequestHeader
        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
        xhr.responseType = 'json';
        xhr.addEventListener('load', () => {
            if (xhr.status === 200) {
                this.setState({
                    secretData: xhr.response.message
                });
            }
        });
        xhr.send();
    }

    render() {
        return (
            <Dashboard secretData={this.state.secretData} />
        );
    }
}

export default DashboardPage;