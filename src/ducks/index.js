import { combineReducers } from 'redux'

import notes from './notes'
import tags from './tags'

const rootReducer = combineReducers({
  notes,
  tags
})

export default rootReducer
