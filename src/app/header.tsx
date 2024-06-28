'use client';

import Image from 'next/image';
import Link from 'next/link';

import { visibleLoginState } from '@/states';
import { useSetRecoilState } from 'recoil';

import Logo from '@/assets/images/devooks_logo.png';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Header() {
  const setVisibleLogin = useSetRecoilState(visibleLoginState);
  return (
    <header className="flex h-[56px] w-full items-center justify-between gap-6">
      <Link href={'/'}>
        <Image src={Logo} alt="devooks 로고" height={40} />
      </Link>
      <Button onClick={() => setVisibleLogin(true)}>로그인</Button>
    </header>
  );
}
