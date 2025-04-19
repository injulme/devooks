'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useGetProfile } from '@/services/member.hooks';
import { BookOpen, Edit, House } from 'lucide-react';

import Instagram from '@/assets/icons/instagram.webp';
import Youtube from '@/assets/icons/youtube.webp';

import AvatarProfile from '@/components/avatar-profile/avatar-profile';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

import { useCategoryStore } from '@/stores/global-store';

export default function UserInfo({ userId }: { userId: string }) {
  const categories = useCategoryStore((state) => state.categories);
  const { data: memberData } = useGetProfile(userId);

  const relatedCategories = categories.filter((category) =>
    memberData?.profile.favoriteCategoryIdList?.includes(category.value),
  );
  const categoryLabels = relatedCategories.map((category) => category.label);

  return (
    <div className="rounded-b-xl bg-gradient-to-r from-slate-700 to-slate-800 p-8 text-white shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex gap-6">
          <div className="relative">
            <AvatarProfile
              size="xl"
              className="border-4 border-white shadow-xl ring-2 ring-slate-400"
              src={memberData?.profile.profileImagePath}
              fallback={memberData?.profile.nickname}
            />
            <div className="absolute bottom-0 right-0 rounded-full bg-blue-100 p-1 text-slate-700 shadow-md">
              <BookOpen className="h-5 w-5" />
            </div>
          </div>

          <div className="flex flex-col justify-between py-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-2xl font-bold tracking-tight">
                  {memberData?.profile.nickname || '익명의 독자'}
                </h3>
                <span className="rounded-full bg-slate-600 px-2 py-1 text-xs opacity-90">리더</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                {categoryLabels.map((label, index) => (
                  <Badge key={index} className="bg-indigo-100 text-slate-700 hover:bg-indigo-200">
                    {label}
                  </Badge>
                ))}
              </div>
            </div>

            <p className="mt-4 text-sm text-slate-300">
              {memberData?.profile.introduction || '자기소개를 입력해주세요.'}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-end gap-4">
          <div className="flex items-center gap-2">
            {memberData?.profile.blogLink && (
              <Button
                className="rounded-full bg-slate-600 hover:bg-slate-500"
                size="icon"
                variant="ghost"
              >
                <House className="stroke-slate-200" />
              </Button>
            )}
            {memberData?.profile.instagramLink && (
              <Button
                className="rounded-full bg-slate-600 hover:bg-slate-500"
                size="icon"
                variant="ghost"
              >
                <Image src={Instagram} alt="instagram logo" className="h-6 w-6" />
              </Button>
            )}
            {memberData?.profile.youtubeLink && (
              <Button
                className="rounded-full bg-slate-600 hover:bg-slate-500"
                size="icon"
                variant="ghost"
              >
                <Image src={Youtube} alt="youtube logo" className="h-6 w-6" />
              </Button>
            )}
          </div>

          <Link href={'/mypage/edit'}>
            <Button
              size="sm"
              className="border border-slate-600 bg-slate-700 text-white hover:bg-slate-600"
            >
              <Edit className="mr-2 h-4 w-4" /> 프로필 수정
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
