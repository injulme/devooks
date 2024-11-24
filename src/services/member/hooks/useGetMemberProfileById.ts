import { GET_member_profile_by_id } from '../api';

import { useQuery } from '@tanstack/react-query';

export const useGetMemberProfileById = (memberId: string) => {
  return useQuery({
    queryKey: [GET_member_profile_by_id.name, memberId],
    queryFn: () => GET_member_profile_by_id(memberId),
    select: (data) => data,
    enabled: !!memberId,
  });
};
