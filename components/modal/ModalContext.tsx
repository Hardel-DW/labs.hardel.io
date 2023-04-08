'use client';

import React, { createContext, useState } from 'react';
import Modal from '@components/modal/index';
import Cross from '@icons/Common/Cross';
import Warning from '@icons/Common/Warning';
import RedButton from '@components/form/Button/Red';
import WhiteButton from '@components/form/Button/White';

type ModalContextData = {
    showConfirmation: (children: React.ReactNode, onConfirm: () => void) => void;
};

export const ModalContext = createContext<ModalContextData>({} as ModalContextData);

export default function ModalContextProvider({ children }: { children: React.ReactNode }) {
    const [open, setOpen] = useState<boolean>(false);
    const [onConfirm, setOnConfirm] = React.useState(() => () => {});
    const [content, setContent] = useState<React.ReactNode>(null);

    const showConfirmation = (children: React.ReactNode, onConfirm: () => void) => {
        setOpen(true);
        setContent(children);
        setOnConfirm(() => () => {
            onConfirm();
            setOpen(false);
        });
    };

    return (
        <ModalContext.Provider value={{ showConfirmation }}>
            {children}
            <Modal open={open} onClose={() => setOpen(false)}>
                <button
                    onClick={() => setOpen(false)}
                    className={
                        'absolute top-3 right-2.5 bg-transparent fill-zinc-400 hover:bg-zinc-700 hover:fill-white rounded-lg text-sm p-1.5 ml-auto inline-flex items-center'
                    }
                >
                    <Cross />
                </button>
                <div className="p-6 text-center">
                    <Warning className={'mx-auto mb-4 w-14 h-14 text-gray-200'} />
                    <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">{content}</h3>
                    <div className={'flex justify-center gap-x-4'}>
                        <RedButton onClick={() => setOpen(false)}>Cancel</RedButton>
                        <WhiteButton onClick={() => onConfirm()}>Yes, I&apos;m sure</WhiteButton>
                    </div>
                </div>
            </Modal>
        </ModalContext.Provider>
    );
}
