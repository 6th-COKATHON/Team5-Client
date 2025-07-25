import Logo from '@/assets/logo.svg?react';
import {useEffect, useState} from 'react';
import TestButton from '../components/TestButton';
import {useNavigate} from 'react-router-dom';
import LoadingHeart from '@/assets/loading-heart.svg?react';
import Loading from '@/assets/loading.svg?react';
import {
  fetchCelebrities,
  type Celebrity,
  type Gender,
} from '../api/fetchCelebrities';
import {registerCelebrity} from '../api/RegisterCelebrityRequest';

const ChemistryPage = () => {
  const [selectedGender, setSelectedGender] = useState<Gender>('female');
  const [selected, setSelected] = useState<number[]>([]);
  const [celebrities, setCelebrities] = useState<Celebrity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isApiLoading, setIsApiLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const navigate = useNavigate();

  const toggleSelection = (id: number) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleClick = async () => {
    if (selected.length !== 3) return;

    setIsLoading(true);

    try {
      // 1. 선택된 연예인 객체만 필터링
      const selectedCelebs = celebrities.filter((c) => selected.includes(c.id));

      // 2. 선택 연예인 3명 서버에 등록 (병렬 처리)
      const registerPromises = selectedCelebs.map((celeb) =>
        registerCelebrity({
          name: celeb.name,
          gender: selectedGender === 'female' ? 'WOMAN' : 'MAN',
          url: celeb.url,
        })
      );

      const registeredCelebs = await Promise.all(registerPromises);

      // 3. 등록된 연예인 ID만 추출
      const registeredIds = registeredCelebs.map((r) => r.id);

      // 4. 결과 페이지로 이동하며 등록된 연예인 ID를 state로 넘김
      navigate('/chemistry/result', {state: {celebrityIds: registeredIds}});
    } catch (error) {
      console.error('연예인 등록 실패:', error);
      alert('연예인 등록 중 오류가 발생했습니다. 다시 시도해주세요.');
      setIsLoading(false);
    }
  };

  const loadCelebrities = async () => {
    setIsApiLoading(true);
    setApiError(null);

    try {
      const data = await fetchCelebrities(selectedGender, 0, 18, 'id');
      setCelebrities(data.celebrities);
    } catch (error) {
      setApiError(
        '연예인 목록을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.'
      );
      console.error(error);
    } finally {
      setIsApiLoading(false);
    }
  };

  useEffect(() => {
    loadCelebrities();
    setSelected([]);
  }, [selectedGender]);

  return (
    <div className='w-full flex flex-col items-center'>
      {isLoading ? (
        <div className='flex flex-col items-center justify-center gap-[50px] mt-[300px]'>
          <LoadingHeart />
          <Loading />
          <span className='text-xl font-semibold'>조금만 기다려주세요</span>
        </div>
      ) : (
        <>
          <Logo className='w-[157px]' />
          <h1 className='font-semibold text-[32px]'>베스트 케미 찾기</h1>
          <span className='text-xl text-black/60'>
            좋아하는 연예인 3명을 선택해 주세요!
          </span>

          {apiError && (
            <div className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md text-center'>
              <p className='font-semibold'>API 연결 오류</p>
              <p className='text-sm'>{apiError}</p>
              <button
                onClick={loadCelebrities}
                className='mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'>
                다시 시도
              </button>
            </div>
          )}

          <div className='flex relative z-10 mt-[30px]'>
            <button
              onClick={() => setSelectedGender('female')}
              disabled={isApiLoading}
              className={`px-6 py-2 text-base font-semibold rounded-t-xl border transition-all ${
                selectedGender === 'female'
                  ? 'text-primary-pink border-b-transparent bg-[#FCE5F0]'
                  : 'text-pink-3 border-b border-x-0 border-t-0 bg-transparent'
              } ${isApiLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              여자 연예인
            </button>
            <button
              onClick={() => setSelectedGender('male')}
              disabled={isApiLoading}
              className={`px-6 py-2 text-base font-semibold rounded-t-xl border transition-all ${
                selectedGender === 'male'
                  ? 'text-primary-pink border-b-transparent bg-[#FCE5F0]'
                  : 'text-pink-3 border-b border-x-0 border-t-0 bg-transparent'
              } ${isApiLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              남자 연예인
            </button>
          </div>

          <div className='w-[540px] border border-primary-pink rounded-xl -mt-px p-[50px] z-0 bg-[#FCE5F0] relative'>
            {isApiLoading ? (
              <div className='flex flex-col items-center justify-center py-20'>
                <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-primary-pink'></div>
                <p className='mt-4 text-gray-600'>
                  연예인 목록을 불러오는 중...
                </p>
              </div>
            ) : (
              <>
                <div className='grid grid-cols-3 gap-[20px] mb-[110px]'>
                  {celebrities.map((celebrity) => {
                    const isSelected = selected.includes(celebrity.id);
                    const order = selected.indexOf(celebrity.id) + 1;

                    return (
                      <div
                        key={celebrity.id}
                        className='relative flex flex-col items-center w-[140px] cursor-pointer'
                        onClick={() => toggleSelection(celebrity.id)}>
                        <div
                          className={`aspect-square w-full rounded-2xl overflow-hidden transition-all duration-100 ${
                            isSelected
                              ? 'border-4 border-primary-pink'
                              : 'bg-white'
                          }`}>
                          <img
                            src={celebrity.url}
                            alt={celebrity.name}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/140x140/FFB6C1/000000?text=${encodeURIComponent(
                                celebrity.name
                              )}`;
                            }}
                          />
                          {isSelected && (
                            <div className='absolute -top-2 -right-2 w-[40px] h-[40px] rounded-full bg-white border-4 text-primary-pink text-xl font-bold flex items-center justify-center shadow-md'>
                              {order}
                            </div>
                          )}
                        </div>
                        <span className='mt-[10px] text-xl font-semibold text-black'>
                          {celebrity.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {celebrities.length === 0 && !isApiLoading && (
                  <div className='text-center py-20 text-gray-600'>
                    <p>연예인 데이터를 불러올 수 없습니다.</p>
                    <button
                      onClick={loadCelebrities}
                      className='mt-4 px-6 py-2 bg-primary-pink text-white rounded-lg hover:bg-primary-pink/80'>
                      다시 시도
                    </button>
                  </div>
                )}

                {selected.length === 3 ? (
                  <TestButton
                    text='결과보기'
                    variant='filled'
                    onClick={handleClick}
                  />
                ) : (
                  <TestButton text='결과보기' variant='outlined' />
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ChemistryPage;
