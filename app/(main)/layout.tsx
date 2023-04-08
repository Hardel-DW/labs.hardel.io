import '@styles/global.scss';
import Footer from '@main/Footer';
import React, { Suspense } from 'react';
import Header from '@main/(Header)/Header';
import LoadingHeader from '@main/(Header)/LoadingHeader';
import ModalContextProvider from '@components/modal/ModalContext';
import { Inter } from 'next/font/google';
import local from 'next/font/local';

const inter = Inter({
    subsets: ['latin']
});

const seven = local({
    src: [{ path: '../../public/fonts/seven/minecraft.ttf' }, { path: '../../public/fonts/seven/minecraft.woff' }],
    variable: '--font-seven'
});

const minecraft = local({
    src: '../../public/fonts/minecraft.ttf',
    variable: '--font-minecraft'
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <head>
                <title>Create Next App</title>
            </head>
            <body className={'min-h-screen flex flex-col justify-between background-grid'}>
                <div className={[seven.variable, minecraft.variable, inter.className].join(' ')}>
                    <Suspense fallback={<LoadingHeader />}>
                        {/* @ts-ignore */}
                        <Header />
                    </Suspense>
                    <ModalContextProvider>
                        <main>{children}</main>
                    </ModalContextProvider>
                </div>
                <Footer />
            </body>
        </html>
    );
}
