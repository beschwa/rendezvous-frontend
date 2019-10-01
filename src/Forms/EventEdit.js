import React from 'react';
import {connect} from 'react-redux'
import { Grid, Segment, Button, Form, List, Image, Header, Icon} from 'semantic-ui-react'


class EventEdit extends React.Component {


	render() {
		return (
			<div style={{width: '50%', margin: 'auto'}}>
				<Segment>
					{this.props.isOwner ? <Button onClick={this.editToggle}>edit</Button>:null}
					<br/>
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
					</Segment>
			</div>
		)
	}
}

function msp (state) {
	return {user: state.user}
}

export default connect(msp)(EventEdit)