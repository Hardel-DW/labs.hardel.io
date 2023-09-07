'use client';

import useSmoothExpand from '@/libs/hooks/useSmoothExpand';
import Image from 'next/image';

export default function MobileDropdown({ children }: { children: React.ReactNode }) {
    const { refDropdown, height, toggleCollapse, collapsed } = useSmoothExpand();

    return (
        <div
            style={{
                height,
                marginTop: collapsed ? 0 : '3rem',
                marginBottom: collapsed ? 0 : '1rem'
            }}
            className="overflow-hidden transition-all duration-500"
        >
            <div className="absolute right-0 top-20 bg-black/50 px-6 py-2 rounded-l-3xl flex justify-center items-center overflow-hidden">
                <button onClick={toggleCollapse}>
                    <div className="block md:hidden relative w-8 h-8">
                        <Image src="/icons/common/menu.svg" className="h-full w-full fill-white" alt="Menu" width={32} height={32} />
                    </div>
                </button>
            </div>
            <div ref={refDropdown} className="flex flex-col gap-y-4 overflow-hidden">
                {children}
            </div>
        </div>
    );
}
