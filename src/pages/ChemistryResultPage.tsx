import BackgroundLayout from '@/assets/background_layout.svg?react';
import Logo from '@/assets/logo.svg?react';
import LoadingHeart from '@/assets/loading-heart.svg?react';
import Loading from '@/assets/loading.svg?react';
import TestButton from '../components/TestButton';
import {useEffect, useState} from 'react';
import {fetchChemistryResult} from '../api/fetchChemistryResult';
import {useLocation, useNavigate} from 'react-router-dom';

const ChemistryResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as {
    celebrityIds?: number[];
    personalityType?: string;
  } | null;

  const celebrityIds = state?.celebrityIds ?? [];
  const personalityType = state?.personalityType ?? 'A';

  const [resultData, setResultData] = useState<null | {
    allChemistryScores: {
      celebrityId: number;
      celebrityName: string;
      chemistryScore: number;
    }[];
    bestMatchCelebrityImageUrl: string;
    bestMatchCelebrityName: string;
    bestChemistryName: string;
    bestCompatibilityScore: number;
    detailedAnalysis: string;
    advice: string;
  }>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (celebrityIds.length === 0) {
      setError('분석할 연예인 정보가 없습니다.');
      return;
    }

    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchChemistryResult(celebrityIds, personalityType);
        setResultData(data);
      } catch (err) {
        console.error('Failed to load chemistry result:', err);
        setError('케미 분석 결과를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [celebrityIds, personalityType]);

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

  if (loading)
    return (
      <div className='flex flex-col justify-center items-center h-screen gap-10'>
        <LoadingHeart />
        <Loading />
        <span className='text-xl font-semibold'>조금만 기다려주세요...</span>
      </div>
    );

  if (error)
    return (
      <div className='flex justify-center items-center h-screen flex-col gap-4'>
        <span className='text-red-600 font-semibold'>{error}</span>
        <button
          onClick={() => navigate(-1)}
          className='px-4 py-2 bg-primary-pink text-white rounded'>
          뒤로 가기
        </button>
      </div>
    );

  if (!resultData) return null;

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
          <div className='relative z-10 pt-8 pb-[40px] px-20 flex flex-col items-center text-center gap-5'>
            {/* 프로필 */}
            <ContentBox className='relative '>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    우리 케미 1등 {/* 임의 표시, 수정 가능 */}
                  </span>
                </div>
              </div>
              {/* 이미지 url로 변경 */}
              <img
                src={resultData.bestMatchCelebrityImageUrl || undefined}
                alt={resultData.bestMatchCelebrityName}
                className='w-[120px] h-[120px] rounded-full object-cover mx-auto'
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/120x120?text=${encodeURIComponent(
                    resultData.bestMatchCelebrityName
                  )}`;
                }}
              />
              <div className='text-lg font-bold text-black mt-2'>
                {resultData.bestMatchCelebrityName}
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
                {resultData.bestChemistryName}
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
                {resultData.bestCompatibilityScore}점
              </div>
            </ContentBox>

            {/* 분석 */}
            <ContentBox className='relative pt-4 '>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    케미 분석
                  </span>
                </div>
              </div>
              <div style={{whiteSpace: 'pre-wrap'}}>
                {resultData.detailedAnalysis}
              </div>
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
              <div className='text-center'>{resultData.advice}</div>
            </ContentBox>

            {/* 데뷔조 (allChemistryScores 리스트로 간단 구현) */}
            <ContentBox className='relative pt-4'>
              <div className='absolute -top-[11px] left-1/2 transform -translate-x-1/2'>
                <div className='rounded-[50px] border border-dashed border-[#F4378A] bg-[radial-gradient(50%_50%_at_50%_50%,_#F4378A_0%,_#F772AD_100%)] px-3 py-1'>
                  <span className='text-white font-[Warhaven] text-[14px] font-bold'>
                    케미 점수 리스트
                  </span>
                </div>
              </div>
              <div className='flex flex-col gap-2'>
                {resultData.allChemistryScores.map((score) => (
                  <div
                    key={score.celebrityId}
                    className='flex justify-between border-b border-gray-300 py-1 px-4'>
                    <span>{score.celebrityName}</span>
                    <span>{score.chemistryScore}점</span>
                  </div>
                ))}
              </div>
            </ContentBox>
          </div>
        </div>

        {/* 버튼 */}
        <div className='w-[438px]'>
          <TestButton
            text='케미스토리 만들기'
            variant='filled'
            onClick={() =>
              navigate('/create', {
                state: {
                  personalityType,
                  celebrityName: resultData.bestMatchCelebrityName,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ChemistryResultPage;
