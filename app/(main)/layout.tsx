import '@styles/global.scss';
import { Inter } from '@next/font/google';
import Footer from '@main/Footer';
import React, { Suspense } from 'react';
import local from '@next/font/local';
import Header from '@main/(Header)/Header';
import LoadingHeader from '@main/(Header)/LoadingHeader';
import { preloadSession } from '@libs/session';
import ModalContextProvider from '@components/modal/ModalContext';

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
    preloadSession();

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
