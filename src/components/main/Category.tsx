import { codeToOptions } from '@/lib/utils';

import { CategoryTypeCode } from '@/constant/common';

const categories = codeToOptions(CategoryTypeCode);

export default function Category() {
  return (
    <div className="">
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">카테고리</h3>
      <ul className="flex flex-col gap-2">
        {categories.map((category) => {
          return (
            <li
              key={category.value}
              className="cursor-pointer rounded-sm bg-slate-300 px-2 py-3 hover:bg-slate-400"
            >
              {category.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
