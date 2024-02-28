import React from 'react'
import QuestionsControler from './questionControler'
import { useCreateResponseMutation } from '../../features/response/responsesSlice'

import { useParams } from 'react-router-dom'
import PropTypes from 'prop-types'
function Question ({ surveyQuestions, disabled, responses }) {
  const [createResponse, { isLoading, isSuccess, isError }] = useCreateResponseMutation()
  const { idCampaign, idUser } = useParams()

  const data = { campaign: idCampaign }

  const handleSaveQuestion = (data) => {
    if (!disabled) {
      let questionData = { value: '', campaign: '', question: '', complexValue: '', question_help_text: '' }
      questionData = { ...questionData, ...data, campaign: idCampaign, user: idUser }
      createResponse(questionData)
    } else {
      createResponse(data)
    }
  }

  return (
    <div className="bg-[#f5f4f0] flex flex-col gap-1 w-full  rounded-md p-1">
    {surveyQuestions
      ? surveyQuestions.map((question, index) =>
    <QuestionsControler  isLoading={isLoading} isSuccess={isSuccess} isError= {isError} disabled={disabled}
    response={responses ? responses.find((resp) => resp.question === question.uuid) : undefined} questionHelpText={question?.question_help_text}
    saveResponse={handleSaveQuestion} commentUser={commentUser} key={question?.uuid ? question.uuid : index } question ={question}/>
      )
      : undefined}
    </div>
  )
}
Question.propTypes = {
  surveyQuestions: PropTypes.array,
  disabled: PropTypes.bool.isRequired,
  responses: PropTypes.array
}
export default Question
