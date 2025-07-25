import OnboardingLogo from '@/assets/onboarding-logo.svg?react';
import OnboardingFrame from '@/assets/onboarding-frame.svg?react';
import TestButton from '../components/TestButton';
import {useNavigate} from 'react-router-dom';
const IntroPage = () => {
  const navigate = useNavigate();
  return (
    <div className='relative min-h-screen w-full'>
      {/* 배경 프레임 */}
      <OnboardingFrame
        className='absolute inset-0 w-full h-full z-0'
        style={{width: '100%', height: '100%'}}
        preserveAspectRatio='none'
      />

      {/* 내용 */}
      <div className='relative z-10 flex flex-col justify-center items-center min-h-screen gap-6 px-6 text-center'>
        <OnboardingLogo />
        <div className='text-white text-2xl font-semibold leading-relaxed mt-[400px]'>
          <div className='font-[Warhaven] '>당신의 선택으로 이어지는,</div>
          <div>단 하나의 스토리</div>
        </div>
        <TestButton text='시작하기' onClick={() => navigate('/test')} />
      </div>
    </div>
  );
};

export default IntroPage;
