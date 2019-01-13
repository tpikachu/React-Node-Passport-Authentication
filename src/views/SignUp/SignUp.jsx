import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

import {connect} from 'react-redux';
import {signUserUp} from '../../actions';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});

class SignIn extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            firstName: '',
            lastName: '',
            email: "",
            password: "",
            password2: "",
            phone:"",
            err:'',
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

    handleSubmit = (event, data) => {
        event.preventDefault();
        console.log(this.state);
        if (this.state.password === this.state.password2) {
            this.props.signUserUp(this.state);
        }else{
            this.setState({err:'password does not matched'});
        }

        
        /*
        this.props.dispatch({type:'AUTH_USER'});
        this.props.history.push('/');
        console.log(this.props);
        */
        
    }

    render(){
        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <Paper className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign Up
                    </Typography>

                    <form className={classes.form}>

                        <FormControl margin="normal" onChange={this.handleChange} required fullWidth>
                            <InputLabel htmlFor="text">First Name</InputLabel>
                            <Input id="firstName" name="firstname"  autoFocus />
                        </FormControl>

                        <FormControl margin="normal" onChange={this.handleChange} required fullWidth>
                            <InputLabel htmlFor="text">Last Name</InputLabel>
                            <Input id="lastName" name="lastName" />
                        </FormControl>

                        <FormControl margin="normal" onChange={this.handleChange} required fullWidth>
                            <InputLabel htmlFor="email">Email Address</InputLabel>
                            <Input id="email" name="email" />
                        </FormControl>

                        <FormControl margin="normal" onChange={this.handleChange} required fullWidth>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input name="password" type="password" id="password"/>
                        </FormControl>

                        <FormControl margin="normal" onChange={this.handleChange} required fullWidth>
                            <InputLabel htmlFor="password">Confrim Password</InputLabel>
                            <Input name="password2" type="password" id="password2"/>
                        </FormControl>

                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick ={this.handleSubmit}
                            >
                            Sign Up
                        </Button>
                    </form>
                    
                    <Typography component="subtitle2" variant="h5" color='secondary'>
                        {this.state.err}
                    </Typography>
                </Paper>
            </main>
            );
    }
  
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStatetoProps  = ({auth}) =>{
    return {
      authenticated: auth.authenticated,
      errorMsg: auth.error
    }
  }

export default connect(mapStatetoProps, {signUserUp})(withStyles(styles)(SignIn));