import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { clearErrors } from '../actions.js'

import {connect} from 'react-redux'

class Navbar extends React.Component {


	toggleOnUser = () => {
		return this.props.user ? 
			<React.Fragment>
			<Menu.Item name= 'home'>
					<Link to="/home" onClick={this.props.clearErrors}>
						Home
					</Link>
				</Menu.Item>
			<Menu.Item>
					<Link to="/profile" onClick={this.props.clearErrors}>
						Profile
					</Link>
			</Menu.Item>
			<Menu.Item>
					<Link to="/create" onClick={this.props.clearErrors}>
						{"+"}
					</Link>
			</Menu.Item>
			<Menu.Menu position="right">
				<Menu.Item>
						<Link to="/logout">
							Log Out
						</Link>
				</Menu.Item>
			</Menu.Menu>
			</React.Fragment>
			:
			<React.Fragment>
				<Menu.Item>
					<Link to="/signup" onClick={this.props.clearErrors}>
						Sign Up
					</Link>
				</Menu.Item>
				<Menu.Item>
					<Link to="/login" onClick={this.props.clearErrors}>
						Log In
					</Link>
				</Menu.Item>
			</React.Fragment>
	}



	render() {
		return (
			<Menu>
				{this.toggleOnUser()}
			</Menu>
		)
	}
}

function msp (state) {
	return {user: state.user}
}

export default connect(msp, {clearErrors})(Navbar)
