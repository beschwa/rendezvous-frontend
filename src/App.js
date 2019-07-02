import React from 'react';
import { Route, Switch, Redirect} from "react-router-dom";
import 'typeface-roboto'
import EventPage from './Components/EventPage'
import UserPage from './Components/UserPage'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import Profile from './Components/Profile'
import Home from './Components/Home'
import {connect} from 'react-redux'
import EventCreate from './Components/EventCreate'
import { withRouter } from "react-router";
import {addEvents, addUsers, login, signup, editUser, logOut, autoLogin, getArrayFrom} from './actions'
import './App.css';
import 'semantic-ui-css/semantic.min.css';


class App extends React.Component {

  signUp = (credentials) => {
    this.props.signup(credentials).then(() => this.props.addEvents())
  }

  componentDidMount() {
      // this.props.addEvents()
      if(localStorage.JWT) this.props.autoLogin()
          .then(() => this.props.addEvents())
          .then(() => this.props.addUsers())
  }

  login = credentials => e => {
    e.preventDefault()
    debugger
    this.props.login(credentials).then(() => this.props.addEvents())

  }

  editUser = e => {
    e.preventDefault()
    let editObj = {}
    for (let x = 0; x < 12; x++) {
      if(!!e.target[x].value) {
        editObj[e.target[x].name] = e.target[x].value
      }
    }
    this.props.editUser(this.props.user.id, editObj)
  }

  renderLogin = (props) => {
    return this.props.user ?
      <Redirect from='/login' to='/home'/>
        : <Login {...props} login={this.login}/>
  }

  renderSignup = (props) => {
    return this.props.user ? 
      <Redirect from='/signup' to='/home'/> 
        : <Signup {...props} handleFormChange={this.handleFormChange} signUp={this.signUp}/>
  }

  renderLanding = (props) =>{
    return this.props.user ? 
          <Redirect from='/' to='/home'/> 
            : <Landing {...props}/>
  }

  renderHome = (props) => {
    return this.props.user ?
      <Home {...props}/>
        : <Redirect from='/home' to='/'/>
  }


  renderEventPage = (props) => {
    const foundEvent = getArrayFrom(this.props.events).find(event => event.id === parseInt(props.match.params.id))
    return foundEvent ? <EventPage {...foundEvent} router={props} /> : <Redirect from='/events/:id' to='/'/>
  }

  renderUserPage = (props) => {

    const foundUser = getArrayFrom(this.props.users).find(user => user.id === parseInt(props.match.params.id))
    // debugger
    return Boolean(foundUser) ? <UserPage {...foundUser} router={props} /> : <Redirect from='/users/:id' to='/'/>
  }

  renderProfile = (props) => {
    return this.props.user ?
      <Profile router={props} editUser={this.editUser}/>
        : <Redirect from='/profile' to='/'/>
  }

  logOut = () => {
    this.props.logOut()
    return <Redirect from='/logout' to='/'/>
  }

  renderEventCreate = (props) => {
    return this.props.user ?
      <EventCreate router={props}/>
        : <Redirect from='/create' to='/'/>
  }

  render() {
    console.log("APP\n", this.props)
    return (
      <div className="App">
            <Navbar page={this.props.location.pathname} back={this.props.history.goBack}/>
            <div className="Spacer"/>
            <div className="current">
            <Switch>
              <Route path='/users/:id' render={this.renderUserPage}/>
              <Route path='/events/:id' render={this.renderEventPage}/>
              <Route path='/signup' render={this.renderSignup}/>
              <Route path='/login' render={this.renderLogin}/>
              <Route path='/profile' render={this.renderProfile}/>
              <Route path='/home' render={this.renderHome}/>
              <Route path='/create' render={this.renderEventCreate}/>
              <Route path='/logout' render={this.logOut}/>
              <Route path='/' render={this.renderLanding}/>
            </Switch>
            </div>
      </div>
    )
  }
}


function msp(state) {
  return {...state}
}
 
export default connect(msp, {login, addEvents, signup, editUser, logOut, autoLogin, addUsers})(withRouter(App))
