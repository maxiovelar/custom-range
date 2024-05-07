import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/_components/navbar/Navbar';
import { Footer } from '@/_components/footer/Footer';
import './globals.scss';
import { Suspense } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Range Exercise',
    description: 'Range exercise developed with Next.js by Maximiliano Ovelar.',
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
                <Suspense fallback={<p className="animation-pulse loading">Loading...</p>}>
                    <main className="main">{children}</main>
                </Suspense>
                <Footer />
            </body>
        </html>
    );
}
