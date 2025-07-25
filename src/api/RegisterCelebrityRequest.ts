import axiosInstance from './instance';

interface RegisterCelebrityRequest {
  name: string;
  gender: 'MAN' | 'WOMAN';
  url: string;
}

interface RegisterCelebrityResponse {
  isSuccess: boolean;
  status: number;
  data: {
    id: number;
    name: string;
    url: string;
  };
}

export const registerCelebrity = async (
  payload: RegisterCelebrityRequest
): Promise<RegisterCelebrityResponse['data']> => {
  const response = await axiosInstance.post<RegisterCelebrityResponse>(
    '/api/celebrity',
    payload
  );
  return response.data.data;
};
