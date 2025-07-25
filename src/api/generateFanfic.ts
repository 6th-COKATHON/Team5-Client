import axiosInstance from './instance';

interface GenerateFanficRequest {
  personalityType: string;
  celebrityName: string;
  protagonistName: string;
  genre: string;
  length: string;
}

interface FanficChapter {
  chapterNumber: number;
  content: string;
  characterCount: number;
}

interface GenerateFanficResponse {
  isSuccess: boolean;
  status: number;
  data: {
    chapters: FanficChapter[];
    fullContent: string;
    celebrityName: string;
    protagonistName: string;
    personalityType: string;
    genre: string[];
    totalCharacterCount: number;
  };
}

export async function generateFanfic(
  params: GenerateFanficRequest
): Promise<GenerateFanficResponse['data']> {
  const response = await axiosInstance.post<GenerateFanficResponse>(
    '/api/fanfic/generate',
    params
  );
  if (!response.data.isSuccess) {
    throw new Error('팬픽 생성 실패');
  }
  return response.data.data;
}
