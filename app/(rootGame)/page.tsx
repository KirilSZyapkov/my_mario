import AnimatedCanvas from "./_components/AnimatedCanvas";
import Image from "next/image";

function GamePage() {
  return (
    <div className="h-screen flex items-center justify-center relative">
      <div className="absolute z-10 left-10 text-white">
        <h3 className="uppercase">Controls</h3>
        <p>"a" - move left</p>
        <p>"d" - move right</p>
        <p>"w" - jump</p>
      </div>
      <Image src="/assets/background.jpg" alt="" fill className="z-0" />
      <AnimatedCanvas />
    </div>
  );
}

export default GamePage;
