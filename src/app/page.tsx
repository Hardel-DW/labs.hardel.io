import React from 'react';
import Skew from '@/components/Skew';
import HighlightDiamonds from '@/components/HighlightDiamonds';
import GoldButton from '@/components/form/button/GoldButton';
import RainbowButton from '@/components/form/button/RainbowButton';
import WhiteButton from '@/components/form/button/WhiteButton';

export default function Home() {
    return (
        <>
            <section className={'height-view overflow-hidden relative z-10 border-solid flex justify-center'}>
                <div className={'container h-full flex flex-col justify-center items-center'}>
                    <h1 className={'font-bold text-gold text-center'}>Hardel Labs</h1>
                    <hr />
                    <p className={'text-white w-fit text-2xl font-semibold text-center'}>
                        Very simple and powerful tools to create data packs.
                    </p>
                    <p className={'text-gray-400 text-sm text-center w-1/2'}>
                        Try now to create your first optimized and fast data pack without any knowledge in development and programming
                        languages.
                    </p>
                    <div className={'my-8'}>
                        <GoldButton className={'mx-4'}>Donation</GoldButton>
                        <RainbowButton className={'mx-4'}>Try Now</RainbowButton>
                        <WhiteButton className={'mx-4'}>Learn More</WhiteButton>
                    </div>
                    <HighlightDiamonds />
                    <Skew />
                </div>
            </section>

            {/*            <section className={'shadow-section overflow-hidden background-royal py-20 border-b-gold border-b-8 border-solid'}>
                <div className={'container w-10/12 mx-auto'}>
                    <div className={'grid grid-cols-1 md:grid-cols-5 gap-8'}>
                        <div className={'md:col-span-2 bg-transparent self-center rounded-royal'}>
                            <Link href={'/generator/crafting'}>
                                <Image
                                    src={CraftingCover}
                                    alt={'Crafting Cover'}
                                    width={240}
                                    height={134}
                                    className={
                                        'hover:scale-90 transition w-full rounded-royal border-gold border-2 border-solid shadow-zinc-900 shadow-2xl'
                                    }
                                />
                            </Link>
                        </div>
                        <div className={'md:col-span-3 pl-20 py-4'}>
                            <h1 className={'text-white text-4xl font-bold'}>Crafting Generator</h1>
                            <p className={'text-gray-400 text-sm mt-4'}>
                                Crafting Generator is a tool that allows you to create crafting recipes in a very simple way, and also use
                                &quot;NBT&quot; items in a special custom crafting table.
                            </p>
                            <hr />
                            <div className={'grid grid-cols-1 gap-8 py-2 md:grid-cols-2'}>
                                <div className={'flex flex-col gap-y-6'}>
                                    <Check>No programming knowledge required</Check>
                                    <Check>Custom crafting table for NBT</Check>
                                    <Check>Crafting table, furnace and other blocks.</Check>
                                </div>
                                <div className={'flex flex-col gap-y-6'}>
                                    <Check>Free</Check>
                                    <Check>Open Source</Check>
                                    <Check>Fast and optimized data packs</Check>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr className={'my-10'} />
                    <div className={'w-full flex justify-center mt-12'}>
                        <Link href={'/generator/crafting'}>
                            <RainbowButton className={'mx-4'}>Try it Now</RainbowButton>
                        </Link>
                        <WhiteButton className={'mx-4'}>View changelog</WhiteButton>
                    </div>
                </div>
            </section>*/}
        </>
    );
}
