import React from 'react';
import { Route, Switch, Redirect} from "react-router-dom";
import 'typeface-roboto'
import EventPage from './Components/EventPage'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Landing from './Components/Landing'
import Profile from './Components/Profile'
import Home from './Components/Home'
import {connect} from 'react-redux'
import EventCreate from './Components/EventCreate'
import {addEvents, login, signup, editUser, logOut, autoLogin} from './actions'
import './App.css';


class App extends React.Component {

  signUp = (credentials) => {
    this.props.signup(credentials).then(() => this.props.addEvents())
  }

  componentDidMount() {
      // this.props.addEvents()
      if(localStorage.JWT) this.props.autoLogin().then(() => this.props.addEvents())
  }

  login = credentials => e => {
    e.preventDefault()
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
    const foundEvent = this.props.events.find(event => event.id === parseInt(props.match.params.id))
    return foundEvent ? <EventPage {...foundEvent} router={props} /> : <Redirect from='/events/:id' to='/'/>
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
    return (
      <div className="App">
            <Navbar/>
            <Switch>
              <Route path='/events/:id' render={this.renderEventPage} />
              <Route path='/signup' render={this.renderSignup}/>
              <Route path='/login' render={this.renderLogin}/>
              <Route path='/profile' render={this.renderProfile}/>
              <Route path='/home' render={this.renderHome}/>
              <Route path='/create' render={this.renderEventCreate}/>
              <Route path='/logout' render={this.logOut}/>
              <Route path='/' render={this.renderLanding}/>
            </Switch>

      </div>
    )
  }
}


function msp(state) {
  return {...state}
}
 
export default connect(msp, {login, addEvents, signup, editUser, logOut, autoLogin})(App)
