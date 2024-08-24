"use client"
import { useState } from "react";
import AnimatedCanvas from "./_components/AnimatedCanvas";
import Image from "next/image";
import ModalBox from "./_components/ModalBox";

function GamePage() {
  const [playerDied, setPlayerDied] = useState<boolean>(false);
  const [playerWon, setPlayerWon] = useState<boolean>(false);
  return (
    <>
      <div className="h-screen flex items-center justify-center relative">
      <ModalBox hasDied={playerDied} hasWon={playerWon} />
        <div className="absolute z-10 left-10 text-white">
          <h3 className="uppercase">Controls</h3>
          <p>"a" - move left</p>
          <p>"d" - move right</p>
          <p>"w" - jump</p>
        </div>
        <Image src="/assets/background.jpg" alt="" fill className="z-0" />
        <AnimatedCanvas
          setPlayerDied={setPlayerDied}
          setPlayerWon={setPlayerWon}
        />
      </div>
    </>
  );
}

export default GamePage;
