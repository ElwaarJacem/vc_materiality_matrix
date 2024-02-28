import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PropTypes from 'prop-types'
import { selectCurrentUser } from '../../features/auth/authSlice'
import { useSelector } from 'react-redux'

function DynamicNavBar ({ option, options }) {
  const { t } = useTranslation()
  const user = useSelector(selectCurrentUser)
  const navigate = useNavigate()
  return (
    <div className="h-full w-full mt-2 z-0 bg-white" style={{ borderBottom: '2px solid #EBEBEB' }}>
      <nav className="grid h-full items-bottom pl-4 ">
        <ul className="flex max-w-fit gap-4 py-0 h-full ">

          {options.map((op, index) => {
            const text = op.text
            if (op.userTypes.includes(user.type)) {
              return (
            <li
            key={index}
            className={
              option === text
                ? 'flex pt-1 h-full align-bottom text-black font-nano gap-1 px-1 border-b-2 border-[#086e7c] w-max-fit'
                : 'flex pt-1 h-full align-bottom text-black font-nano gap-1 px-1 w-max-fit'
            }
            onClick={() => navigate(op.url)}
            style={{ cursor: 'pointer' }}>
            <h5 className="block  text-md md:text-lg font-medium text-gray-800">{t(text)}</h5>
          </li>
              )
            }
          })}
        </ul>
      </nav>

    </div>
  )
}
DynamicNavBar.propTypes = {
  options: PropTypes.array.isRequired,
  option: PropTypes.string.isRequired
}
export default DynamicNavBar
