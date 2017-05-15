import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */
const { Types, Creators } = createActions({
  startup: null,
  startupSuccess: null,
})

export const StartupTypes = Types
export default Creators

export const INITIAL_STATE = Immutable({
  status: 0,
})

/* ------------- Reducers ------------- */
export const startupRequest = state =>
  state.merge({ status: 1})

export const startupSuccess = state =>
  state.merge({ status: 2})
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.STARTUP]: startupRequest,
  [Types.STARTUP_SUCCESS]:startupSuccess
})

/* ------------- Selectors ------------- */
