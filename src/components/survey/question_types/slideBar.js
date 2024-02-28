import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';
import BaseQuestion from '../baseQuestion';
import PropTypes from 'prop-types';

const SlideBar = ({ disabled, saveResponse, fullResponse, reponse, question, questionHelpText }) => {
  const [options, setOptions] = useState();
  const [marks, setMarks] = useState();
  const [value, setValue] = useState();
  const [step, setStep] = useState();
  const [reponseFinal, setReponseFinal] = useState();
  const [sliderColor, setSliderColor] = useState();
  const [questionDetails, setQuestionDetails] = useState();

  useEffect(() => {
    if (question?.question_uuid) {
      setQuestionDetails(question);
    }
  }, [question]);

  useEffect(() => {
    setOptions(question.option);
  }, [question]);

  useEffect(() => {
    if (reponse) {
      setReponseFinal(reponse);
    }
    if (options) {
      const long = options.length;
      setStep(100 / (long * 20));
      if (long >= 1) {
        const list = options.map((op, index) => {
          if (op) {
            const step = (100 - 10) / (long - 1);
            const mark = {
              value: 10 + (index * step),
              label: index + 1,
              text: op.text || ''
            };
            return mark;
          }
        });
        setMarks(list);
      }
    }
  }, [options, reponse]);

  const handleSliderChange = (e) => {
    const step = (100 - 10) / (options.length - 1);
    const ch = (e.target.value - 10 + step) / step;
    const Index = Number(ch.toFixed(4).slice(0, -2));
    const choiceIndex = Math.round(ch * 10) / 10;
    const pourcentage = Math.floor((Index - Math.floor(Index)) * 100);
    const clearIndex = Math.floor(Index);
    const option = options[clearIndex - 1]?.text || null;
    const nOption = options[clearIndex]?.text || null;
    setReponseFinal({ value: e.target.value, choiceIndex, option, nextOption: nOption, pourcentage, question: question.uuid });
  };

  const sendData = (state) => {
    const { value, choiceIndex, option, nextOption, pourcentage } = reponseFinal || '';

    const response = {
      question: question.uuid,
      state
    };
    saveResponse(response);
  };

  useEffect(() => {
    if (reponse.value) {
      setValue(reponse.value);
    }
  }, [reponse.value]);

  useEffect(() => {
    if (reponseFinal && reponseFinal.choiceIndex >= 1) {
      setSliderColor('#3096d1');
    } else {
      setSliderColor('#de6868');
    }
  }, [reponseFinal]);

  return (
    <BaseQuestion disabled={disabled} sendData={(state) => sendData(state)} questionHelpText={questionHelpText} reponse={fullResponse} question={question}>
      <div className="py-1">
        <h5 className="text-md">{question.text}</h5>
      </div>
      <div className='w-400 pl-16'>
        <Slider
          disabled={disabled}
          aria-label="Custom marks"
          value={reponseFinal?.value || 0}
          onChange={handleSliderChange}
          valueLabelFormat={reponseFinal?.choiceIndex || 0}
          step={step}
          marks={marks}
          sx={{ color: sliderColor, '& .MuiSlider-rail': { color: sliderColor } }}
          valueLabelDisplay="auto"
        />
        <div className='flex flex-col gap-1'>
          {marks &&
            marks.map((op, index) => op?.label !== 0 &&
              <div className='flex gap-2' key={index}>
                <span className='px-1 bg-gray-300 rounded-sm max-h-fit'>{op?.label || index + 1}</span>
                <p className='text-gray-800 text-md'>{op.text || undefined}</p>
              </div>
            )
          }
          <div />
        </div>
      </div>
    </BaseQuestion>
  );
};

SlideBar.propTypes = {
  text: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  responses: PropTypes.array,
  saveResponse: PropTypes.func,
  reponse: PropTypes.string,
  question: PropTypes.object.isRequired,
  questionHelpText: PropTypes.string,
  fullResponse: PropTypes.object
};

export default SlideBar;
