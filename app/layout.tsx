import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";
import { Navbar } from "./_components/navbar/navbar";
import { Footer } from "./_components/footer/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Range Exercise",
  description: "Range exercise developed with Next.js by Maximiliano Ovelar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
