import {useMutation} from '@tanstack/react-query';
import {postPersonalityTest} from '../api/personality';

export const usePersonalityTest = () => {
  return useMutation({
    mutationFn: postPersonalityTest,
  });
};
