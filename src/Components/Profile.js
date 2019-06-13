import React from 'react';
import {connect} from 'react-redux'
import { Button, Form} from 'semantic-ui-react'
import { editUser } from '../actions'

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
		for (let x = 0; x < 12; x++) {
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
		whoArr.push(<h1>Username: {this.props.user.username}</h1>)
		// debugger
		if (this.props.user.display_name !== null) whoArr.push(<h4>Display Name: {this.props.user.display_name}</h4>)
		if (this.props.user.full_name !== null) whoArr.push(<h4>Full Name: {this.props.user.full_name}</h4>)
		if (this.props.user.email !== null) whoArr.push(<h4>Email: {this.props.user.email}</h4>)
		if (this.props.user.tagline !== null) whoArr.push(<h4>Tag Line: {this.props.user.tagline}</h4>)
		return whoArr
	}

	renderAbout = () => {
		let aboutArr = []
		aboutArr.push(<React.Fragment><h2>Bio</h2><p>{this.props.user.bio}</p></React.Fragment>)
		if (this.props.user.birthday !== null) aboutArr.push(<h4>Birthday: {this.props.user.birthday}</h4>)
		if (this.props.user.location !== null) aboutArr.push(<h4>Location: {this.props.user.location}</h4>)
		if (this.props.user.occupation !== null) aboutArr.push(<h4>Occupation: {this.props.user.occupation}</h4>)
		return aboutArr
	}

	renderWhat = () => {
		let whatArr = []
		whatArr.push(<h2>{'<3'}</h2>)
		if (this.props.user.gender !== null) whatArr.push(<h4>Gender: {this.props.user.gender}</h4>)
		if (this.props.user.orientation !== null) whatArr.push(<h4>Orientation: {this.props.user.orientation}</h4>)
		if (this.props.user.relationship_status !== null) whatArr.push(<h4>Relationship Status: {this.props.user.relationship_status}</h4>)
		if (this.props.user.romantic_preference !== null) whatArr.push(<h4>Romantic Preference: {this.props.user.romantic_preference}</h4>)
		return whatArr
	}

	showProfile = () => {
		return <React.Fragment>
	
				<img src={this.props.user.avatar} alt=""/>
				{this.renderWho()}
				{this.renderAbout()}
				{this.renderWhat()}
		</React.Fragment>
	}

	editProfile = () => {
		return <div style={{width: '50%', margin: 'auto'}}>

			<Form onSubmit={this.editUser}>

				<h1> Who </h1>
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
			<div>
				<Button onClick={this.editToggle}>Toggle Editmode</Button> <br/>
				{this.state.editMode ? this.editProfile() : this.showProfile()}
			</div>
		)
	}
}

function msp (state) {
	return {user: {...state.user}}
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