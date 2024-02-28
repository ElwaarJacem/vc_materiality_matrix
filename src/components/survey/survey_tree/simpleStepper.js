import * as React from 'react'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import { useTranslation } from 'react-i18next'

export default function SimpleStepper ({ step, changeStep, steps }) {
  const { t } = useTranslation()
  const handleStep = (stp) => {
    changeStep(stp)
  }
  React.useEffect(() => {
    // Scroll to the top of the page when step changes
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [step])

  return (
    <div className="rounded-lg p-2 px-4 w-full ">
      <div className="flex justify-between w-full">
          {step !== 0
            ? <button className="bg-teal-600 mx-2 px-2 py-0.5 rounded-md mb-1 text-gray-100 text-md font-medium float-right p-1" onClick={() => handleStep(step - 1)} style={{ cursor: 'pointer' }}><ArrowBackIosIcon sx={{ fontSize: 18 }}/> {t('common.buttons.post')}</button>
            : <span ></span>
        }{step !== steps - 1
          ? <button className="bg-teal-600 mx-2 px-2 py-0.5 rounded-md mb-1 text-gray-100 text-md font-medium float-right p-1" onClick={() => handleStep(step + 1)} style={{ cursor: 'pointer' }}>{t('common.buttons.next')} <ArrowForwardIosIcon sx={{ fontSize: 18 }}/></button>
          : <span></span>
        }
          </div>
    </div>
  )
}
