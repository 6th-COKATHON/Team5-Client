import BackgroundLayout from '@/assets/background_layout.svg?react';
import Logo from '@/assets/logo.svg?react';
import ProfileImageLayout from '@/assets/profile_image_layout.svg?react';
import TestButton from '../components/TestButton';

const ChemistryResultPage = () => {
  const resultData = {
    rank: 1,
    partnerName: '지민',
    chemistryType: '티키타카 공감즈',
    score: 92,
    maxScore: 100,
    analysis: [
      '당신은 이끌고, 지민은 부드럽게 맞춰줍니다.',
      '빠르게 분위기를 읽고 배려하는 지민은',
      '당신의 솔직한 표현을 자연스럽게 받아들이고 존중해줘요.',
      '말하지 않아도 통하는 순간이 많고, 감정선이 비슷해',
      '안정적인 연결이 가능한 조합이에요.',
    ],
    tips: [
      '✔️ 너무 앞서 나가기보단, 상대의 페이스도 존중해 주세요.',
      '✔️ 대화를 자주 나누고, 감정 표현을 격려해 주세요.',
      '✔️ 진지한 얘기 뒤엔 소소한 농담으로 분위기를 풀어주는 것도 좋아요.',
    ],
    rankings: [
      {name: '뷔', score: 75, rank: 2},
      {name: '진', score: 60, rank: 3},
    ],
  };

  const ContentBox = ({
    children,
    className = '',
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div
      className={`bg-white/80 pt-8 pb-4 rounded-md text-sm text-black leading-relaxed w-full ${className}`}>
      {children}
    </div>
  );

  return (
    <div className='flex justify-center'>
      <div className='relative w-[540px] flex flex-col items-center px-4 py-10 overflow-hidden'>
        {/* 로고 */}
        <Logo className='w-[157px] z-10' />

        {/* 제목 */}
        <h1 className='text-[32px] font-bold text-black z-10 text-center mb-[28px] font-[Warhaven]'>
          케미 분석 결과 리포트
        </h1>

        {/* 박스 배경 + 콘텐츠 */}
        <div className='relative w-[540px] mb-[30px]'>
          {/* 배경 이미지 */}
          <BackgroundLayout className='absolute top-0 left-0 w-full h-full z-0' />

          {/* 콘텐츠 */}
          <div className='relative z-10 px-6 pt-8 pb-[40px] px-20 flex flex-col items-center text-center gap-5'>
            {/* 프로필 */}
            <ContentBox className='relative '>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    우리 케미 {resultData.rank}등
                  </span>
                </div>
              </div>
              <ProfileImageLayout className='w-[120px] h-[120px] mx-auto' />
              <div className='text-lg font-bold text-black mt-2'>
                {resultData.partnerName}
              </div>
            </ContentBox>

            {/* 케미명 */}
            <ContentBox className='relative pt-4'>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    우리 케미명
                  </span>
                </div>
              </div>
              <div className='text-sm font-semibold text-black'>
                {resultData.chemistryType}
              </div>
            </ContentBox>

            {/* 점수 */}
            <ContentBox className='relative pt-4'>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    케미 점수
                  </span>
                </div>
              </div>
              <div className='text-base font-bold text-black'>
                {resultData.score}점 / {resultData.maxScore}점
              </div>
            </ContentBox>

            {/* 분석 */}
            <ContentBox className='relative pt-4'>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    케미 분석
                  </span>
                </div>
              </div>
              {resultData.analysis.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </ContentBox>

            {/* 팁 */}
            <ContentBox className='relative pt-4'>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    더 깊은 관계로 발전하려면?
                  </span>
                </div>
              </div>
              <div className='text-center'>
                {resultData.tips.map((tip, index) => (
                  <div key={index}>{tip}</div>
                ))}
              </div>
            </ContentBox>

            {/* 데뷔조 */}
            <ContentBox className='relative pt-4'>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    케미 데뷔조
                  </span>
                </div>
              </div>
              <div className='flex justify-center gap-6'>
                {resultData.rankings.map((person, index) => (
                  <div key={index} className='flex flex-col items-center'>
                    <ProfileImageLayout className='w-[60px] h-[60px]' />
                    <span className='text-xs mt-1'>
                      {person.rank}등: {person.name} ({person.score}점)
                    </span>
                  </div>
                ))}
              </div>
            </ContentBox>
          </div>
        </div>

        {/* 버튼 */}
        <div className='w-[438px]'>
          <TestButton text='케미스토리 만들기' variant='filled' />
        </div>
      </div>
    </div>
  );
};

export default ChemistryResultPage;
