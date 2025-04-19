'use client';

import Link from 'next/link';

import { BookOpen, Facebook, Instagram, Twitter } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-screen-xl px-6 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* 로고 및 설명 */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-slate-900 dark:text-white" />
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                readit
              </span>
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              readit은 고품질 전자책을 쉽게 찾고, 구매하고, 판매할 수 있는 최고의 플랫폼입니다. 언제
              어디서나 디지털 독서의 즐거움을 경험해보세요.
            </p>
            <div className="mt-6 flex space-x-4">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <Facebook className="h-4 w-4" />
                <span className="sr-only">Facebook</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <Twitter className="h-4 w-4" />
                <span className="sr-only">Twitter</span>
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <Instagram className="h-4 w-4" />
                <span className="sr-only">Instagram</span>
              </Button>
            </div>
          </div>

          {/* 둘러보기 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">둘러보기</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/main"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  전체 전자책
                </Link>
              </li>
              <li>
                <Link
                  href="/bestsellers"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  베스트셀러
                </Link>
              </li>
              <li>
                <Link
                  href="/new-releases"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  신규 출시
                </Link>
              </li>
              <li>
                <Link
                  href="/authors"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  작가 목록
                </Link>
              </li>
            </ul>
          </div>

          {/* 고객 지원 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">고객 지원</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  고객센터
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  자주 묻는 질문
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  문의하기
                </Link>
              </li>
              <li>
                <Link
                  href="/return-policy"
                  className="text-sm text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                >
                  환불 정책
                </Link>
              </li>
            </ul>
          </div>

          {/* 뉴스레터 */}
          <div>
            <h3 className="text-sm font-semibold text-slate-900 dark:text-white">뉴스레터 구독</h3>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
              최신 소식과 특별 할인 정보를 받아보세요.
            </p>
            <div className="mt-4 flex flex-col space-y-2">
              <Input
                type="email"
                placeholder="이메일 주소"
                className="border-gray-200 text-sm focus-visible:ring-slate-400 dark:border-slate-700 dark:focus-visible:ring-slate-500"
              />
              <Button className="bg-slate-900 text-white hover:bg-slate-800 dark:bg-slate-800 dark:hover:bg-slate-700">
                구독하기
              </Button>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-gray-100 dark:bg-slate-800" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex gap-4 text-xs text-slate-600 dark:text-slate-400">
            <Link href="/terms" className="hover:text-slate-900 dark:hover:text-white">
              이용약관
            </Link>
            <Link href="/privacy" className="hover:text-slate-900 dark:hover:text-white">
              개인정보처리방침
            </Link>
            <Link href="/cookies" className="hover:text-slate-900 dark:hover:text-white">
              쿠키 정책
            </Link>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            © 2025 readit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
