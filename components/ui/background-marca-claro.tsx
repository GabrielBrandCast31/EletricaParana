export default function BackgroundMarcaClaro() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#F4F6F9] overflow-hidden">
      <div
        className="absolute inset-0
        bg-[radial-gradient(#52BBD133_1px,transparent_1px)]
        [background-size:20px_20px]
        [mask-image:radial-gradient(circle_at_50%_50%,#000_70%,transparent_100%)]
        [-webkit-mask-image:radial-gradient(circle_at_50%_50%,#000_70%,transparent_100%)]
        [mask-repeat:no-repeat] [-webkit-mask-repeat:no-repeat]"
      />
    </div>
  );
}
