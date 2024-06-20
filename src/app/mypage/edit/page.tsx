'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

export default function MyPageEdit() {
  return (
    <section>
      <div className="flex gap-16">
        <div className="flex flex-col items-center gap-6">
          <Avatar className="h-[200px] w-[200px] shadow-xl">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Button>프로필 변경</Button>
        </div>
        <div>
          <div>프로필 정보 / 계좌 정보 / 회원 탈퇴</div>

          <div>nicname</div>
          <Button>수정하기</Button>
        </div>
      </div>
    </section>
  );
}
