import Link from 'next/link';
import Image from 'next/image';

export default function LoadingHeader() {
    return (
        <nav className="bg-black/10 relative z-20 backdrop-blur-sm px-4 py-2.5 min-h-[70px] flex items-center">
            <div className="w-full flex flex-wrap justify-between items-center">
                <div className={'flex gap-x-2 items-center'}>
                    <Link href={'/'} className="flex items-center fill-white hover:fill-gold">
                        <Image src="/icons/hardel.svg" className="self-center w-10 h-10" alt="Hardel Letter logo" height={40} width={40} />
                        <span className="text-xl font-semibold whitespace-nowrap">ardel</span>
                    </Link>
                    <Image src="/icons/slash.svg" alt="Slash" height={40} width={40} />

                    <div className="justify-between items-center w-full md:flex md:w-auto md:order-1">
                        <div className={'animate-pulse h-4 w-[400px] bg-zinc-700 rounded-md'} />
                    </div>
                </div>

                <div className="flex items-center md:order-2">
                    <div className="mr-4 animate-pulse w-[200px] h-6 bg-zinc-700 rounded-md" />
                    <div className="animate-pulse w-8 h-8 bg-zinc-700 rounded-full" />
                </div>
            </div>
        </nav>
    );
}
