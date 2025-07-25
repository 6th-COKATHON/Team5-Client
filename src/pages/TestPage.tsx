import {useState} from 'react';
import OptionItem from '../components/OptionItem';
import Logo from '@/assets/logo.svg?react';
import TestButton from '../components/TestButton';
import {steps} from '../constant';

const TestPage = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const {title, description} = steps[currentStep];
  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className='flex flex-col items-center gap-[30px]'>
      <Logo className='w-[157px]' />
      <div className='flex flex-col w-[438px]'>
        <h1 className='font-semibold text-[32px]'>{title}</h1>
        <span className='font-normal text-xl color text-black/60 '>
          {description}
        </span>
      </div>
      <div className='flex flex-col gap-[30px]'>
        {step.question.map((q, index) => (
          <OptionItem key={index} text={q.text} />
        ))}
      </div>

      <div className='w-[438px] mt-[66px]'>
        {currentStep === 0 ? (
          // 첫 번째 페이지
          <TestButton text='다음 질문' variant='filled' onClick={handleNext} />
        ) : currentStep < steps.length - 1 ? (
          // 중간 페이지
          <div className='flex flex-row gap-[35px]'>
            <TestButton text='이전' variant='outlined' onClick={handlePrev} />
            <TestButton
              text='다음 질문'
              variant='filled'
              onClick={handleNext}
            />
          </div>
        ) : (
          // 마지막 페이지
          <div className='flex flex-row gap-[35px]'>
            <TestButton text='이전' variant='outlined' onClick={handlePrev} />
            <TestButton
              text='결과 보기'
              variant='filled'
              onClick={() => console.log('제출 클릭')}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
