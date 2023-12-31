import React from 'react';
import Skew from '@/components/Skew';
import HighlightDiamonds from '@/components/HighlightDiamonds';
import Button from '@/components/form/Button';

export default function Home() {
    return (
        <section className={'min-h-[100dvh] overflow-hidden relative z-10 border-solid flex justify-center items-center'}>
            <div className={'flex flex-col justify-center items-center w-9/12'}>
                <h1 className={'font-bold text-gold text-center md:text-8xl text-6xl'}>Hardel Labs</h1>
                <hr />
                <p className={'text-white w-fit text-sm md:text-2xl font-semibold text-center'}>
                    Very simple and powerful tools to create data packs.
                </p>
                <p className={'text-gray-400 text-sm text-center w-8/12'}>
                    Try now to create your first optimized and fast data pack without any knowledge in development and programming
                    languages.
                </p>
                <div className={'my-8 flex gap-x-10 gap-y-4 flex-wrap justify-center'}>
                    <Button variant="gold">Donation</Button>
                    <Button variant="rainbow">Try Now</Button>
                    <Button variant="white">Learn More</Button>
                </div>
                <HighlightDiamonds />
                <Skew />
            </div>
        </section>
    );
}
