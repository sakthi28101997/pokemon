import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PokemonProvider } from "@/context/PokemonContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Pokemon",
  description: "Pokemon Search",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PokemonProvider>{children}</PokemonProvider>
      </body>
    </html>
  );
}
