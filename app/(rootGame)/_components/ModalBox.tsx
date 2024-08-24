function ModalBox({ hasWon, hasDied }: { hasWon: boolean; hasDied: boolean }) {
  return (
    <div style={{display:hasWon || hasDied ? "fixed" : "none"}} className="flex justify-center items-center fixed z-50  top-0 left-0 w-full h-screen overflow-auto bg-gray-900/50">
      {hasWon && (
        <div className="text-white text-center">
          <p className="uppercase font-bold tracking-widest text-center">
            Congratulations you won the game.
          </p>
          <br />
          <p className="uppercase font-bold tracking-widest text-center">
            To play again please refresh the page.
          </p>
        </div>
      )}
      {hasDied && (
        <div className="text-white text-center">
          <p className="uppercase font-bold tracking-widest text-center">
            you died.
          </p>
          <br />
          <p className="uppercase font-bold tracking-widest text-center">
            to try again please refresh the page
          </p>
        </div>
      )}
    </div>
  );
}

export default ModalBox;
