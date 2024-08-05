import GameHeader from "./_components/GameHeader";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
     <GameHeader />
      {children}
    </main>
  );
}
