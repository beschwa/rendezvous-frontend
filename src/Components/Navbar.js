import React from 'react';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
// import IconButton from '@material-ui/core/IconButton';
// import MenuIcon from '@material-ui/icons/Menu';
// import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import { clearErrors } from '../actions.js'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { 
	faHome as Home, 
	faUser as Profile, 
	faPlusSquare as Add, 
	faSignOutAlt as LogOut,
	faSignInAlt as LogIn,
	faUserPlus as SignUp,
	faArrowLeft as Back 
} from '@fortawesome/free-solid-svg-icons'

import {connect} from 'react-redux'
import {PAGES} from '../types'



class Navbar extends React.Component {

	state = {
		canBack: true
	}

	renderNav = () => {
		return this.props.user ? 
				<React.Fragment>
					<li><Link to="/home" onClick={this.props.clearErrors}><FontAwesomeIcon icon={Home}size="lg"/></Link></li>
					<li><Link to="/profile" onClick={this.props.clearErrors}><FontAwesomeIcon icon={Profile} size="lg"/></Link></li>
					<li><Link to="/create" onClick={this.props.clearErrors}><FontAwesomeIcon icon={Add} size="lg"/></Link></li>
					<li><Link to="/logout"><FontAwesomeIcon icon={LogOut} size="lg"/></Link></li>
				</React.Fragment>
			:
				<React.Fragment>
					<li><Link to="/signup" onClick={this.props.clearErrors}><FontAwesomeIcon icon={SignUp} size="lg"/></Link></li>
					<li><Link to="/login" onClick={this.props.clearErrors}><FontAwesomeIcon icon={LogIn} size="lg"/></Link></li>
				</React.Fragment>

	}

	renderBack = () => {
		let canBack = false
		PAGES.forEach(pagename => {
			if(this.props.page.includes(pagename))
				canBack = true
		})
		return canBack ? 
			<li>
				<a> <FontAwesomeIcon icon={Back} size="lg" onClick={this.props.back} />
				</a>
			</li>
			:
			null
	}

	render() {
		console.log("NAV\n", this.props)
		return (
			<nav className="blah">
				<div className="logo"><h4> Do Shit </h4></div>
				<ul className="nav-links">
				{this.renderBack()}
				{this.renderNav()}
				</ul>
			</nav>
		)
	}
}

function msp (state, props) {
	return {user: state.user}
}

export default connect(msp, {clearErrors})(Navbar)
