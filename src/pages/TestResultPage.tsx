import BackGroundImage from '@/assets/background_image.svg?react';
import ResultBox from '@/assets/ResultBox.svg?react';
import Logo from '@/assets/logo.svg?react';
import TestButton from '../components/TestButton';

const TestResultPage = () => {
  return (
    <div className='relative w-[540px] flex flex-col items-center overflow-hidden'>
      {/* 전체 배경 하트 이미지 */}
      <BackGroundImage className='absolute top-0 left-1/2 -translate-x-1/2 h-full opacity-30 pointer-events-none z-0' />

      <div className='mt-10 z-10'>
        <Logo className='w-[157px]' />
      </div>
      <div className='flex flex-col gap-[30px]'>
        <h1 className='text-[32px] leading-[130%] font-semibold text-center text-white'>
          성향 테스트 결과
        </h1>

        <div className='relative w-[438px] z-10'>
          <ResultBox className='w-full' />

          <div className='absolute top-1/2 left-1/2 w-full transform -translate-x-1/2 -translate-y-1/2 text-center'>
            <h2 className='className=text-white text-center text-[28px] font-bold leading-[130%]'>
              믿고 따를 수 있는 리더형
            </h2>
          </div>
        </div>

        <div className='px-[45px] py-[67px] z-10 rounded-[30px] border border-dashed border-[#F4378A] bg-[rgba(252,201,224,0.84)]'>
          <p className='text-base leading-relaxed text-gray-800'>
            당신은 계획적이고 주도적인 성향의 소유자! <br />
            연애에서도 이끌어가는 걸 선호하고, <br />
            분명하고 확실한 표현을 좋아해요. <br />
            안정적이고 듬직한 케미를 원하는 타입입니다.
          </p>
        </div>

        <div className='flex flex-col gap-[11px]'>
          <TestButton text='테스트 다시하기' variant='outlined' />
          <TestButton text='베스트 케미 찾기' variant='filled' />
        </div>
      </div>
    </div>
  );
};

export default TestResultPage;
