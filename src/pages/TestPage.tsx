import OptionItem from '../components/OptionItem';
import Logo from '@/assets/logo.svg?react';

const TestPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <Logo className='w-[157px]' />
      <div className='flex mb-[30px] flex-col w-[438px]'>
        <h1 className='font-semibold text-[32px]'>
          1. 데이트 할 때 나의 모습은?
        </h1>
        <span className='font-normal text-xl color text-black/60 '>
          가장 나와 가까운 모습을 골라주세요.
        </span>
      </div>
      <div className='flex flex-col gap-[30px]'>
        <OptionItem text='내가 주도해서 계획을 짜고 이끌어 가는 편' />
        <OptionItem text='상대의 리드에 잘 맞춰주는 편' />
        <OptionItem text='분위기를 살리고 웃음을 유도하는 편' />
        <OptionItem text='조용하지만 진심을 담아 챙기는 편' />
      </div>
    </div>
  );
};

export default TestPage;
