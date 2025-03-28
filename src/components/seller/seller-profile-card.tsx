'use client';

import AvatarProfile from '../avatar-profile/avatar-profile';

import Image from 'next/image';

import { useGetProfile } from '@/services/member.hooks';
import { House } from 'lucide-react';

import Instagram from '@/assets/icons/instagram.webp';
import Youtube from '@/assets/icons/youtube.webp';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function SellerProfileCard({ userId }: { userId: string }) {
  const { data: memberData } = useGetProfile(userId);

  return (
    <Card className="p-4 shadow-lg">
      <div className="flex items-center gap-8">
        <AvatarProfile
          size="lg"
          className="shadow-xl"
          src={memberData?.profile.profileImagePath}
          fallback={memberData?.profile.nickname}
        />

        <div className="flex flex-col gap-1">
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
          <h3 className="text-xl font-semibold tracking-tight">{memberData?.profile.nickname}</h3>
          <p className="text-sm text-gray-700">{memberData?.profile.introduction}</p>
        </div>
      </div>
    </Card>
  );
}
