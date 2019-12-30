import {fetchReducer} from './fetchReducer'
import {chooseSearchReducer} from './chooseSearchReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    fetchReducer,
    chooseSearchReducer
})

export default rootReducer;