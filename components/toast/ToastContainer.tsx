'use client';

import React from 'react';
import { StaticImageData } from 'next/image';
import Toast from '@components/toast/Toast';

type ToastContextType = {
    toasts: ToastProps[];
    addToast: (status: ToastStatus, title: string, children: React.ReactNode) => void;
    removeToast: (id: number) => void;
    removeAllToasts: () => void;
    addPromiseToast: (promise: Promise<any>, successMessage: string, errorMessage: string, children: React.ReactNode) => void;
};

export const ToastContext = React.createContext<ToastContextType>({} as ToastContextType);

export type ToastProps = {
    id: number;
    title: string;
    children: React.ReactNode;
    asset?: string | StaticImageData;
    status: ToastStatus;
};

export enum ToastStatus {
    SUCCESS = 'success',
    ERROR = 'error',
    WARNING = 'warning',
    INFO = 'info'
}

export default function ToastContainer({ children }: { children: React.ReactNode }) {
    const [lastId, setLastId] = React.useState<number>(0);
    const [toasts, setToasts] = React.useState<ToastProps[]>([]);

    const addToast = (status: ToastStatus, title: string, children: React.ReactNode): number => {
        const id = lastId + 1;
        setToasts((toasts) => [...toasts, { id, title, children, status }]);
        setLastId(id);

        return id;
    };

    const removeToast = (id: number) => setToasts(toasts.filter((toast) => toast.id !== id));

    const removeAllToasts = () => setToasts([]);

    const addPromiseToast = (promise: Promise<any>, successMessage: string, errorMessage: string, children: React.ReactNode) => {
        promise
            .then(() => {
                addToast(ToastStatus.SUCCESS, successMessage, children);
            })
            .catch(() => {
                addToast(ToastStatus.ERROR, errorMessage, 'Something went wrong');
            });
    };

    return (
        <>
            <ToastContext.Provider value={{ toasts, addToast, removeToast, removeAllToasts, addPromiseToast }}>
                {children}
            </ToastContext.Provider>
            <div className={'fixed bottom-4 right-4 z-20'}>
                <div className={'flex flex-col space-y-4'}>
                    {toasts.map((toast) => (
                        <Toast key={toast.id} data={toast} onClosed={removeToast} />
                    ))}
                </div>
            </div>
        </>
    );
}
