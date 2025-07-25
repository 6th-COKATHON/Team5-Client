import Logo from '@/assets/logo.svg?react';
import {useState} from 'react';
import TestButton from '../components/TestButton';
import {useNavigate} from 'react-router-dom';
import LoadingHeart from '@/assets/loading-heart.svg?react';
import Loading from '@/assets/loading.svg?react';

type Gender = 'female' | 'male';

const ChemistryPage = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>('female');
  const [selected, setSelected] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const toggleSelection = (idx: number) => {
    setSelected((prev) => {
      const isSelected = prev.includes(idx);
      if (isSelected) {
        return prev.filter((i) => i !== idx);
      } else {
        return [...prev, idx];
      }
    });
  };

  const handleClick = () => {
    if (selected.length !== 3) return;

    setIsLoading(true);

    // 결과 받아오는 API 요청 or 타이머
    setTimeout(() => {
      // 예: 결과 데이터를 받아왔다는 가정
      navigate('/chemistry/result');
    }, 3000); // 3초 후 결과 페이지로 이동
  };

  return (
    <div className='w-full flex flex-col items-center'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-centers gap-[50px] mt-[300px]'>
          <LoadingHeart />
          <Loading />
          <span className='text-xl font-semibold'>조금만 기다려주세요</span>
        </div>
      ) : (
        <>
          {' '}
          <Logo className='w-[157px]' />
          <h1 className='font-semibold text-[32px]'>베스트 케미 찾기</h1>
          <span className='text-xl text-black/60'>
            좋아하는 연예인 3명을 선택해 주세요!
          </span>
          {/* 탭 버튼 영역 */}
          <div className='flex relative z-10 mt-[30px]'>
            {/* 여자 탭 */}
            <button
              onClick={() => setSelectedGender('female')}
              className={`px-6 py-2 text-base font-semibold rounded-t-xl border transition-all
      ${
        selectedGender === 'female'
          ? 'text-primary-pink border-b-transparent bg-[#FCE5F0]'
          : 'text-pink-3 border-b border-x-0 border-t-0 bg-transparent'
      }`}>
              여자 연예인
            </button>

            {/* 남자 탭 */}
            <button
              onClick={() => setSelectedGender('male')}
              className={`px-6 py-2 text-base font-semibold rounded-t-xl border transition-all
      ${
        selectedGender === 'male'
          ? 'text-primary-pink border-b-transparent bg-[#FCE5F0]'
          : 'text-pink-3 border-x-0 border-t-0 bg-transparent'
      }`}>
              남자 연예인
            </button>
          </div>
          {/* 콘텐츠 박스 */}
          <div className='w-[540px] border border-primary-pink rounded-xl -mt-px p-[50px] z-0 bg-[#FCE5F0] relative'>
            <div className='grid grid-cols-3 gap-[20px] mb-[110px]'>
              {Array.from({length: 18}).map((_, idx) => {
                const isSelected = selected.includes(idx);
                const order = selected.indexOf(idx) + 1;

                return (
                  <div
                    key={idx}
                    className='relative flex flex-col items-center w-[140px] cursor-pointer'
                    onClick={() => toggleSelection(idx)}>
                    {/* 이미지 영역 */}
                    <div
                      className={`aspect-square w-full bg-white rounded-2xl transition-all duration-100
                    ${isSelected ? 'border-4 border-primary-pink' : ''}`}>
                      {/* 선택 순서 뱃지 */}
                      {isSelected && (
                        <div className='absolute -top-2 -right-2 w-[40px] h-[40px] rounded-full bg-white border-4 text-primary-pink text-xl font-bold flex items-center justify-center shadow-md'>
                          {order}
                        </div>
                      )}
                    </div>

                    {/* 이름 */}
                    <span className='mt-[10px] text-xl font-semibold text-black'>
                      연예인 이름
                    </span>
                  </div>
                );
              })}
            </div>

            {selected.length === 3 ? (
              <TestButton
                text='결과보기'
                variant='filled'
                onClick={handleClick}
              />
            ) : (
              <TestButton text='결과보기' variant='outlined' />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChemistryPage;
