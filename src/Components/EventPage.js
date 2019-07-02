import React from 'react';
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'
import {editEvent, joinEvent, getArrayFrom, leaveEvent} from '../actions'
import { Grid, Segment, Button, Form, List, Image, Header, Icon} from 'semantic-ui-react'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
// import 'semantic-ui-css/semantic.min.css'


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


	leave = () => {
		this.props.leaveEvent(this.props.id, this.props.user.id)
	}

	join = () => {
		this.props.joinEvent(this.props.id, this.props.user.id)
	}


 	renderAttending = () => {
 		// debugger
 		return 	<List animated  verticalAlign="middle">
 					{getArrayFrom(this.props.attending).map(attendee => { 
 						return 	<List.Item>
 									
									<Image avatar src={`https://robohash.org/${attendee.username}/?set=set5`}/>
									<List.Content>
										<List.Header>
										<Link to={`/users/${attendee.id}`}>
											{attendee.username}
										</Link>
										</List.Header>
									</List.Content>
 								</List.Item>
 					})}
 				</List>
 	}


 	renderButtons = () => {
 		if(this.props.isOwner)
 			return <Button onClick={this.editToggle}>edit</Button>
 		else
 			return this.props.isEmpty ? this.renderLeave() : this.renderJoinLeave()
 	}



 	renderLeave = () => {
 		 return	this.props.isMember ?
					<Button name="leave" className="btn enabled" onClick={this.leave}>Leave</Button>
				:
					<Button name="join" className="btn disabled" disabled>Event Full!</Button>
 	}






	renderJoinLeave = () => {

		return	this.props.isMember ?
				<React.Fragment>
				<Button.Group>
					<Button className="btn disabled" disabled>Join</Button>
					<Button.Or text=""/>
					<Button className="btn enabled" positive name="leave" onClick={this.leave}>Leave</Button>
					</Button.Group>
				</React.Fragment>

				:
				<React.Fragment>
				<Button.Group>
					<Button className="btn enabled" positive name="join" onClick={this.join}>Join</Button>
					<Button.Or text=""/>
					<Button className="btn disabled" disabled>Leave</Button>
					</Button.Group>
				</React.Fragment>
	}


	goHome = () => {
		// this.props.router.history.push('/home')
		this.props.router.history.goBack()
	}

	backButton = () => {
		return <Button onClick={() => this.props.router.history.push('/home')}> Back to Home </Button>
	}

	mainInfo = () => {
		return 		<div className="maininfo">
						<h1>{this.props.name}</h1>
						<h3>Creator: {this.props.isOwner ? "You" : <Link to={`/users/${this.props.owner.id}`}>{this.props.owner.name}</Link>}
						</h3>
						<h5>Looking For {this.props.space_left} more</h5>
						{this.renderButtons()}
					</div>
						
	}

	mainInfoSemantic = () => {
		return 		<React.Fragment>
						<Header as='h2'>
							<Header.Content>
								Creator: {this.props.isOwner ? "You" : <Link to={`/users/${this.props.owner.id}`}>{this.props.owner.name}</Link>}
							</Header.Content>
						</Header>
						<Header as="h5">Looking For {this.props.space_left} more</Header>
						{this.renderButtons()}
					</React.Fragment>
						
	}

	eventInfo = () => {
		return		<div className="eventinfo">
						<div className="eventdetails">
						<h2>Location</h2> 
						<h4>{this.props.location}</h4>
						<h2>Description</h2> 
						<p>{this.props.description}</p>
						<h3>Relevant Links: <a src={this.props.relevant_url}>Link</a></h3>
						</div>
						<div className="eventattending">{this.renderAttending()}</div>
					</div>
	}
	showEvent = () => {
		return 	<div className="eventshow">
					{this.mainInfo()}
					{this.eventInfo()}
					<div className="eventimage">
						<img src={this.props.image_url} alt="" className="eimg"/>
					</div>
					</div>
		
	}

	showEventSemantic = () => {
		return 	<div className="event">
					<Grid container verticalAlign='middle'>
						<Grid.Row columns={2} divided>
							<Grid.Column width={8}>
								<Segment inverted>
									<Header as='h1'>
									{this.props.name}
									</Header>
								</Segment>
								<Segment inverted >
									<Image src={this.props.image_url} alt="" fluid/>
								</Segment>
							</Grid.Column>
							<Grid.Column width={8}>
								<Segment inverted >
									{this.mainInfoSemantic()}
								</Segment>
					
									<Segment inverted attached>
										<h2>Location</h2> 
									</Segment>
									<Segment inverted attached='bottom' className="bott">
										<h4>{this.props.location}</h4>
									</Segment>

										<Segment inverted attached>
									<h2>Description</h2> 
									</Segment>
									<Segment inverted attached="bottom" className="bott">
									<p>{this.props.description}</p>
									</Segment>
									<Segment inverted>
									<h3>Relevant Links: <a href={this.props.relevant_url} alt="" target="_blank">Link</a></h3>
									</Segment>
				
								
							</Grid.Column>
						</Grid.Row>
						<Grid.Row stretched>

						<Segment inverted attached>
							<Header as='h2'>Attending</Header>
						</Segment>
						<Segment inverted attached='bottom'  className="bott">
									{this.renderAttending()}
								</Segment>
						</Grid.Row>
					</Grid>
					</div>
		
	}

	editEventForm = () => {
		return 	<div style={{width: '50%', margin: 'auto'}}>
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

				
	}


	render(){
		console.log(this.props)
		return (
			<div className="eventpage animate-pop-in">
		{/*				<div className="tools">
					<FontAwesomeIcon icon={faArrowLeft} onClick={this.goHome}/>
				</div>*/}

				{this.state.editMode ? this.editEventForm() : this.showEventSemantic()}
			</div>
		)
	}
}

function msp (state, props) {
	// debugger
	// debugger
	let isOwner = state.user.id == props.owner.id ? true : false
	let isMember = !!props.attending[state.user.id]
	let isEmpty = props.space_left === 0 ? true : false
	return {user: state.user, isOwner: isOwner, isMember: isMember, isEmpty: isEmpty, users: state.users}
}

export default connect(msp, {editEvent, joinEvent, leaveEvent})(EventPage)



{/*<Button onClick={() => this.props.router.history.push('/home')}> Back to Home </Button>*/}