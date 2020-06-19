import { combineReducers } from 'redux'

import userDetailsReducer from './userDetails'
import menuReducer from './menu'

const rootReducer = combineReducers({
  userDetails: userDetailsReducer,
  menu: menuReducer
})

export default rootReducer
