import React from 'react';
import { Button, Form, Segment} from 'semantic-ui-react'
import {connect} from 'react-redux'
import {eventCreate} from '../actions'


class EventCreate extends React.Component {



	prepareEventObj = (e) => {
		e.preventDefault()
		let eventObj = {}
		eventObj.user_id = this.props.user.id
		for (let x = 0; x < 6; x++) {
			if(!!e.target[x].value) {
				eventObj[e.target[x].name] = e.target[x].value
			}
		}
		this.props.eventCreate(eventObj).then((t) => {
			this.props.router.history.push(`/events/${t}`)
		})
	}

	render() {
		console.log(this.props)
		return (
			<div style={{width: '50%', margin: 'auto'}}>
				<strong>Event Creation!</strong>
				<br/>
				<Form onSubmit={this.prepareEventObj}>
				<Form.Field>
			      <Form.Input name="name" label="Event Name" placeholder="name it!"/>
			      <Form.Input name="description" label="Description" placeholder="what's goin on?"/>
			      <Form.Input name="size" label="How many ya looking for?" placeholder="yes, you're already counted"/>
			      <Form.Input name="location" label="Where?" placeholder="how we gonna know where to go?"/>
			      <Form.Input name="when" label="When's it happening?" placeholder="MM/DD/YYYY HH:MM AM/PM"/>
			      <Form.Input name="image_url" label="Picture for your Event?" placeholder="just a url will do"/>
			      <Form.Input name="relevant_url" label="Any relevant links?" placeholder="lets see it"/>
			      <Button type="submit">Let's do this!</Button>
			    </Form.Field>
				</Form>
			</div>
		);
	}
}
function msp (state) {
	return {user: state.user}
}

export default connect(msp, {eventCreate})(EventCreate)
