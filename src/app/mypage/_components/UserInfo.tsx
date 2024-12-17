'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useGetMemberProfileById } from '@/services/member/hooks/useGetMemberProfileById';
import { House } from 'lucide-react';

import Instagram from '@/assets/icons/instagram.webp';
import Youtube from '@/assets/icons/youtube.webp';

import AvatarProfile from '@/components/avatar-profile/avatar-profile';
import { Button } from '@/components/ui/button';

import { useCategoryStore } from '@/stores/global-store';

export default function UserInfo({ userId }: { userId: string }) {
  const categories = useCategoryStore((state) => state.categories);
  const { data: memberData } = useGetMemberProfileById(userId);

  const relatedCategories = categories.filter((category) =>
    memberData?.profile.favoriteCategoryIdList?.includes(category.value),
  );
  const categoryLabels = relatedCategories.map((category) => `#${category.label}`).join(' ');

  return (
    <div className="flex justify-between bg-slate-300 px-10 py-12">
      <div className="flex gap-8">
        <AvatarProfile
          size="xl"
          className="shadow-xl"
          src={memberData?.profile.profileImagePath}
          fallback={memberData?.profile.nickname}
        />

        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight">
              {memberData?.profile.nickname}
            </h3>
            <p className="text-xs text-zinc-500">{categoryLabels}</p>
          </div>

          <p className="text-sm text-gray-700">
            {memberData?.profile.introduction || '자기소개를 입력해주세요.'}
          </p>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <div className="flex items-center gap-2">
          {memberData?.profile.blogLink && (
            <Button className="rounded-full bg-white shadow-lg" size="icon" variant="ghost">
              <House className="stroke-slate-500" />
            </Button>
          )}
          {memberData?.profile.instagramLink && (
            <Button className="rounded-full bg-white shadow-lg" size="icon" variant="ghost">
              <Image src={Instagram} alt="instagram logo" className="h-6 w-6" />
            </Button>
          )}
          {memberData?.profile.youtubeLink && (
            <Button className="rounded-full bg-white shadow-lg" size="icon" variant="ghost">
              <Image src={Youtube} alt="youtube logo" className="h-6 w-6" />
            </Button>
          )}
        </div>
        <Link href={'/mypage/edit'}>
          <Button size="sm" variant="secondary">
            프로필 수정
          </Button>
        </Link>
      </div>
    </div>
  );
}
