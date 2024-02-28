import React from 'react'
import Question from './question'
import SimpleStepper from './simpleStepper'
import { useParams } from 'react-router-dom'
import { useGetsurveyCampaignQuery } from '../../features/surveyCampaign/surveyCampaignsSlice'
import { useSubmitCampaignMutation } from '../../features/surveyCampaign/userCampaignResponseSlice'
import { getCategoryWichHasQuestions } from './surveyformatter'
import { useGetResponsesQuery, useGetResponsesStatisticsQuery, useValidateResponsesMutation } from '../../features/response/responsesSlice'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline'
import { useTranslation } from 'react-i18next'
import UploadIcon from '@mui/icons-material/Upload'
import { sortByOrder } from './utils/orderQuestionCategories'

function SurveyTree(props) {
  const { t } = useTranslation()
  const { idCampaign, idUser } = useParams()
  let [survey, setSurvey] = React.useState()
  const [activeStep, SetActiveStep] = React.useState(0)
  const { data: surveyCampaign, isSuccess: isSuccessCampaign } = useGetsurveyCampaignQuery(idCampaign)
  const [categories, setCategories] = React.useState([])
  const { data: responses } = useGetResponsesQuery({ campaign: idCampaign, user: idUser })
  const { data: responsesStatistics } = useGetResponsesStatisticsQuery({ campaign: idCampaign, user: idUser })
  const [ ValidateResponses ] = useValidateResponsesMutation()
  const [ SubmitCampaign ] = useSubmitCampaignMutation()

  React.useEffect(() => {
    if (isSuccessCampaign && surveyCampaign) {
      setSurvey(survey = surveyCampaign.survey_tree)
      const categories = getCategoryWichHasQuestions(survey)
      console.log('')
      if (categories) {
        setCategories(categories)
      }
    }
  }, [isSuccessCampaign, surveyCampaign])

  const handleStep = (stp) => {
    SetActiveStep(stp)
  }

  const handleValidateResponses = async () => {
    await ValidateResponses({ campaign: idCampaign, user: idUser })
  }
  const handleSubmitResponse = async () => {
    await SubmitCampaign({ idCampaign, idUser })
  }
  if (categories.length === 0) {
    return undefined
  } else {
    return (
      <div className="sm:mx-auto mt-4 px-2 py-0.5">
        <div className='flex justify-center w-full bg-gary-400 gap-3'>
          <button className="flex justify-center items-center bg-teal-600 mx-2 px-2 py-0.5 rounded-md mb-1 text-gray-100 text-md font-medium float-right p-1"
            onClick={() => handleValidateResponses()} style={{ cursor: 'pointer' }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 18, fill: 'white' }} /> {t('survey.buttons.validate')}
          </button>
          <button className="flex justify-center items-center bg-teal-600 mx-2 px-2 py-0.5 rounded-md mb-1 text-gray-100 text-md font-medium float-right p-1"
            onClick={() => handleSubmitResponse()} style={{ cursor: 'pointer' }}>
            <UploadIcon sx={{ fontSize: 18, fill: 'white' }} /> {t('survey.buttons.submit_data')}
          </button>

        </div>
        <div className="lg:w-1/2 md:2/4 sm:4/5 mx-8  sm:mx-auto mt-4 px-2 py-0.5">
          <SimpleStepper step={activeStep} category={categories[activeStep]} steps={categories.length} changeStep={handleStep} />
          <div className="flex">
            <div className="w-full">
              <div className="bg-[#f5f4f0] w-full  justify-between rounded-md ">
                <h5 className="pt-2 pl-3 text-2xl">{categories[activeStep].category.text}</h5>
                <span className="p-2">{activeStep + 1}/{categories.length}</span>
              </div>
              <div className="flex flex-wrap w-full bg-[#f5f4f0] gap-1">
                {categories[activeStep].questions
                  ? <Question displayComments={false} showComments={props.showComments} commentUser={props.commentUser} disabled={false} responses={responses} surveyQuestions={sortByOrder(categories[activeStep]?.questions) || []} />
                  : undefined}
                <SimpleStepper step={activeStep} category={categories[activeStep]} steps={categories.length} changeStep={handleStep} />
              </div>
            </div>
          </div>
        </div>
      </div>

    )
  }
}
SurveyTree.propTypes = {

}
export default SurveyTree
