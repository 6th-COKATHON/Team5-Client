import Logo from '@/assets/logo.svg?react';
import OptionItem from '../components/OptionItem';
import TestButton from '../components/TestButton';
import {useState} from 'react';
const genres = [
  '로맨스',
  '스릴러',
  '코미디',
  '아포칼립스',
  '공포',
  '액션',
  '드라마',
  '미스터리',
];
const CreateChemistryPage = () => {
  const [username, setUsername] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };
  const handleSubmit = async () => {
    if (!username || selectedGenres.length === 0) {
      alert('이름과 장르를 모두 입력해주세요!');
      return;
    }

    // 실제 API 요청
  };
  return (
    <div className='flex flex-col items-center gap-[30px]'>
      <Logo className='w-[157px]' />
      <h1 className='text-[32px] font-semibold'>나만의 케미스트리 만들기</h1>

      <span className='text-xl text-black/60'>
        주인공의 이름을 설정해 주세요.
      </span>
      <div className='bg-transparent w-[438px] h-[60px] border-[1px] rounded-[50px] border-primary-pink flex items-center justify-center'>
        <input
          type='text'
          className='outline-none text-xl w-full text-center'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <span className='text-xl text-black/60 w-[245px] text-center'>
        스토리의 장르를 설정해 주세요. (*복수 선택 가능합니다)
      </span>

      <div className='flex flex-col gap-[20px] mb-[90px]'>
        {genres.map((genre) => (
          <OptionItem
            key={genre}
            text={genre}
            isSelected={selectedGenres.includes(genre)}
            onClick={() => toggleGenre(genre)}
          />
        ))}{' '}
        <TestButton text='시작하기' variant='filled' onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default CreateChemistryPage;
