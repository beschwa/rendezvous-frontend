import React from 'react';
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import { Button, Form, Grid, Segment, Image,Header, List} from 'semantic-ui-react'

class UserPage extends React.Component {



	showUser = () => {
		return 	<div className="profile animate-pop-in" >
					<Grid container verticalAlign='middle'>
						<Grid.Row textAlign="center" centered columns={2}>
							<Grid.Column textAlign="center">
								<Segment inverted>
									<Image src={this.props.avatar} alt="" fluid/>
								</Segment>
								<Segment inverted attached>
									<Header as="h1">{this.props.username}</Header>

								</Segment>
								<Segment inverted attached='bottom' className="about bott">
									{this.renderBio()}
								</Segment>
							</Grid.Column>
							<Grid.Column textAlign="center">
								<Segment inverted attached>
									<Header as="h2">who</Header>
								</Segment>
								<Segment inverted attached='bottom' className="bott">
									{this.renderWho()}
								</Segment>
								<Segment inverted attached>
									<Header as="h2">what</Header>
								</Segment>
								<Segment inverted attached='bottom' className="bott">
									{this.renderAbout()}
								</Segment>
								<Segment inverted attached>
									<Header as="h2">{"<3"}</Header>
								</Segment>
								<Segment inverted attached='bottom' className="bott">
									{this.renderWhat()}
								</Segment>
							</Grid.Column>
						</Grid.Row>
						<Grid.Row verticalAlign='top' centered columns={2}>
							<Segment inverted>
								<Header as="h1"> Events </Header>
							</Segment>
							<Grid.Column>
								<Segment inverted attached>
									<Header as="h2"> Owned </Header>
								</Segment>
								<Segment inverted attached='bottom' className="bott">
									<List>
										{this.renderEventsOwned()}
									</List>
								</Segment>
							</Grid.Column>
							<Grid.Column>
								<Segment inverted attached>
									<Header as="h2"> Attending </Header>
								</Segment>
								<Segment inverted attached='bottom' className="bott">
									<List>
										{this.renderEventsAttending()}
									</List>
								</Segment>
							</Grid.Column>
						</Grid.Row>


					</Grid>
				</div>
	}

	renderBio = () => {
		return <p>{this.props.bio}</p>
	}

	renderWho = () => {
		let whoArr = []
		whoArr.push(<h1>Username: {this.props.username}</h1>)
		// debugger
		if (this.props.display_name !== null) whoArr.push(<h4>Display Name: {this.props.display_name}</h4>)
		if (this.props.full_name !== null) whoArr.push(<h4>Full Name: {this.props.full_name}</h4>)
		if (this.props.email !== null) whoArr.push(<h4>Email: {this.props.email}</h4>)
		if (this.props.tagline !== null) whoArr.push(<h4>Tag Line: {this.props.tagline}</h4>)
		return whoArr
	}

	renderAbout = () => {
		let aboutArr = []
		if (this.props.birthday !== null) aboutArr.push(<h4>Birthday: {this.props.birthday}</h4>)
		if (this.props.location !== null) aboutArr.push(<h4>Location: {this.props.location}</h4>)
		if (this.props.occupation !== null) aboutArr.push(<h4>Occupation: {this.props.occupation}</h4>)
		return aboutArr
	}

	renderWhat = () => {
		let whatArr = []
		whatArr.push(<h2>{'<3'}</h2>)
		if (this.props.gender !== null) whatArr.push(<h4>Gender: {this.props.gender}</h4>)
		if (this.props.orientation !== null) whatArr.push(<h4>Orientation: {this.props.orientation}</h4>)
		if (this.props.relationship_status !== null) whatArr.push(<h4>Relationship Status: {this.props.relationship_status}</h4>)
		if (this.props.romantic_preference !== null) whatArr.push(<h4>Romantic Preference: {this.props.romantic_preference}</h4>)
		return whatArr
	}

	renderEventsAttending = () => {
		return this.props.attending.map(event => {
			//return <li onClick={this.props.router.history.push(`./events/${event.id}`)}>{event.name}</li>
			try {
				return <List.Item><Link to={`/events/${event.id}`}>{event.name}</Link></List.Item>
			} catch {
				debugger
			}	
		})
	}

	renderEventsOwned = () => {
		return this.props.owned.map(event => {
			return <List.Item><Link to={`/events/${event.id}`}>{event.name}</Link></List.Item>
		})
	}

	render() {
		console.log(this.props)
		return (
			<div className="profilepage">
				{this.showUser()}
			</div>
		)
	}
}

function msp (state, props) {
	let attending = props.event_info.attending.map(eventID => {
		return state.events[eventID]
	})
	let owned = props.event_info.owned.map(eventID => {
		return state.events[eventID]
	})
	return {events: state.events, owned: owned, attending: attending}
}
export default connect(msp)(UserPage)