import Logo from '@/assets/logo.svg?react';
import {useEffect, useState} from 'react';
import TestButton from '../components/TestButton';
import {useNavigate} from 'react-router-dom';
import LoadingHeart from '@/assets/loading-heart.svg?react';
import Loading from '@/assets/loading.svg?react';
import axios from 'axios';

type Gender = 'female' | 'male';

type Celebrity = {
  id: number;
  name: string;
  imageUrl: string;
};

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

  const handleClick = () => {
    if (selected.length !== 3) return;

    setIsLoading(true);

    setTimeout(() => {
      navigate('/chemistry/result');
    }, 3000);
  };

  const fetchCelebrities = async () => {
    setIsApiLoading(true);
    setApiError(null);

    try {
      // API 엔드포인트 확인 및 절대 URL 사용
      const baseURL =
        process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

      const response = await axios.get(`${baseURL}/api/celebrity`, {
        params: {
          gender: selectedGender === 'female' ? 'WOMAN' : 'MAN',
          'pageable.page': 0,
          'pageable.size': 18,
          'pageable.sort': 'id',
        },
        timeout: 10000, // 10초 타임아웃
        headers: {
          'Content-Type': 'application/json',
        },
      });

      setCelebrities(response.data.content || []);
      console.log('연예인 데이터 로드 성공:', response.data);
    } catch (error) {
      console.error('연예인 불러오기 실패:', error);

      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          setApiError('서버 응답 시간이 초과되었습니다.');
        } else if (error.response) {
          setApiError(
            `서버 오류: ${error.response.status} ${error.response.statusText}`
          );
        } else if (error.request) {
          setApiError(
            '서버에 연결할 수 없습니다. 네트워크 연결을 확인해주세요.'
          );
        } else {
          setApiError('요청 처리 중 오류가 발생했습니다.');
        }
      } else {
        setApiError('알 수 없는 오류가 발생했습니다.');
      }

      // 개발 환경에서 더미 데이터 제공
      if (process.env.NODE_ENV === 'development') {
        console.log('개발 환경: 더미 데이터 사용');
        const dummyData = generateDummyData(selectedGender);
        setCelebrities(dummyData);
        setApiError(null);
      }
    } finally {
      setIsApiLoading(false);
    }
  };

  // 개발용 더미 데이터 생성 함수
  const generateDummyData = (gender: Gender): Celebrity[] => {
    const femaleNames = [
      '아이유',
      '태연',
      '지수',
      '제니',
      '로제',
      '리사',
      '윈터',
      '카리나',
      '안유진',
      '장원영',
      '미연',
      '소연',
      '유리',
      '수지',
      '크리스탈',
      '설현',
      '조이',
      '예리',
    ];
    const maleNames = [
      '뷔',
      '지민',
      '정국',
      '진',
      'RM',
      '슈가',
      '제이홉',
      '차은우',
      '박서준',
      '박보검',
      '이종석',
      '송중기',
      '공유',
      '현빈',
      '이민호',
      '박해진',
      '남주혁',
      '우도환',
    ];

    const names = gender === 'female' ? femaleNames : maleNames;

    return names.map((name, index) => ({
      id: index + 1,
      name,
      imageUrl: `https://via.placeholder.com/140x140/FFB6C1/000000?text=${encodeURIComponent(name)}`,
    }));
  };

  useEffect(() => {
    fetchCelebrities();
    setSelected([]); // 성별 탭 전환 시 선택 초기화
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

          {/* API 에러 표시 */}
          {apiError && (
            <div className='mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg max-w-md text-center'>
              <p className='font-semibold'>API 연결 오류</p>
              <p className='text-sm'>{apiError}</p>
              <button
                onClick={fetchCelebrities}
                className='mt-2 px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-sm'>
                다시 시도
              </button>
            </div>
          )}

          {/* 탭 버튼 영역 */}
          <div className='flex relative z-10 mt-[30px]'>
            <button
              onClick={() => setSelectedGender('female')}
              disabled={isApiLoading}
              className={`px-6 py-2 text-base font-semibold rounded-t-xl border transition-all
              ${
                selectedGender === 'female'
                  ? 'text-primary-pink border-b-transparent bg-[#FCE5F0]'
                  : 'text-pink-3 border-b border-x-0 border-t-0 bg-transparent'
              } ${isApiLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              여자 연예인
            </button>
            <button
              onClick={() => setSelectedGender('male')}
              disabled={isApiLoading}
              className={`px-6 py-2 text-base font-semibold rounded-t-xl border transition-all
              ${
                selectedGender === 'male'
                  ? 'text-primary-pink border-b-transparent bg-[#FCE5F0]'
                  : 'text-pink-3 border-b border-x-0 border-t-0 bg-transparent'
              } ${isApiLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
              남자 연예인
            </button>
          </div>

          {/* 콘텐츠 박스 */}
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
                            src={celebrity.imageUrl}
                            alt={celebrity.name}
                            className='w-full h-full object-cover'
                            onError={(e) => {
                              // 이미지 로드 실패 시 플레이스홀더로 대체
                              const target = e.target as HTMLImageElement;
                              target.src = `https://via.placeholder.com/140x140/FFB6C1/000000?text=${encodeURIComponent(celebrity.name)}`;
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
                      onClick={fetchCelebrities}
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
