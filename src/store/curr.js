import axios from 'axios'

const LOAD_CURR = 'LOAD_CURR'
const ADD_CURR = 'ADD_CURR'
const DELETE_CURR = 'DELETE_CURR'

const initialState = {curr: {}}

const currReducer = (state= initialState, action)=>{
  if(action.type === LOAD_CURR){
    state.curr = action.curr
  }
  if(action.type === DELETE_CURR){
    state.curr = state.filter(curr => curr.id !== action.curr.id)
  }
  if(action.type === ADD_CURR){
    state.curr = action.curr
  }
  return {...state}
}

const _loadCurr = (curr) =>{
  return {
    type: LOAD_CURR,
    curr
  }
}

export const loadCurr =()=>{
  return async (dispatch)=>{
    const curr = (await axios.get('/api/curr')).data
    dispatch(_loadCurr(curr))
  }
}

const _addCurr = (curr)=>{
  return {
    type: ADD_CURR,
    curr
  }
}

export const addCurr = (info)=>{
  return async (dispatch)=>{
    const curr = (await axios.post('/api/curr', info)).data;
    dispatch(_addCurr(curr));
  }
}

const _deleteCurr = (curr)=>{
  return {
    type: DELETE_CURR,
    curr
  }
}

export const deleteCurr = (info)=>{
  return async(dispatch)=>{
    if(info){
      await axios.delete(`/api/curr/${info.id}`)
      dispatch(_deleteCurr(info))
    }
  }
}

export { currReducer };