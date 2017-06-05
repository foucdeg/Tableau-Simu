import { combineReducers } from 'redux'
import scenarData from './data'

const user = (state = {
  email: 'jean-michel.mec-du-simu@students.isae-supaero.fr',
  name: 'Jean-Michel Mec du Simu',
  pictureUrl: 'https://randomuser.me/api/portraits/men/1.jpg'
}, action) => {
  return state
}

const scenars = (state = scenarData, action) => {
  return state
}

const formScenar = (state = {
  name: '',
  description: ''
}, action) => {
  return state
}

const rootReducer = combineReducers({
  user,
  scenars,
  formScenar
})

export default rootReducer
