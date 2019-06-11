import React from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import '../App.css';

class Login extends React.Component {


	state = {
		username: "",
		password: "",
	}



	handleFormChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		})
	}

	render() {
		return (
			<React.Fragment>
				<h1 style={{color: "black"}}>
					Log in!
				</h1>
				<form onSubmit = {this.props.login(this.state)}>

				<TextField 
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
					variant = "outlined"
					label = "Password"
					placeholder = "think about one"
					onChange = {this.handleFormChange} 
					name = "password"
					margin = "normal"
					type = "password"
					value = {this.state.password}
				/>
				<br/>

				<Button variant="contained" type="submit">
					Submit
				</Button>
				</form>
			</React.Fragment>
		)
	}
}

export default Login