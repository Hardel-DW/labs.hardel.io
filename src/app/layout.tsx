import '@/styles/global.css';
import Footer from '@/app/Footer';
import React from 'react';
import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app'
};

const inter = Inter({
    subsets: ['latin']
});

const seven = localFont({
    src: [{ path: '../../public/fonts/seven/minecraft.ttf' }, { path: '../../public/fonts/seven/minecraft.woff' }],
    variable: '--font-seven'
});

const minecraft = localFont({
    src: '../../public/fonts/minecraft.ttf',
    variable: '--font-minecraft'
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body
                className={[
                    'min-h-screen flex flex-col justify-between background-grid',
                    seven.variable,
                    minecraft.variable,
                    inter.className
                ].join(' ')}
            >
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
