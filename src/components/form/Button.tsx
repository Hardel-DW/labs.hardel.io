'use client';

import React, { useContext } from 'react';
import { clx } from '@/libs/utils';
import { experimental_useFormStatus as useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';
import { FormCheckerContext } from '@/components/form/FormCheckerProvider';

export default function Button(
    props: React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: keyof typeof variants;
        toasts?: {
            text: string;
            variant?: 'success' | 'error' | 'info' | 'warning' | 'loading';
        };
    }
) {
    const { pending } = useFormStatus();
    const myContext = useContext(FormCheckerContext);

    const variants = {
        white: {
            normal: 'bg-white text-black border-gray-600 border',
            hover: 'hover:bg-black hover:text-white hover:border-white',
            disabled: 'disabled:text-black disabled:bg-gray-600',
            hoverDisabled: 'hover:disabled:bg-gray-600 hover:disabled:text-black'
        },
        gold: {
            normal: 'bg-gold text-white border-gray-600 border',
            hover: 'hover:bg-black hover:text-white hover:border-gold',
            disabled: 'disabled:text-white disabled:bg-gold',
            hoverDisabled: 'hover:disabled:bg-gold hover:disabled:text-white'
        },
        rainbow: {
            normal: 'rainbow-border bg-black text-white',
            hover: 'hover:bg-black hover:text-white',
            disabled: 'disabled:text-white disabled:bg-gray-600',
            hoverDisabled: 'hover:disabled:bg-gray-600 hover:disabled:text-white'
        },
        red: {
            normal: 'bg-red-800 text-white border border-transparent',
            hover: 'hover:bg-black hover:text-white hover:border-red-800',
            disabled: 'disabled:text-white disabled:bg-red-800',
            hoverDisabled: 'hover:disabled:bg-red-800 hover:disabled:text-white'
        }
    } as const;

    const handle = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (pending) {
            switch (props.toasts?.variant) {
                case 'success':
                    toast.success(props.toasts.text);
                    break;
                case 'error':
                    toast.error(props.toasts.text);
                    break;
                case 'info':
                    toast.info(props.toasts.text);
                    break;
                case 'warning':
                    toast.warning(props.toasts.text);
                    break;
                case 'loading':
                    toast.loading(props.toasts.text);
                    break;
                default:
                    toast(props.toasts?.text);
                    break;
            }
        }

        props.onClick?.(e);
    };

    return (
        <button
            {...props}
            disabled={pending || (myContext && myContext.valid)}
            onClick={handle}
            className={clx(
                'px-8 transition-colors py-2 rounded-md font-semibold',
                'disabled:opacity-50 disabled:cursor-not-allowed disabled:border-gray-600 hover:disabled:border-gray-600',
                variants[props.variant || 'white'].normal,
                variants[props.variant || 'white'].hover,
                variants[props.variant || 'white'].disabled,
                variants[props.variant || 'white'].hoverDisabled,
                props.className
            )}
        />
    );
}
