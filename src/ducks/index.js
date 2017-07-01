import { combineReducers } from 'redux'

import app from './app'
import notes from './notes'
import tags from './tags'

const rootReducer = combineReducers({
  app,
  notes,
  tags
})

export default rootReducer
