import Copy from '@icons/Common/Copy';
import React from 'react';

export default function CopyField(props: { children: string; onCopy?: () => void }) {
    return (
        <div className={'w-fit rounded-md border border border-zinc-600 relative'}>
            <div className={'px-4 py-2 pr-[50px]'}>{props.children}</div>
            <div className={'absolute top-0 right-0 bottom-0 flex items-center px-2'}>
                <Copy
                    className={'cursor-pointer fill-zinc-400 h-6 w-6 hover:fill-white transition'}
                    onClick={() => {
                        navigator.clipboard.writeText(props.children).then(() => props.onCopy?.());
                    }}
                />
            </div>
        </div>
    );
}
