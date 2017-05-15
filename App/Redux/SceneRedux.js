
import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  updateScene: ['sceneKey'],
})

export const SceneTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  sceneKey:null,
})

/* ------------- Reducers ------------- */
export const updateScene = (state,{sceneKey}) => {
  return state.merge({sceneKey:sceneKey})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_SCENE]: updateScene,
})

/* ------------- Selectors ------------- */
