'use client';

import Comment from './comment';

const dummy = Array(15)
  .fill({})
  .map((_, i) => i);

export default function Review() {
  return (
    <div>
      <h6 className="mb-6 text-lg font-bold">리뷰</h6>
      <div className="space-y-4">
        {dummy.map((i) => {
          return <Comment key={i} />;
        })}
      </div>
    </div>
  );
}
