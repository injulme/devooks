export default function Introduction({ introduction }: { introduction: string }) {
  return (
    <div>
      <h6 className="mb-6 text-lg font-bold">책 소개</h6>
      <p className="leading-6">{introduction}</p>
    </div>
  );
}
