import React from 'react'
import TextField from '@material-ui/core/TextField';

import { createMuiTheme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { ThemeProvider } from "@material-ui/styles";
import {connect} from 'react-redux'
import {Form,Button, Header, Segment} from 'semantic-ui-react'
import {clearErrors} from '../actions'
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
		confirmation: "",
		errors: ""
	}

	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	submitUser = (e) => {
		e.preventDefault()
		if(this.state.password !== this.state.confirmation)
			this.setState({errors: "Your passwords do not match"})
		else {
			let credentials = {...this.state}
			delete credentials.errors
			delete credentials.confirmation
			this.props.signUp(credentials)
		}
	}

	renderForm = () => {
		return <div className="loginform">
			{this.props.error ? <h2 style={{color: "red"}}>{this.renderErrors()}</h2> : null }
				<Header as='h1'> Sign Up</Header>
				<Form onSubmit = {this.submitUser}>
			<Segment inverted>
					<Form.Field>
						<label>username</label>
						<input 
							placeholder='username'
							onChange = {this.handleFormChange}
							value = {this.state.username} 
							name = "username"
							/>
					</Form.Field>
					<Form.Field>
					<label>password</label>
						<input 
							placeholder='password'
							onChange = {this.handleFormChange}
							value = {this.state.password} 
							name = "password"
							type="password"
							/>
					</Form.Field>
					<Form.Field>
					<label>password confirmation</label>
						<input 
							placeholder='confirm'
							onChange = {this.handleFormChange}
							value={this.state.confirmation}
							name = "confirmation"
							type="password"
							/>
					</Form.Field>
	
				</Segment>
				<Segment inverted className='bott'>
				<Button type="submit">
					Submit
				</Button>
				</Segment>
				</Form>
			</div>
	}
	renderErrors = () => {
		return <ul className="derp">
				{this.props.error.map(error => <li>{error}</li>)}
			</ul>
	}

	render() {
		console.log("SIGNUP \n",this.props)
		return (
			<div className="landing">
				{this.renderForm()}
			</div>
		)
	}
}

function msp (state) {
	// debugger
	return {error: state.error}
}

export default connect(msp, {clearErrors})(Signup)