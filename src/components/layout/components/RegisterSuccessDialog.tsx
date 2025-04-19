'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { BookOpen, CheckCircle, Home } from 'lucide-react';

import Logo from '@/assets/images/devooks_logo.png';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export default function RegisterSuccessDialog() {
  const router = useRouter();

  const handleGoHome = () => {
    router.push('/');
  };

  const handleExploreBooks = () => {
    router.push('/main');
  };

  return (
    <Dialog>
      <DialogContent className="max-w-md overflow-hidden rounded-xl border-0 p-0 shadow-2xl">
        <div className="relative z-10 flex flex-col items-center bg-gradient-to-r from-blue-50 to-indigo-50 p-8">
          <div className="mb-2 flex justify-center">
            <Image src={Logo} alt="devooks 로고" height={60} className="drop-shadow-md" />
          </div>

          <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
            <CheckCircle className="h-12 w-12 text-green-600" strokeWidth={1.5} />
          </div>

          <DialogTitle className="mb-3 text-center text-2xl font-bold">회원가입 완료!</DialogTitle>

          <p className="mb-6 text-center text-slate-600">
            devooks의 회원이 되신 것을 환영합니다!
            <br />
            다양한 전자책과 함께 새로운 지식의 세계를 만나보세요.
          </p>

          <div className="flex w-full max-w-xs flex-col gap-3">
            <Button
              className="h-12 bg-gradient-to-r from-blue-600 to-indigo-600 transition-all hover:from-blue-700 hover:to-indigo-700"
              onClick={handleExploreBooks}
            >
              <BookOpen className="mr-2 h-4 w-4" /> 전자책 둘러보기
            </Button>

            <Button variant="outline" className="h-12 border-slate-300" onClick={handleGoHome}>
              <Home className="mr-2 h-4 w-4" /> 홈으로 가기
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
