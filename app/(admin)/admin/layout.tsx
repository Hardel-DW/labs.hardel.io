import '@styles/global.scss';
import { Inter } from 'next/font/google';
import local from 'next/font/local';
import React from 'react';
import Sidebar from '@admin/admin/Sidebar';
import Footer from '@admin/admin/Footer';
import Header from '@admin/admin/Header';
import { preloadSession } from '@libs/session';

const inter = Inter({
    subsets: ['latin']
});

const seven = local({
    src: [{ path: '../../../public/fonts/seven/minecraft.ttf' }, { path: '../../../public/fonts/seven/minecraft.woff' }],
    variable: '--font-seven'
});

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    preloadSession();

    return (
        <html lang="en">
            <head>
                <title>Dashboard</title>
            </head>
            <body>
                <main className={[inter.className, seven.variable].join(' ')}>
                    <div className={'flex background-grid'}>
                        <Sidebar />
                        <div className={'flex flex-auto flex-col justify-between min-h-screen relative'}>
                            <div>
                                <Header />
                                <section className={'px-4 md:px-8'}>
                                    <div className={'container'}>{children}</div>
                                </section>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
