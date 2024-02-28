import React from 'react'
import InfoIcon from '@mui/icons-material/Info'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'
import IndexAlert from '../../components/alerts/indexAlert'
import { useTranslation } from 'react-i18next'

function BaseQuestion(props) {
    const { idCampaign, idUser } = useParams()
    const { t } = useTranslation()
    const [showHelp, setShowHelp] = React.useState(false)
    const [reponse, setReponse] = React.useState(props.reponse)
    const handleHelpText = () => {
        setShowHelp(!showHelp)
    }
    React.useEffect(() => {
        setReponse(props.reponse)
    }, [props.reponse])

    return (
        <div className="bg-white rounded-lg p-2  flex flex-col " style={{ border: '1px solid #ededed' }}>
            <div className='flex justify-between'>
                <div className='flex flex-col w-full'>
                    <div>
                        {props.children}
                    </div>
                    <div className='m-3'>
                        {showHelp && props.questionHelpText
                            ? <div className='pt-1 mt-1'><IndexAlert type="info" text={props.questionHelpText} /> </div>
                            : undefined}
                    </div>
                </div>
                <div className='flex flex-col items-end  justify-end min-w-fit'>
                    <div className='flex'>
                        {props.questionHelpText &&
                            <div>
                                <InfoIcon style={{ cursor: 'pointer', fill: '#228FCD' }} onClick={() => handleHelpText()} />
                            </div>
                        }
                    </div>
                </div>

            </div>

        </div>
    )
}
BaseQuestion.propTypes = {
    children: PropTypes.node,
    question: PropTypes.object,
    disabled: PropTypes.bool,
    questionHelpText: PropTypes.string,
    reponse: PropTypes.object,
    sendData: PropTypes.func
}

export default BaseQuestion

