import OptionItem from '../components/OptionItem';
import Logo from '@/assets/logo.svg?react';
import TestButton from '../components/TestButton';
import {steps} from '../constant';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';
import {postPersonalityTest} from '../api/personality';

interface TestPageProps {
  step: number;
  onNext: () => void;
  onPrev: () => void;
}

const TestPage = ({step, onNext, onPrev}: TestPageProps) => {
  const navigate = useNavigate();
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const {title, description, question} = steps[step];

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  const handleNext = async () => {
    if (!selected) return;

    const updatedAnswers = [...answers];
    updatedAnswers[step] = selected;
    setAnswers(updatedAnswers);

    if (step === steps.length - 1) {
      try {
        // answers 배열 전체 보내기
        const response = await postPersonalityTest({answers: updatedAnswers});
        navigate('/result', {state: response.data.data});
      } catch (err) {
        console.error('성향 분석 실패:', err);
      }
    } else {
      onNext();
      setSelected(null);
    }
  };

  return (
    <div className='flex flex-col items-center gap-[30px]'>
      <Logo className='w-[157px]' />

      <div className='flex flex-col w-[438px]'>
        <h1 className='font-semibold text-[32px]'>{title}</h1>
        <span className='font-normal text-xl text-black/60'>{description}</span>
      </div>

      <div className='flex flex-col gap-[30px]'>
        {question.map((q, index) => (
          <OptionItem
            key={index}
            text={q.text}
            onClick={() => handleSelect(q.label)}
            isSelected={selected === q.label}
          />
        ))}
      </div>

      <div className='w-[438px] mt-[66px]'>
        {step === 0 ? (
          <TestButton text='다음 질문' variant='filled' onClick={handleNext} />
        ) : step < steps.length - 1 ? (
          <div className='flex flex-row gap-[35px]'>
            <TestButton text='이전' variant='outlined' onClick={onPrev} />
            <TestButton
              text='다음 질문'
              variant='filled'
              onClick={handleNext}
            />
          </div>
        ) : (
          <div className='flex flex-row gap-[35px]'>
            <TestButton text='이전' variant='outlined' onClick={onPrev} />
            <TestButton
              text='결과 보기'
              variant='filled'
              onClick={handleNext} // 마지막 질문 다음에 결과로 넘어감
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TestPage;
