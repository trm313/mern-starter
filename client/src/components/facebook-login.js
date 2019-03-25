import React from 'react';
import axios from 'axios';

function sendGetRequest() {
    // create an AJAX request
    const xhr = new XMLHttpRequest();
    xhr.open('get', '/auth/sendfbauth');
    //xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      if (xhr.status === 200) {
        // success

        // save the token
        console.log(xhr.response);
        Auth.authenticateUser(xhr.response.user.jwtToken, xhr.response.user._id);

        // change the current URL to /
        this.context.router.replace('/');
      } else {
        // failure

        // change the component state
        const errors = xhr.response.errors ? xhr.response.errors : {};
        errors.summary = xhr.response.message;
      }
    });
    xhr.send();
}

function testFBapi() {
    
    window.fbAsyncInit = function() {
    FB.init({
      appId      : '215024398970477',
      cookie     : true,  // enable cookies to allow the server to access 
                          // the session
      xfbml      : true,  // parse social plugins on this page
      version    : 'v2.8' // use graph api version 2.8
    });
    
    
    
    FB.api('/me', function(response) {
        console.log(JSON.stringify(response));
    });
    }
}

const FacebookLogin = () => {
    return (
        <div>
            <a href="/auth/facebook">Login with Facebook</a>
        </div>
    );
}


export default FacebookLogin;