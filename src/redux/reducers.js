import { combineReducers } from 'redux'
import { GET_MATCHES } from './actions'

const initialMatchesState = {
  matches: []
}

const matchesReducer = (state = initialMatchesState, action) => {
  switch (action.type) {
    case GET_MATCHES:
      return {
        ...state,
        matches: action.payload
      }
    default:
      return state
  }
}

const rootReducer = combineReducers({
  matches: matchesReducer
})

export default rootReducer