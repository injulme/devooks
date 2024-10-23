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
      <div className="mx-auto flex h-[64px] max-w-screen-xl items-center justify-between gap-6 px-12">
        <Link href="/">
          <Image src={Logo} alt="devooks 로고" height={40} />
        </Link>
        <Input />
        <div className="flex items-center gap-2">
          <Button variant="outline">
            <Link href="/book/add">책 등록</Link>
          </Button>

          <LoginDialog />
          <RegisterDialog />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
