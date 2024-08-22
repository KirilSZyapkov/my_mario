import AnimatedCanvas from "../_components/AnimatedCanvas";
import Image from "next/image";

function GamePage() {
  return (
    <div className="h-screen flex items-center justify-center relative">
      <Image src="/assets/background.jpg" alt="" fill  className="z-0"/>
        <AnimatedCanvas />
    </div>
  );
}

export default GamePage;
