import {ADDUSER, ADDEVENTS, LOGOUT, ADDEVENT, EDITEVENT, SETERROR, CLEARERROR} from '../types'

let initialState = {
	events: [],
	user: null,
	page: "",
	error: null,
}	

export function firstReducer (state = initialState, action) {

	switch(action.type){
		case ADDUSER:
			return {...state, user: {...action.payload}, error: null}
		case ADDEVENTS:
			return {...state, events: action.payload}
		case LOGOUT:
			return {...state, user: null, error: null}
		case ADDEVENT:
			return {...state, events: [...state.events, action.payload], error: null}
		case EDITEVENT:
			let newEvents = [...state.events].map(event=>{
				if(event.id === action.payload.id)
					return action.payload
				else
					return event
			})
			return {...state, events: [...newEvents]}
		case SETERROR:
			return {...state, error: action.payload.split(',')}
		case CLEARERROR:
			return {...state, error: null}
		default:
			return state
	}
}


