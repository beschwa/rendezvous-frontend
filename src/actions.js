import {ADDUSER, ADDEVENTS, LOGOUT, ADDEVENT, EDITEVENT} from './types'


export function addEvents () {
	return function (dispatch){
		return fetch('http://localhost:3000/api/v1/events')
			.then(res => res.json())
			.then(resp =>{
				// debugger
				dispatch({ type: ADDEVENTS, payload: resp })
			})
	}
}

export function login (credentials) {
	return function (dispatch){
		return fetch('http://localhost:3000/api/v1/login',{
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({user: credentials})
			})
				.then(res => res.json())
				.then(resp => {
					 console.log("logged in", resp)
					setJWT(resp.jwt)
					dispatch({ type: ADDUSER, payload: resp.user })
				})
	}
}

export function signup (credentials) {
	return function (dispatch) {
		return fetch('http://localhost:3000/api/v1/users', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({user: credentials})
    		}).then(res => res.json())
				.then(resp => {
					setJWT(resp.jwt)
					// debugger
					dispatch({ type: ADDUSER, payload: resp.user })
				})
	}

}

export function editUser (userID, userObj) {
	console.log("hit edit user", localStorage.JWT)
	return function (dispatch) {
		return fetch(`http://localhost:3000/api/v1/users/${userID}`,{
			method: 'PATCH',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${localStorage.JWT}`
			},
			body: JSON.stringify(userObj)
		}).then(res => res.json())
			.then(resp => {
				if(!resp.error)
					dispatch({type: ADDUSER, payload: resp.user})
			
			})
	}
}

export function eventCreate (eventObj) {
	return function (dispatch) {
		return fetch('http://localhost:3000/api/v1/events/', {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${localStorage.JWT}`
			},
			body: JSON.stringify(eventObj)
		}).then(res=>res.json())
			.then(resp => {
				dispatch({type: ADDEVENT, payload: resp.event})
				return resp.event.id
			})
	}
}

export function editEvent (eventID, editObj) {
	return function (dispatch) {
		return fetch(`http://localhost:3000/api/v1/events/${eventID}`, {
			method: 'PATCH',
			headers: {
				'Content-Type' : 'application/json',
				Accept: 'application/json',
				'Authorization': `Bearer ${localStorage.JWT}`
			},
			body: JSON.stringify(editObj)
		}).then(res=>res.json())
			.then(resp => {
				dispatch({type: EDITEVENT, payload: resp.event})
			})
	}
}

export function logOut () {
	return function (dispatch) {
		removeJWT()
		dispatch({type: LOGOUT})
	}
}

function setJWT (token) {
	localStorage.setItem("JWT", token)
}

function removeJWT () {
	localStorage.removeItem("JWT")
}




// export function addEvents() {
// 	return function (dispatch){
		
// 	}
// }