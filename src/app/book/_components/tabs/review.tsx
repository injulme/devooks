'use client';

import Comment from './comment';

import { ArrowDownWideNarrow } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

export default function Review() {
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h6 className="text-lg font-bold">리뷰</h6>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="sm" variant="secondary" className="flex items-center gap-1">
              <ArrowDownWideNarrow size={16} />
              좋아요 순
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>최신순</DropdownMenuItem>
            <DropdownMenuItem>인기순</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {dummy.map((i) => {
        return <Comment key={i} />;
      })}
    </div>
  );
}
