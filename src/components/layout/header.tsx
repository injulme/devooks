'use client';

import LoginDialog from './components/LoginDialog';
import RegisterDialog from './components/RegisterDialog';

import Image from 'next/image';
import Link from 'next/link';

import { OauthType } from '@/services/login/type';

import Logo from '@/assets/images/devooks_logo.png';

import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

type LoginLinkParams = Record<OauthType, string>;

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow dark:bg-background">
      <div className="mx-auto flex max-w-screen-xl flex-col justify-center gap-4 px-12 py-3">
        <div className="flex items-center justify-between gap-2">
          <Link href="/">
            <Image src={Logo} alt="devooks 로고" height={32} />
          </Link>
          <div className="flex items-center gap-2">
            <Button variant="outline">
              <Link href="/book/add">책 등록</Link>
            </Button>

            <LoginDialog />
            <RegisterDialog />
            <ThemeToggle />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div>categories</div>
          <Input placeholder="검색어를 입력해주세요." className="w-[240px] bg-gray-200" />
        </div>
      </div>
    </header>
  );
}
