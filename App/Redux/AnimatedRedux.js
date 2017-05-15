import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  moveWithScrollView: ['scrollY','inOnTime'],
})

export const MainScreenTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  swapNavBar:{scrollY:0,lastScrollY:0,inOnTime:false},
})

/* ------------- Reducers ------------- */
export const moveWithScrollView = (state,{ scrollY,inOnTime = false }) => {
  return state.merge({ swapNavBar : {lastScrollY: state.swapNavBar.scrollY, scrollY: scrollY, inOnTime: inOnTime}});
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.MOVE_WITH_SCROLL_VIEW]: moveWithScrollView,
})
