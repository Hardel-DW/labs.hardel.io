import React from 'react';
import HardelLoader from '@/components/HardelLoader';

export default function Loading() {
    return (
        <div className={'height-view w-full flex justify-center items-center'}>
            <HardelLoader />
        </div>
    );
}
