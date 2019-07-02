import React from 'react';
import {connect} from 'react-redux'
import { Button, Form, Grid, Segment, Image,Header, List} from 'semantic-ui-react'
import { editUser } from '../actions'
import { Link } from 'react-router-dom'
import StackGrid from "react-stack-grid"
import EventCard from '../Singles/EventCard'

class Profile extends React.Component {

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


	editUser = e => {
		e.preventDefault()
		debugger
		let editObj = {}
		for (let x = 0; x < 13; x++) {
			if(!!e.target[x].value) {
				editObj[e.target[x].name] = e.target[x].value
			}
		}
		console.log("@@@@@ edit obj", editObj)
		this.props.editUser(this.props.user.id, editObj).then(()=> {
			this.setState(prevState => {
				return {
					editMode: !prevState.editMode
				}
			})
		})
	}


	renderWho = () => {
		let whoArr = []
		// whoArr.push(<h1>Username: {this.props.user.username}</h1>)
		// debugger
		if (this.props.user.display_name !== null) whoArr.push(<Header as='h4'>Display Name: {this.props.user.display_name}</Header>)
		if (this.props.user.full_name !== null) whoArr.push(<Header as='h4'>Full Name: {this.props.user.full_name}</Header>)
		if (this.props.user.email !== null) whoArr.push(<Header as='h4'>Email: {this.props.user.email}</Header>)
		if (this.props.user.tagline !== null) whoArr.push(<Header as='h4'>Tag Line: {this.props.user.tagline}</Header>)
		return whoArr
	}

	renderBio = () => {
		return <p>{this.props.user.bio}</p>
	}
	renderAbout = () => {
		let aboutArr = []
		if (this.props.user.birthday !== null) aboutArr.push(<Header as='h4'>Birthday: {this.props.user.birthday}</Header>)
		if (this.props.user.location !== null) aboutArr.push(<Header as='h4'>Location: {this.props.user.location}</Header>)
		if (this.props.user.occupation !== null) aboutArr.push(<Header as='h4'>Occupation: {this.props.user.occupation}</Header>)
		return aboutArr
	}

	renderWhat = () => {
		let whatArr = []
		if (this.props.user.gender !== null) whatArr.push(<Header as='h4'>Gender: {this.props.user.gender}</Header>)
		if (this.props.user.orientation !== null) whatArr.push(<Header as='h4'>Orientation: {this.props.user.orientation}</Header>)
		if (this.props.user.relationship_status !== null) whatArr.push(<Header as='h4'>Relationship Status: {this.props.user.relationship_status}</Header>)
		if (this.props.user.romantic_preference !== null) whatArr.push(<Header as='h4'>Romantic Preference: {this.props.user.romantic_preference}</Header>)
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

	renderAttending = () => {
		let attendingArr = []
		debugger
		this.props.attending.forEach(num => {
			attendingArr.push(<EventCard key={num} {...this.props.events[num]} handleClick={this.showEvent}/>)
		})
		console.log(attendingArr)
		debugger
		return attendingArr

	}

	showEvent = (eventID) => {
		this.props.router.history.push(`./events/${eventID}`)
	}

	renderOwned = () => {
		let ownedArr = []
		this.props.owned.forEach(id => {
				ownedArr.push(<EventCard key={id} {...this.props.events[id]} handleClick={this.showEvent}/>)
		})
		return ownedArr
	}

	renderEventsOwned = () => {
		return this.props.owned.map(event => {
			return <List.Item><Link to={`/events/${event.id}`}>{event.name}</Link></List.Item>
		})
	}

	showProfile = () => {
		return <div className="profile animate-pop-in" >
					<Grid container verticalAlign='middle'>
						<Grid.Row textAlign="center" centered columns={2}>
							<Grid.Column textAlign="center">
								<Segment inverted>
									<Image src={this.props.user.avatar} alt="" fluid/>
								</Segment>
								<Segment inverted attached>
									<Header as="h1">{this.props.user.username}</Header>

								</Segment>
								<Segment inverted attached='bottom' className="about bott">
									{this.renderBio()}
								</Segment>
							</Grid.Column>
							<Grid.Column textAlign="center">
								<Segment inverted>
									<Button onClick={this.editToggle}>Toggle Editmode</Button>
								</Segment>
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

	editProfile = () => {
		return <div style={{width: '50%', margin: 'auto'}}>

			<Form onSubmit={this.editUser}>
				<h1> Who </h1>
				<Form.Input name="avatar" label="Avatar URL" placeholder={this.props.user.avatar}/>
				<Form.Input name="display_name" label="Display Name" placeholder={this.props.user.diplay_name}/>
				<Form.Input name="full_name" label="Full Name" placeholder={this.props.user.full_name}/>
				<Form.Input name="email" label="Email" placeholder={this.props.user.email}/>
				<Form.Input name="tagline" label="Motto" placeholder={this.props.user.tagline}/>
				<h1> About </h1>
				<Form.Input name="bio" label="Bio" placeholder={this.props.user.bio}/>
				<Form.Input name="birthday" label="Birthday" placeholder={this.props.user.birthday}/>
				<Form.Input name="location" label="Location" placeholder={this.props.user.location}/>
				<Form.Input name="occupation" label="Occupation" placeholder={this.props.user.occupation}/>
				<h1> {'<3'} </h1>
				<Form.Input name="gender" label="Gender" placeholder={this.props.user.gender}/>
				<Form.Input name="orientation" label="Orientation" placeholder={this.props.user.orientation}/>
				<Form.Input name="relationship_status" label="Relationship Status" placeholder={this.props.user.relationship_status}/>
				<Form.Input name="romantic_preference" label="Romantic Preference" placeholder={this.props.user.romantic_preference}/>
				<Button type="submit">Save changes!</Button>

			</Form>
			</div>
	}

	render() {
		console.log("PROPS", this.props)
		return (
			<div className="profilepage">
				{this.state.editMode ? this.editProfile() : this.showProfile()}
			</div>
		)
	}
}

function msp (state) {
	// debugger
	let user = {...state.user}
	let attending = user.event_info.attending.map(eventID => {
		return state.events[eventID]
	})
	let owned = user.event_info.owned.map(eventID => {
		return state.events[eventID]
	})
	return {user: user, attending: attending, owned: owned, events:state.events}
}

export default connect(msp, {editUser})(Profile)

/*
	WHO
	username
	display_name
	full_name
	email
	tagline

	ABOUT
	bio
	birthday
	location
	occupation

	avatar

	WHAT
	gender
	orientation
	relationship_status
	romantic_preference




*/