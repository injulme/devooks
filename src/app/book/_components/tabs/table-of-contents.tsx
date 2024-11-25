import { EbookGetSummary } from '@/services/ebook/type';

export default function TableOfContents({
  tableOfContents,
}: Pick<EbookGetSummary, 'tableOfContents'>) {
  return (
    <div>
      <h6 className="mb-6 text-lg font-bold">목차</h6>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className="h-8 w-1 rounded-full bg-gray-200"></div>
          <div className="text-sm">{tableOfContents}</div>
        </div>
      </div>
    </div>
  );
}
