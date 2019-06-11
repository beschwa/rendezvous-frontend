import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import '../App.css';

const theme = createMuiTheme({
  overrides: {
    MuiInputLabel: { // Name of the component  / style sheet
      root: { // Name of the rule
        color: "blueGrey",
        "&$focused": { // increase the specificity for the pseudo class
          color: "blue"
        }
      }
    }
  }
})



class Signup extends React.Component {


	state = {
		username: "",
		password: "",
		errors: ""
	}



	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitUser = (e) => {
		e.preventDefault()
		if(e.target[5].value !== this.state.password)
			this.setState({errors: "Your passwords do not match"})
		else {
			let credentials = {...this.state}
			delete credentials.errors
			this.props.signUp(credentials)
		}

	}


	render() {
		console.log(this.props)
		return (
			<React.Fragment>
				<h1 style={{color: "black"}}>
					{!!this.state.errors ? this.state.errors : <Typography>make an account!</Typography>}
				</h1>
				<ThemeProvider theme={theme}>
				<form onSubmit = {this.submitUser}>

				<TextField 
					color="inherit"
					variant = "outlined"
					label = "Username"
					placeholder = "make it"
					onChange = {this.handleFormChange} 
					name = "username"
					margin = "normal"
					value = {this.state.username}
				/>
				<br/>
				<TextField
					color="inherit"
					variant = "outlined"
					label = "Password"
					placeholder = "think about one"
					onChange = {this.handleFormChange} 
					name = "password"
					margin = "normal"
					type = "password"
					value = {this.state.password}
				/>
				<TextField 
					color="inherit"
					variant = "outlined"
					label = "Password Confirmation"
					placeholder = "one more time.."
					onChange = {this.handleFormChange} 
					name = "passwordconfirmation"
					margin = "normal"
					type = "password"
				/>
				<br/>

				<Button variant="contained" type="submit" color="inherit">
					Submit
				</Button>
				</form>
				</ThemeProvider>
			</React.Fragment>
		)
	}
}

export default Signup