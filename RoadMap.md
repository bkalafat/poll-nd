#) Dashboard Component Specs:
	is located at the home route (/home)
	Has two tabs (Unanswered Questions, Answered Questions)
	shows QuestionCards sorted from most recently added at the top, to oldest at the bottom

	1) QuestionCard Component Specs:
		the author's name, avatar
		first choice's text
		View Pull button(Opens Question view)

##) Question Component Specs:
	is located at the question's route (/questionId)
	the author's name, avatar
	all choices
	Authed user
	Submit button(Save's answer and lock authed user's answer)
	"Answered view has extra"
	Results for that question like
	Percentage and counts of each answer to all answer.
	Authed user's answer highligthed.

###) New Question Component Specs:
	is located at the new route (/new)
	Authed user
	Create Question View
	Two text area for creating answers
	Submit button for add new question.

###) Login Component Specs:
	is located at the login route (/login)
	Welcome view
	has detail list for all logged on users
	Sign in button for set selected user as AuthedUser

###) LeaderBoard Component Specs:
	is located at the leader board (/leaderboard)
	List of scoreboards ordered by Score of users
	1) ScoreBoard Component Specs:
		User's answered and created question count
		"Score = Answered + Created Questions count"


Store(AuthedUser, Questions, Users)

#### Events:
	Dashboard:
		getQuestions
	QuestionCard:Props(qid)
		-
	Question:Props(qid)
		saveQuestionAnswer({authedUser, qid, answer})
		**answer = 'optionOne' or 'optionTwo'
	NewQuestion:
		saveQuestion(question)
	Login:
		getUsers()
	LeaderBoard:
		-
	ScoreBoard:(Props(uid))
		-