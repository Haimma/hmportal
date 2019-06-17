import React, { Component } from 'react';
import { Form, Button } from 'react-bootstrap';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// minified version is also included
// import 'react-toastify/dist/ReactToastify.min.css';

toast.configure();

class Subscribe extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      emails: null,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ email: event.target.value });
  }

  handleSubmit(event) {
    this.checkInFile();
    event.preventDefault();
  }

  checkInFile() {
    let newEmail = true;
    let newEmailValue = this.state.email;
    fetch('/api/getEmails')
    .then(res => res.json())
    .then(emails => {
        Object.entries(emails).forEach(function (key) {
          if (newEmailValue === key[1])
            newEmail = false;
        });
      if (newEmail) {
        this.writeToFile(newEmailValue);
      }
      else {
        this.existingEmailToast();
      }
    });
  }

  writeToFile(newEmailValue) {
    fetch('/api/addEmail',{
      method: 'POST',
      body: JSON.stringify({
        email: newEmailValue
      }),
      headers: {"Content-Type": "application/json"}
    });
    this.newEmailToast();
  }

  newEmailToast() {
    return(    
      toast.success('Thank You :)', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      })
    );
  }

  existingEmailToast() {
    toast.error('This Email Already Exists', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      });
  }

  render() {
    return (
      <Form>
        <Form.Group onSubmit={this.handleSubmit} controlId="formBasicEmail">
          <Form.Control type="email" placeholder="Enter email" email={this.state.email} onChange={this.handleChange} />
        </Form.Group>
        <Button variant="primary" onClick={this.handleSubmit}>
          Submit
        </Button>
      </Form>
    );
  }
}


export default Subscribe;