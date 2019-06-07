import {saveQuestion, saveQuestionAnswer} from '../utils/api'
import {showLoading, hideLoading} from 'react-redux-loading'

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const ADD_QUESTION = 'ADD_QUESTION'
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER'

function addQuestion (question) {
  return {
    type: ADD_QUESTION,
    question
  }
}

export function handleAddQuestion (optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const {authedUser} = getState()

    dispatch(showLoading())
    return saveQuestion({
      optionOneText,
      optionTwoText,
      authedUser
    })
    .then((question) => dispatch(addQuestion(question)))
    .then(() => dispatch(hideLoading()))
  }
}

export function handleAddQuestionAnswer (qid, answer) {
  return (dispatch, getState) => {
    const {authedUser} = getState()
    dispatch(addQuestionAnswer(authedUser, qid, answer))

    dispatch(showLoading())
    return saveQuestionAnswer({
      authedUser,
      qid,
      answer
    })
    .then((questions,users) => dispatch(addQuestionAnswer(questions, users)))
    .then(() => dispatch(hideLoading()))
  }
}

function addQuestionAnswer(questions,users) {
  return {
    type: ADD_QUESTION_ANSWER,
    questions,
    users
  }
}

export function receiveQuestions (questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions
  }
}