import React from 'react';
import {connect} from 'react-redux'
import EventCard from '../Singles/EventCard'
import StackGrid from "react-stack-grid";
import {getArrayFrom} from '../actions'
import { Card } from 'semantic-ui-react'


class Home extends React.Component {

	renderEvents = () => {
		return getArrayFrom(this.props.events).map(event => {
			return <EventCard key={event.id} {...event} handleClick={this.showEvent}/>
		})

	}

	showEvent = (eventID) => {
		this.props.history.push(`./events/${eventID}`)
	}

	render() {
		console.log("USER\n", this.props.user)
		return (
			<div className="homepage">
				<h1 className="headerr">Welcome {this.props.user.username}!</h1>

{/*				<Card.Group itemsPerRow={4}>*/}
				<StackGrid columnWidth={275}>
				{this.renderEvents()}
				</StackGrid>
		{/*		</Card.Group>*/}

			</div>
		);
	}
}


function msp (state) {
	return {user: state.user, events: state.events}
}

export default connect(msp)(Home)



//stackgrid columnWidth={250}