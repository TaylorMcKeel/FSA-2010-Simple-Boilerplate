import axios from 'axios'

const LOAD_FAVES = 'LOAD_FAVES'
const ADD_FAVE = 'ADD_FAVE'
const DELETE_FAVE = 'DELETE_FAVE'

const initialState = {faves: []}

const favesReducer = (state= initialState, action)=>{
  if(action.type === LOAD_FAVES){
    state.faves = action.faves
  }
  if(action.type === DELETE_FAVE){
    state.faves = state.faves.filter(fave => fave.id !== action.fave.id)
  }
  if(action.type === ADD_FAVE){
    state.faves = [...state.faves, action.fave]
  }
  return {...state}
}

const _loadFaves = (faves) =>{
  return {
    type: LOAD_FAVES,
    faves
  }
}

export const loadFaves =()=>{
  return async (dispatch)=>{
    const faves = (await axios.get('/api/faves')).data
    dispatch(_loadFaves(faves))
  }
}

const _addFave = (fave)=>{
  return {
    type: ADD_FAVE,
    fave
  }
}

export const addFave = (info)=>{
  return async (dispatch)=>{
    const fave = (await axios.post('/api/faves', info )).data;
    dispatch(_addFave(fave));
  }
}

const _deleteFave = (fave)=>{
  return {
    type: DELETE_FAVE,
    fave
  }
}

export const deleteFave = (info)=>{
  return async(dispatch)=>{
    console.log(info)
    await axios.delete(`/api/faves/${info}`)
    dispatch(_deleteFave(info))
  }
}

export { favesReducer };