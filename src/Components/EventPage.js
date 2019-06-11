import React from 'react';
import {connect} from 'react-redux'
import {editEvent} from '../actions'
import { Button, Form, Segment} from 'semantic-ui-react'

class EventPage extends React.Component {


	state = {
		editMode: false
	}

	editToggle = () => {
		this.setState(prevState => {
			return {
				editMode: !prevState.editMode
			}
		})
	}


	editEvent = (e) => {
		e.preventDefault()
		console.log("editing event")
		let editObj = {}
		for (let x = 0; x < 6; x++) {
			if(!!e.target[x].value) {
				editObj[e.target[x].name] = e.target[x].value
			}
		}
		this.props.editEvent(this.props.id, editObj).then(() => {
			this.setState(prevState => {
				return {
					editMode: !prevState.editMode
				}
			})
		})

	}

	showEvent = () => {
		return 	<React.Fragment>
					<button onClick={() => this.props.router.history.push('/home')}> Back to Home </button>
					<h1>{this.props.name}</h1>
					<h1>Creator: {this.props.owner.name}</h1>
					<img src={this.props.image_url}/>
					<h2>{this.props.location}</h2>
					<h2>Looking For: {this.props.size}</h2>
					<p>{this.props.description}</p>
					<h3>Relevant Links: <a src={this.props.relevant_url}>Link</a></h3>
				</React.Fragment>
	}

	editEventForm = () => {
		return 	<div style={{width: '50%', margin: 'auto'}}>
					<Form onSubmit={this.editEvent}>
						<Form.Input name="name" label="Event Name" placeholder={this.props.name}/>
						<Form.Input name="description" label="Description" placeholder={this.props.description}/>
						<Form.Input name="size" label="How many ya looking for?" placeholder={this.props.size}/>
						<Form.Input name="location" label="Where?" placeholder={this.props.location}/>
						<Form.Input name="when" label="When's it happening?" placeholder={this.props.when}/>
						<Form.Input name="image_url" label="Picture for your Event?" placeholder={this.props.image_url}/>
						<Form.Input name="relevant_url" label="Any relevant links?" placeholder={this.props.relevant_url}/>
						<Button type="submit">Let's do this!</Button>
					</Form>
				</div>

				
	}


	render(){
		console.log(this.props)
		return (
			<div>
				<Button onClick={this.editToggle}>Toggle Editmode</Button> <br/>
				{this.state.editMode ? this.editEventForm() : this.showEvent()}

			</div>
		)
	}
}

function msp (state) {
	return {user: state.user}
}

export default connect(msp, {editEvent})(EventPage)