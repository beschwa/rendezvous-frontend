import React from 'react';
import {connect} from 'react-redux'
import EventCard from '../Singles/EventCard'
import StackGrid from "react-stack-grid";


class Home extends React.Component {

	renderEvents = () => {
		return this.props.events.map(event => {
			return <EventCard key={event.id} {...event} handleClick={this.showEvent}/>
		})

	}

	showEvent = (eventID) => {
		this.props.history.push(`./events/${eventID}`)
	}

	render() {
		return (
			<div>
				<h1>Welcome {this.props.user.username}!</h1>


				<StackGrid columnWidth={250}>
				{this.renderEvents()}
				</StackGrid>
			</div>
		);
	}
}


function msp (state) {
	return {user: state.user, events: state.events}
}

export default connect(msp)(Home)
