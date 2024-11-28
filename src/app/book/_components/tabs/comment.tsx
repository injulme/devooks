'use client';

import { ReviewSummary } from '@/services/review/type';
import dayjs from 'dayjs';
import { MessageSquareMore, Star } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Ratings from '@/components/ui/ratings';

export default function Comment({ review }: { review: ReviewSummary }) {
  return (
    <Collapsible>
      <div className="flex flex-col py-4 first-of-type:border-t-2">
        <div className="flex items-center gap-3">
          <Avatar className="h-[32px] w-[32px]">
            <AvatarImage src={review.writer.profileImagePath} className="object-cover" />
            <AvatarFallback>{review.writer.nickname.substring(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex w-full justify-between gap-1">
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              {review.writer.nickname} <div className="h-3 w-[1px] bg-gray-300" />
              {dayjs(review.modifiedDate).format('YYYY.MM.DD HH:mm:ss')}
            </span>
            <Ratings size={16} value={review.rating} variant="yellow" />
          </div>
        </div>
        <p className="mt-1 text-sm leading-5 text-gray-800">{review.content}</p>
        <div className="flex justify-end">
          <CollapsibleTrigger>
            <Button variant="link" size="sm">
              <MessageSquareMore size={20} strokeWidth={1.5} className="mr-1 scale-x-[-1]" />
              12
            </Button>
          </CollapsibleTrigger>
        </div>
      </div>
      <CollapsibleContent>
        <div className="mb-4 rounded-sm bg-slate-100 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-[24px] w-[24px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-between gap-1">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                injulme0309 <div className="h-3 w-[1px] bg-gray-300" />
                2023.12.21
              </span>
            </div>
          </div>
          <p className="text-sm leading-5 text-gray-800">
            [어두운 상점들의 거리]를 읽은 독자라면, 모디아노가 또 다시 잃어버린 기억을 찾아 나서는
            이번 책 역시 흥미진진하게 느껴질 것 같다. 그런데 15년전, 30년전 하면서 과거와 더 먼
            과거를 넘나들며 오가는 회상의 서사로 인해 주인공과 함께 미로 속을 헤매는 기분이다.
            집중해야한다! 하지만 주인공이 지표없이 방황하는데 우리가 어찌 중심을 잡고 나서겠는가.
            <br />
            무슨 일이 있었을까 궁금해하며 혹은 조바심내고 긴장하며 읽게 되는 책이다. 얼핏 조르주
            페렉의 느낌도 드는 건 나만의 착각일까? 길다면 길고 짧다면 짧은 인생을 살아가면서
            새겨지는 그 어릴 적 기억이 한 사람의 삶에 가볍지 않은 무게로 자리 할 수 있음을 확인하게
            된다.
          </p>
        </div>
        <div className="mb-4 rounded-sm bg-slate-100 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-[24px] w-[24px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-between gap-1">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                injulme0309 <div className="h-3 w-[1px] bg-gray-300" />
                2023.12.21
              </span>
            </div>
          </div>
          <p className="text-sm leading-5 text-gray-800">
            [어두운 상점들의 거리]를 읽은 독자라면, 모디아노가 또 다시 잃어버린 기억을 찾아 나서는
            이번 책 역시 흥미진진하게 느껴질 것 같다. 그런데 15년전, 30년전 하면서 과거와 더 먼
            과거를 넘나들며 오가는 회상의 서사로 인해 주인공과 함께 미로 속을 헤매는 기분이다.
            집중해야한다! 하지만 주인공이 지표없이 방황하는데 우리가 어찌 중심을 잡고 나서겠는가.
            <br />
            무슨 일이 있었을까 궁금해하며 혹은 조바심내고 긴장하며 읽게 되는 책이다. 얼핏 조르주
            페렉의 느낌도 드는 건 나만의 착각일까? 길다면 길고 짧다면 짧은 인생을 살아가면서
            새겨지는 그 어릴 적 기억이 한 사람의 삶에 가볍지 않은 무게로 자리 할 수 있음을 확인하게
            된다.
          </p>
        </div>
        <div className="mb-4 rounded-sm bg-slate-100 p-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-[24px] w-[24px]">
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className="flex w-full justify-between gap-1">
              <span className="flex items-center gap-2 text-xs text-muted-foreground">
                injulme0309 <div className="h-3 w-[1px] bg-gray-300" />
                2023.12.21
              </span>
            </div>
          </div>
          <p className="text-sm leading-5 text-gray-800">
            [어두운 상점들의 거리]를 읽은 독자라면, 모디아노가 또 다시 잃어버린 기억을 찾아 나서는
            이번 책 역시 흥미진진하게 느껴질 것 같다. 그런데 15년전, 30년전 하면서 과거와 더 먼
            과거를 넘나들며 오가는 회상의 서사로 인해 주인공과 함께 미로 속을 헤매는 기분이다.
            집중해야한다! 하지만 주인공이 지표없이 방황하는데 우리가 어찌 중심을 잡고 나서겠는가.
            <br />
            무슨 일이 있었을까 궁금해하며 혹은 조바심내고 긴장하며 읽게 되는 책이다. 얼핏 조르주
            페렉의 느낌도 드는 건 나만의 착각일까? 길다면 길고 짧다면 짧은 인생을 살아가면서
            새겨지는 그 어릴 적 기억이 한 사람의 삶에 가볍지 않은 무게로 자리 할 수 있음을 확인하게
            된다.
          </p>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
}
