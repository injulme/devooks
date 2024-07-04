import { PiBookBookmarkLight } from 'react-icons/pi';

import { codeToOptions } from '@/lib/utils';

import { Button } from '@/components/ui/button';

import { CategoryTypeCode } from '@/constant/common';

const categories = codeToOptions(CategoryTypeCode);

export default function Category() {
  return (
    <div className="pb-12">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">카테고리</h2>
          <div className="space-y-1">
            {categories.map((category) => {
              return (
                <Button variant="ghost" className="w-full justify-start" key={category.value}>
                  <PiBookBookmarkLight size={24} className="mr-2 h-4 w-4" />
                  {category.label}
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
