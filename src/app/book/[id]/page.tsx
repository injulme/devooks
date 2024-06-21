type PageParams = {
  id: string;
};
export default function ({ params }: { params: PageParams }) {
  return (
    <section className="grid grid-cols-5 gap-4">
      <div className="col-span-3 bg-blue-400">
        <div className="h-[480px]">썸네일</div>
        <div className="bg-red-300">책소개</div>
      </div>
      <div className="col-span-2 bg-blue-500">
        <div>책 내용</div>
        <div>프로필</div>
      </div>
    </section>
  );
}
