import React from 'react';
import { Button, Form, Header, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {eventCreate} from '../actions'
import {
  DateInput,
  TimeInput,
  DateTimeInput,
  DatesRangeInput
} from 'semantic-ui-calendar-react';


class EventCreate extends React.Component {

	state = {
		name: "",
		description: "",
		size: "",
		location: "",
		when: "",
		image_url: "",
		relevant_url: ""
	}




	createEvent = (e) => {
		e.preventDefault()
		let eventObj = {...this.state, user_id: this.props.user.id}
		this.props.eventCreate(eventObj).then((id) => {
			// debugger
			if(id) this.props.router.history.push(`/events/${id}`)
		})
	}

	renderErrors = () => {
		return <ul className="derp">
				{this.props.error.map(error => <li>{error}</li>)}
			   </ul>
	}

	handleChange = (e, {name, value}) => {
		if (this.state.hasOwnProperty(name)) this.setState({ [name]: value })
    }
	

	render() {
		console.log(this.props)
		return (
			<div className="createpage" style={{width: '50%'}}>
				<h1 className="headerr">Event Creation!</h1>
				{this.props.error ? <h2 style={{color: "red"}}>{this.renderErrors()}</h2> : null }
				<br/>
				<Segment>
				<Form onSubmit={this.createEvent}>
					<Form.Input name="name" label="Event Name" placeholder="name it!" 
						onChange={this.handleChange} 
						value={this.state.name} />
					<Form.TextArea name="description" label="Description" placeholder="what's goin on?"
						onChange={this.handleChange}
						value={this.state.description} />
					<Form.Input name="size" label="How many ya looking for?" placeholder="yes, you're already counted" type="number"
						onChange={this.handleChange}
						value={this.state.size} />
					<Form.Input name="location" label="Where?" placeholder="how we gonna know where to go?"
						onChange={this.handleChange}
						value={this.state.location} />
					<DateTimeInput name="when" label="When's it happening?"
						dateFormat="MM-DD-YYYY"
						onChange={this.handleChange}
						value={this.state.when} />
					<Form.Input name="image_url" label="Picture for your Event?" placeholder="just a url will do"
						onChange={this.handleChange}
						value={this.state.image_url} />
					<Form.Input name="relevant_url" label="Any relevant links?" placeholder="lets see it"
						onChange={this.handleChange}
						value={this.state.relevant_url} />
			      	<Button type="submit">Let's do this!</Button>
				</Form>
				</Segment>
			</div>
		);
	}
}
function msp (state) {
	return {user: state.user, error: state.error}
}

export default connect(msp, {eventCreate})(EventCreate)
