// utils/api/fetchCelebrities.ts
import axiosInstance from './instance';

export type Gender = 'female' | 'male';

export type Celebrity = {
  id: number;
  name: string;
  url: string;
};

export interface FetchCelebritiesResponse {
  celebrities: Celebrity[];
  currentPage: number;
  totalPages: number;
  totalElements: number;
}

export const fetchCelebrities = async (
  gender: Gender,
  page = 0,
  size = 18,
  sort = 'id'
): Promise<FetchCelebritiesResponse> => {
  const response = await axiosInstance.get('/api/celebrity', {
    params: {
      gender: gender === 'female' ? 'WOMAN' : 'MAN',
      page,
      size,
      sort,
    },
  });

  return response.data.data;
};
