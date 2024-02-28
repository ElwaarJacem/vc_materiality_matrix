import React from 'react'
import SlideBar from '../question_types/slideBar'
import PropTypes from 'prop-types'

function QuestionsControler ({ disabled, question, saveResponse, response, questionHelpText }) { 
  if (question) {
      return <SlideBar questionHelpText={questionHelpText} fullResponse={response} disabled={disabled} saveResponse={saveResponse} question={question} reponse={response?.complexValue ? response.complexValue : ''} />
  } else { return undefined }
}
QuestionsControler.propTypes = {
  disabled: PropTypes.bool,
  question: PropTypes.object,
  saveResponse: PropTypes.func,
  response: PropTypes.object,
  questionHelpText: PropTypes.string
}

export default QuestionsControler
