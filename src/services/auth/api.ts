import './type';
import { EmailRequest } from './type';

import api from '@/lib/api';

/** 이메일 확인 */
export async function POST_check_email({ email }: EmailRequest): Promise<void> {
  return await api.post('/api/v1/auth/check/email', {
    email,
  });
}
