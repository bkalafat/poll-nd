import {showLoading, hideLoading} from 'react-redux-loading'
import { getInitialData } from '../utils/api'

export function handleInitialData () {
  return (dispatch) => {
    dispatch(showLoading())
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(hideLoading())
      })
  }
}