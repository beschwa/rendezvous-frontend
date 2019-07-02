import {ADDUSER, ADDEVENTS, LOGOUT, ADDEVENT, EDITEVENT, SETERROR, CLEARERROR, LEAVEEVENT, JOINEVENT, ADDUSERS} from '../types'

let initialState = {
	events: {},
	user: null,
	page: "",
	error: null,
	users: {}
}	

export function firstReducer (state = initialState, action) {

	switch(action.type){
		case ADDUSER:
			return {...state, user: {...action.payload}, error: null}
		case ADDEVENTS:
			return {...state, events: prepareEvents(action.payload)}
		case LOGOUT:
			return {...state, user: null, error: null}
		case ADDEVENT:
			return {...state, user: addOwnedEvent(state.user, action.payload.id), events: addOrReplaceEvent(state.events, action.payload), error: null}
		case EDITEVENT:
			return {...state, events: addOrReplaceEvent(state.events, action.payload)}
		case SETERROR:
			return {...state, error: action.payload.split(',')}
		case CLEARERROR:
			return {...state, error: null}
		case JOINEVENT:
			return {...state, user: join(state.user, action.payload.event_id), events: addAttendee(state.events, action.payload.event_id, action.payload.user)}
		case LEAVEEVENT:
			return {...state, user: leave(state.user, action.payload.event.id) ,events: removeAttendee(state.events, action.payload.event, action.payload.user)}
		case ADDUSERS:
			return {...state, users: arrayToObject(action.payload, "id")}
		default:
			return state
	}
}



const prepareEvents = (events) => {
	let newEvents = events.map(event => {
		// debugger
		event.attending = arrayToObject(event.attending, "id")
		return event
	})
	// debugger
	return arrayToObject(newEvents, "id")
}

const addOwnedEvent = (user, eventID) => {
	let newUser = {...user}
	newUser.event_info.owned.push(eventID)
	return newUser
}

const addOrReplaceEvent = (events, event) => {
	// debugger
	let newEvents = {...events}
	newEvents[event.id] = event
	return newEvents
}


const join = (user, eventId) => {
	let newUser = {...user}
	newUser.event_info.attending.push(eventId)
	return newUser
}
const addAttendee = (events, eventId, user) => {
	// debugger
	let newEvents = {...events}
	newEvents[eventId]["attending"][user.id] = user
	newEvents[eventId].space_left--
	return events
}

const leave = (user, eventId) => {
	let newUser = {...user}
	newUser.event_info.attending = newUser.event_info.attending.filter(a => a !== eventId)
	return newUser

}
const removeAttendee = (events, event, userId) => {
	// debugger
	let newEvents = {...events}
	delete newEvents[event.id]["attending"][userId]
	newEvents[event.id].space_left++
	return newEvents
}

/**********************************************************************
arrayToObject function credits to Chris Burgin in an article
on Medium titled "Rewriting JavaScript: Converting an Array..."
Link: *below*
https://medium.com/dailyjs/rewriting-javascript-converting-an-array-of-objects-to-an-object-ec579cafbfc7
**********************************************************************/

const arrayToObject = (array, keyField) =>
   array.reduce((obj, item) => {
     obj[item[keyField]] = item
     return obj
   }, {})
