import {ADDUSER, ADDEVENTS, LOGOUT, ADDEVENT, EDITEVENT} from '../types'

let initialState = {
	events: [],
	user: null,
	page: ""
}	

export function firstReducer (state = initialState, action) {
	console.log("STATE", state)
	console.log("Action", action)

	switch(action.type){
		case ADDUSER:
			return {...state, user: {...action.payload}}
		case ADDEVENTS:
			return {...state, events: action.payload}
		case LOGOUT:
			return {...state, user: null}
		case ADDEVENT:
			return {...state, events: [...state.events, action.payload]}
		case EDITEVENT:
			let newEvents = [...state.events].map(event=>{
				if(event.id === action.payload.id)
					return action.payload
				else
					return event
			})
			return {...state, events: [...newEvents]}
		default:
			return state
	}
}


