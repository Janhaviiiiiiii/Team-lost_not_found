
import { useQuery } from '@tanstack/react-query';
import { UserData } from '@/types/user-data';

export const useUserData = () => {
  return useQuery({
    queryKey: ['userData'],
    queryFn: async (): Promise<UserData> => {
      const response = await fetch('/user_data.json');
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      return response.json();
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
