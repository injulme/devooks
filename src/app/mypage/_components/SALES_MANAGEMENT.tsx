import { useState } from 'react';

import {
  ArrowRight,
  Banknote,
  BarChart3,
  Calendar,
  ChevronDown,
  Download,
  Filter,
  Gem,
  MoreHorizontal,
  Plus,
  ReceiptText,
  RefreshCw,
  TrendingUp,
} from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

const dummy = Array(4)
  .fill({})
  .map((_, i) => i);

export default function SalesManagement() {
  const [dateFilter, setDateFilter] = useState<string>('7');

  return (
    <section>
      <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card className="bg-gradient-to-br from-slate-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">출금 가능 수익금</CardTitle>
            <Gem className="h-5 w-5 stroke-slate-600" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-3xl font-bold text-slate-800">45,231 원</div>
            <div className="mt-1 flex items-center gap-1 text-xs text-slate-500">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="font-medium text-green-500">+20.1%</span> 지난달 대비
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <Button className="w-full gap-1 bg-slate-800 text-white hover:bg-slate-700">
              <Banknote className="h-4 w-4" /> 출금 신청하기
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">월별 총 판매액</CardTitle>
            <BarChart3 className="h-5 w-5 stroke-slate-600" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-3xl font-bold text-slate-800">253,840 원</div>
            <div className="flex h-8 w-full items-end justify-between gap-1 pt-2">
              {[35, 52, 30, 45, 60, 75, 90].map((height, index) => (
                <div
                  key={index}
                  className="w-full rounded-sm bg-slate-200"
                  style={{ height: `${height}%` }}
                >
                  <div
                    className="w-full rounded-sm bg-slate-600"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="pt-0">
            <div className="flex w-full items-center justify-between text-xs text-slate-500">
              <span>4월</span>
              <span>5월</span>
              <span>6월</span>
              <span>7월</span>
              <span>8월</span>
              <span>9월</span>
              <span>10월</span>
            </div>
          </CardFooter>
        </Card>

        <Card className="bg-gradient-to-br from-slate-50 to-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">누적 출금 완료액</CardTitle>
            <ReceiptText className="h-5 w-5 stroke-slate-600" />
          </CardHeader>
          <CardContent className="pb-2">
            <div className="text-3xl font-bold text-slate-800">1,287,500 원</div>
            <p className="mt-1 text-xs text-slate-500">
              최근 출금일: <span className="font-medium text-slate-700">2023.10.15</span>
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-1 border-slate-300 text-slate-700"
            >
              <Download className="h-4 w-4" /> 출금 내역 다운로드
            </Button>
          </CardFooter>
        </Card>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <h5 className="text-xl font-bold text-slate-800">판매 & 출금 관리</h5>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="h-9 w-[150px] border-slate-300 text-sm">
                <SelectValue placeholder="도서 필터" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">모든 도서</SelectItem>
                <SelectItem value="kingdom">The People of the Kingdom</SelectItem>
                <SelectItem value="adventure">The Great Adventure</SelectItem>
                <SelectItem value="sunset">Sunset Boulevard</SelectItem>
              </SelectContent>
            </Select>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="h-9 w-[120px] border-slate-300 text-sm">
                <SelectValue placeholder="기간 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7">최근 7일</SelectItem>
                <SelectItem value="30">최근 30일</SelectItem>
                <SelectItem value="90">최근 3개월</SelectItem>
                <SelectItem value="180">최근 6개월</SelectItem>
                <SelectItem value="365">최근 1년</SelectItem>
              </SelectContent>
            </Select>

            <Button variant="outline" size="sm" className="h-9 border-slate-300">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="sales" className="mb-8">
        <TabsList className="mb-4 w-full bg-slate-100">
          <TabsTrigger
            value="sales"
            className="flex-1 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
          >
            수익금 내역
          </TabsTrigger>
          <TabsTrigger
            value="withdrawals"
            className="flex-1 data-[state=active]:bg-slate-700 data-[state=active]:text-white"
          >
            출금 내역
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="flex flex-col gap-4">
            {dummy.map((d) => {
              return (
                <Card
                  key={d}
                  className="overflow-hidden border-slate-200 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex">
                    <div className="w-2 bg-green-500" />
                    <div className="flex flex-1 flex-col justify-between p-4 sm:flex-row sm:items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold text-slate-800">
                            The People of the Kingdom
                          </h4>
                          <Badge className="bg-green-100 text-green-800">판매 완료</Badge>
                        </div>
                        <p className="text-sm text-slate-500">구매자: user***@email.com</p>
                      </div>

                      <div className="mt-2 flex flex-col sm:mt-0 sm:items-end">
                        <span className="text-xl font-bold text-slate-800">22,500원</span>
                        <span className="text-xs text-slate-500">2023.10.07 18:53</span>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}

            <Button
              variant="outline"
              className="mt-2 border-slate-300 text-slate-600 hover:bg-slate-50"
            >
              더 보기 <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="withdrawals">
          <div className="flex flex-col gap-4">
            {dummy.map((d, i) => {
              const statusVariants: Record<string, { text: string; bg: string; color: string }> = {
                '0': { text: '처리 완료', bg: 'bg-green-100', color: 'text-green-800' },
                '1': { text: '처리중', bg: 'bg-blue-100', color: 'text-blue-800' },
                '2': { text: '대기', bg: 'bg-yellow-100', color: 'text-yellow-800' },
                '3': { text: '반려', bg: 'bg-red-100', color: 'text-red-800' },
              };

              const status = statusVariants[`${i % 4}`];

              return (
                <Card
                  key={d}
                  className="overflow-hidden border-slate-200 transition-all duration-200 hover:border-slate-300 hover:shadow-sm"
                >
                  <div className="flex">
                    <div
                      className={`w-2 ${i % 4 === 0 ? 'bg-green-500' : i % 4 === 1 ? 'bg-blue-500' : i % 4 === 2 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    />
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold text-slate-800">출금 신청</h4>
                            <Badge className={`${status.bg} ${status.color}`}>{status.text}</Badge>
                          </div>
                          <div className="mt-2 text-sm">
                            <div className="flex items-center gap-2">
                              <span className="w-20 text-slate-500">출금 계좌</span>
                              <span className="font-medium text-slate-700">
                                국민은행 123-1234-1234
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="w-20 text-slate-500">예금주</span>
                              <span className="font-medium text-slate-700">홍길동</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end">
                          <span className="text-xl font-bold text-slate-800">45,000원</span>
                          <span className="text-xs text-slate-500">2023.10.{5 - i} 12:12</span>
                        </div>
                      </div>

                      {i === 2 && (
                        <div className="mt-2 flex justify-end">
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 border-slate-300 text-slate-700"
                          >
                            취소하기
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              );
            })}

            <div className="mt-4">
              <Button className="w-full gap-1 bg-slate-800 text-white hover:bg-slate-700">
                <Plus className="h-4 w-4" /> 신규 출금 신청
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <Card className="border-slate-200 p-4">
        <h5 className="mb-2 text-lg font-bold text-slate-800">출금 계좌 관리</h5>
        <div className="flex gap-3">
          <div className="flex-1">
            <Label htmlFor="bank-select" className="text-xs text-slate-500">
              은행
            </Label>
            <Select defaultValue="kb">
              <SelectTrigger id="bank-select" className="mt-1 border-slate-300">
                <SelectValue placeholder="은행 선택" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="kb">국민은행</SelectItem>
                <SelectItem value="shinhan">신한은행</SelectItem>
                <SelectItem value="woori">우리은행</SelectItem>
                <SelectItem value="hana">하나은행</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex-1">
            <Label htmlFor="account-number" className="text-xs text-slate-500">
              계좌번호
            </Label>
            <Input
              id="account-number"
              className="mt-1 border-slate-300"
              placeholder="'-' 없이 입력"
            />
          </div>

          <div className="flex-1">
            <Label htmlFor="account-holder" className="text-xs text-slate-500">
              예금주
            </Label>
            <Input
              id="account-holder"
              className="mt-1 border-slate-300"
              placeholder="예금주명 입력"
            />
          </div>

          <div className="flex items-end">
            <Button className="bg-slate-800 hover:bg-slate-700">저장</Button>
          </div>
        </div>

        <div className="mt-4 text-xs text-slate-500">
          ※ 출금 계좌는 본인 명의의 계좌만 등록 가능합니다. 등록된 계좌로 매월 15일, 30일에 자동
          출금됩니다.
        </div>
      </Card>
    </section>
  );
}
