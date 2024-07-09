export default function Test() {
  const boxs = [
    900, 800, 700, 600, 500, 400, 300, 300, 400, 500, 600, 700, 800, 900, 400, 500, 600, 700, 800,
    900, 900,
  ];
  return (
    <div
      className="animate-rotate-axis relative mt-36 flex justify-center"
      style={{ transformStyle: 'preserve-3d' }}
    >
      {boxs.map((box, index) => {
        return (
          <div
            key={index}
            className="absolute h-[160px] w-[100px]"
            style={{
              transform: `rotateY(${index * 20}deg) translateZ(300px)`,
              backgroundColor: `#${box}${box}`,
            }}
          />
        );
      })}
    </div>
  );
}
