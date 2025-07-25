// api/fetchChemistryResult.ts
import axiosInstance from './instance';

export type ChemistryRequest = {
  celebrityIds: number[];
  personalityType: string;
};

export type ChemistryResponse = {
  isSuccess: boolean;
  status: number;
  data: {
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
  };
};

export const fetchChemistryResult = async (
  celebrityIds: number[],
  personalityType: string
): Promise<ChemistryResponse['data']> => {
  const response = await axiosInstance.post('/api/celebrity/match', {
    celebrityIds,
    personalityType,
  });
  return response.data.data;
};
