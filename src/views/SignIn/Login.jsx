import React from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import "./Login.css";
import {connect} from 'react-redux';
import {signUserIn} from '../../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = (event, d) => {
    event.preventDefault();
    /*
    this.props.dispatch({type:'AUTH_USER'});
    this.props.history.push('/');
    console.log(this.props);
    */
   console.log(d);
    this.props.signUserIn(this.state);
  }
  renderAlert(){
    if(this.props.errorMsg) {
        return (
            <div className="alert alert-warning">
                <strong>Oops! </strong>{this.props.errorMsg}
            </div>
        )
    }
  }
  render() {
    return (
      
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="email" bsSize="large">
            <ControlLabel>Email</ControlLabel>
            <FormControl
              autoFocus
              type="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </FormGroup>
          
          <FormGroup controlId="password" bsSize="large">
            <ControlLabel>Password</ControlLabel>
            <FormControl
              value={this.state.password}
              onChange={this.handleChange}
              type="password"
            />
          </FormGroup>
          <Button
            block
            bsSize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Login
          </Button>
          {this.renderAlert()}
        </form>
      </div>
    );
  }
}

const mapStatetoProps  = ({auth}) =>{
  return {
    authenticated: auth.authenticated,
    errorMsg: auth.error
  }
}

export default  connect(mapStatetoProps, {signUserIn})(Login);
