import {useLocation, useNavigate} from 'react-router-dom';
import {useState} from 'react';
import Logo from '@/assets/logo.svg?react';
import TestButton from '../components/TestButton';
import ChevronLeft from '@/assets/chevron-left.svg?react';
import ChevronRight from '@/assets/chevron-right.svg?react';

type Chapter = {
  chapterNumber: number;
  content: string;
  characterCount: number;
};

const ChemistryStoryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    storyData?: {chapters: Chapter[]};
    username?: string;
  };

  const chapters = state?.storyData?.chapters ?? [];
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!state?.storyData) {
    return (
      <div className='flex flex-col items-center justify-center min-h-screen gap-4'>
        <p>스토리 데이터가 없습니다. 다시 시도해 주세요.</p>
        <TestButton text='뒤로가기' onClick={() => navigate(-1)} />
      </div>
    );
  }

  const goPrev = () => {
    setCurrentIndex((i) => (i > 0 ? i - 1 : i));
  };

  const goNext = () => {
    setCurrentIndex((i) => (i < chapters.length - 1 ? i + 1 : i));
  };

  const currentChapter = chapters[currentIndex];

  return (
    <div className='relative flex flex-col items-center gap-[20px] min-h-screen'>
      <Logo className='w-[157px]' />
      <h1 className='text-[32px] font-semibold z-20 mb-[10px]'>
        우리의 케미스트리
      </h1>

      <div
        className='relative z-20 w-[450px] h-[500px] p-8 rounded-lg shadow-lg border-primary-pink border-[10px] overflow-y-auto'
        style={{
          background:
            'linear-gradient(0deg, #FFF 0%, var(--pink4, #FFE4F0) 100%)',
        }}>
        <p className='mb-4 text-black/90 whitespace-pre-wrap leading-[50px]'>
          {currentChapter.content}
        </p>
        <p className='text-right text-sm text-black/40'>
          {currentChapter.chapterNumber} / {chapters.length}장
        </p>
      </div>

      <div className='flex items-center gap-12'>
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={`p-2 ${
            currentIndex === 0
              ? 'opacity-40 cursor-not-allowed'
              : 'cursor-pointer hover:text-primary-pink'
          }`}
          aria-label='이전 챕터'>
          <ChevronRight className='w-8 h-8' />
        </button>

        <span className='text-lg font-semibold'>
          {currentIndex + 1} / {chapters.length}
        </span>

        <button
          onClick={goNext}
          disabled={currentIndex === chapters.length - 1}
          className={`p-2 ${
            currentIndex === chapters.length - 1
              ? 'opacity-40 cursor-not-allowed'
              : 'cursor-pointer hover:text-primary-pink'
          }`}
          aria-label='다음 챕터'>
          <ChevronLeft className='w-8 h-8' />
        </button>
      </div>

      <div className='flex flex-row w-[470px] justify-between mb-[40px] z-20 gap-2'>
        <TestButton
          text='그만하기'
          variant='outlined'
          onClick={() => navigate('/')}
        />
        <TestButton
          text='케미스트리 다시 만들기'
          onClick={() => navigate('/chemistry')}
        />
      </div>
    </div>
  );
};

export default ChemistryStoryPage;
