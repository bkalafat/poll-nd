import React from 'react'

export default function ScoreBoard(props) {

  const { user } = props
  const questionCount = user.questions.length
  const answerCount = Object.keys(user.answers).length
  const totalPoint = questionCount + answerCount

  return (

    <div className="jumbotron" >
      <h3><img className="img-thumbnail col-8 col-sm-8 col-md-6 col-lg-4" src={user.avatarURL} alt={`Avatar of ${user.name}`} /> {user.name}</h3>
      <h5>Questions = {questionCount}</h5>
      <h5>Answers = {answerCount}</h5>
      <h3>Total = {totalPoint}</h3>
    </div>
  )
}