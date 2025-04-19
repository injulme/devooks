'use client';

import AvatarProfile from '../avatar-profile/avatar-profile';

import Image from 'next/image';

import { useGetProfile } from '@/services/member.hooks';
import { ExternalLink, House } from 'lucide-react';

import Instagram from '@/assets/icons/instagram.webp';
import Youtube from '@/assets/icons/youtube.webp';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

import { cn } from '@/lib/utils';

interface SellerProfileCardProps {
  userId: string;
  className?: string;
}

export default function SellerProfileCard({ userId, className }: SellerProfileCardProps) {
  const { data: memberData } = useGetProfile(userId);

  return (
    <div className={cn('overflow-hidden border-slate-200 shadow-md', className)}>
      <CardHeader className="pb-3">
        <h3 className="text-lg font-semibold text-slate-900">판매자 정보</h3>
      </CardHeader>

      <CardContent className="px-6 pb-2">
        <div className="flex items-center gap-4">
          <AvatarProfile
            size="lg"
            className="shadow-md"
            src={memberData?.profile.profileImagePath}
            fallback={memberData?.profile.nickname}
          />

          <div>
            <h4 className="text-base font-semibold text-slate-900">
              {memberData?.profile.nickname}
            </h4>
            <p className="mt-1 line-clamp-2 text-sm text-slate-600">
              {memberData?.profile.introduction}
            </p>
          </div>
        </div>

        <Separator className="my-4" />

        <div className="flex flex-wrap gap-2">
          {memberData?.profile.blogLink && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-8 rounded-full border-slate-200 bg-white text-xs shadow-sm hover:bg-slate-50"
            >
              <a href={memberData.profile.blogLink} target="_blank" rel="noopener noreferrer">
                <House className="mr-1 h-3.5 w-3.5 stroke-slate-500" />
                블로그
              </a>
            </Button>
          )}
          {memberData?.profile.instagramLink && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-8 rounded-full border-slate-200 bg-white text-xs shadow-sm hover:bg-slate-50"
            >
              <a href={memberData.profile.instagramLink} target="_blank" rel="noopener noreferrer">
                <Image src={Instagram} alt="instagram logo" className="mr-1 h-3.5 w-3.5" />
                인스타그램
              </a>
            </Button>
          )}
          {memberData?.profile.youtubeLink && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="h-8 rounded-full border-slate-200 bg-white text-xs shadow-sm hover:bg-slate-50"
            >
              <a href={memberData.profile.youtubeLink} target="_blank" rel="noopener noreferrer">
                <Image src={Youtube} alt="youtube logo" className="mr-1 h-3.5 w-3.5" />
                유튜브
              </a>
            </Button>
          )}
        </div>
      </CardContent>

      <CardFooter className="px-6 pb-5 pt-0">
        <Button asChild variant="outline" className="mt-3 w-full gap-1.5 text-xs">
          <a href={`/seller/${userId}`}>
            <ExternalLink className="h-3.5 w-3.5" />
            판매자 프로필 보기
          </a>
        </Button>
      </CardFooter>
    </div>
  );
}
