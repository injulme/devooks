import api from '@/lib/api';

export async function getEbooks(): Promise<void> {
  await api({
    method: 'get',
    url: `/api/v1/ebooks?page=1&count=1`,
  });
}
