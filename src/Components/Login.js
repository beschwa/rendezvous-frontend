import React from 'react'
import TextField from '@material-ui/core/TextField';
import '../App.css';
import {connect} from 'react-redux'
import {Form,Button, Header, Segment} from 'semantic-ui-react'


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

	renderErrors = () => {
		return <ul className="derp">
				{this.props.error.map(error => <li>{error}</li>)}
			</ul>
	}



	renderForm = () => {
		return <div className="loginform">
			{this.props.error ? <h2 style={{color: "red"}}>{this.renderErrors()}</h2> : null }
				<Header as='h1'> Log In</Header>
				<Form onSubmit = {this.props.login(this.state)}>
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

	render() {
		return (
			<div className="landing">
				{this.renderForm()}
			</div>
		)
	}
}

function msp (state) {
	return {error: state.error}
}

export default connect(msp)(Login)