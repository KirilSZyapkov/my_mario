import AnimatedCanvas from "./_components/AnimatedCanvas";
import Image from "next/image";


function GamePage() {
  
  return (
    <>
      <div className="h-screen flex items-center justify-center relative">
        {/* <ModalBox hasDied={playerDied} hasWon={playerWon} /> */}
        <div className="absolute z-10 left-10 text-white">
          <h3 className="uppercase">Controls</h3>
          <p>&quot;a&quot; - move left</p>
          <p>&quot;d&quot; - move right</p>
          <p>&quot;w&quot; - jump</p>
          
        </div>
        <Image src="/assets/background.jpg" alt="" fill className="z-0" />
        <AnimatedCanvas
          
        />
      </div>
    </>
  );
}

export default GamePage;
