'use client';
import { Fragment, useEffect, useState } from 'react';
import NextImage from 'next/image';
import { clx } from '@libs/utils';
import Placeholder from '@images/design/item_placeholder.webp';

type Props = {
    src?: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
    fill?: boolean;
};

export default function LoadingImage(props: Props) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        if (!props.src) return;

        const image = new Image();
        image.src = props.src;
        image.onload = () => setLoading(false);
    }, [props.src]);

    return (
        <Fragment>
            {loading && <NextImage src={Placeholder} alt={'Loading...'} width={32} height={32} className={props.className} />}
            <img src={props.src} alt={props.alt} className={clx(props.className, loading ? 'hidden' : 'block')} />
        </Fragment>
    );
}
