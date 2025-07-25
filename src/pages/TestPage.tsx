import OptionItem from '../components/OptionItem';
import Logo from '@/assets/logo.svg?react';
import TestButton from '../components/TestButton';
import {steps} from '../constant';

interface TestPageProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
}

const TestPage = ({step, onNext, onPrev}: TestPageProps) => {
  const {title, description, question} = steps[step];

  return (
    <div className='flex flex-col items-center gap-[30px]'>
      <Logo className='w-[157px]' />

      <div className='flex flex-col w-[438px]'>
        <h1 className='font-semibold text-[32px]'>{title}</h1>
        <span className='font-normal text-xl text-black/60'>{description}</span>
      </div>

      <div className='flex flex-col gap-[30px]'>
        {question.map((q, index) => (
          <OptionItem key={index} text={q.text} />
        ))}
      </div>

      <div className='w-[438px] mt-[66px]'>
        {step === 0 ? (
          <TestButton text='다음 질문' variant='filled' onClick={onNext} />
        ) : step < steps.length - 1 ? (
          <div className='flex flex-row gap-[35px]'>
            <TestButton text='이전' variant='outlined' onClick={onPrev} />
            <TestButton text='다음 질문' variant='filled' onClick={onNext} />
          </div>
        ) : (
          <div className='flex flex-row gap-[35px]'>
            <TestButton text='이전' variant='outlined' onClick={onPrev} />
            <TestButton
              text='결과 보기'
              variant='filled'
              onClick={onNext} // 마지막 질문 다음에 결과로 넘어감
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
