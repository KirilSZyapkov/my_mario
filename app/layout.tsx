import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Mario",
  description:
    "The objective of the game is to simply move right and reach the end of each stage. The player is able to move left to an extent, though once they start to move left the camera will stay in place. When moving right, the camera centers on the player. If the player goes as far left as possible and then starts to go to the right once again, then the camera won't remain centered on them until they reach the center. In Super Mario Bros., the player is unable to reach the far right of the stage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        {children}
        
      </body>
    </html>
  );
}
