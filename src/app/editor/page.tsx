'use client';

import { useState } from 'react';

import Editor from '@/components/rich-text/editor';

import './prose-mirror.css';

export default function Home() {
  const [value, setValue] = useState('hello world');

  return (
    <div className="h-min-screen mx-auto max-w-2xl md:container">
      <div className="flex w-full flex-col items-center p-4">
        <Editor content={value} onChange={setValue} placeholder="Write your post here..." />
      </div>
    </div>
  );
}
