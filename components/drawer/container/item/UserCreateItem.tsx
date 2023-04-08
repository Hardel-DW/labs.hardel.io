'use client';

import fetcher from '@libs/request/fetcher';
import useSWR, { mutate } from 'swr';
import { Category, Item } from '@prisma/client';
import { ReadableItemData } from '@definitions/minecraft';
import { useRouter } from 'next/navigation';
import BaseCreateItem, { SendData } from '@components/drawer/container/item/BaseCreateItem';
import { assetCustomUploadItem, upsertItem } from '@libs/request/client/item';
import React from 'react';

type Props = {
    onClose: () => void;
    isCreating: boolean;
    defaultValues?: Partial<ReadableItemData>;
};

export default function UserCreateItem(props: Props) {
    const { data } = useSWR<Category[]>('/api/categories/lite', fetcher);
    const router = useRouter();

    const sendData = async (data: SendData) => {
        upsertItem<Item>(
            props.isCreating,
            {
                name: data.name,
                minecraftId: data.minecraftId,
                tag: data.tags,
                categories: data.categories,
                custom: true
            },
            props.defaultValues?.id
        ).then((item) => {
            data.asset && assetCustomUploadItem(item.id, data.asset);
            props.onClose();
            router.refresh();
            mutate('/api/items');
        });
    };

    return (
        <>
            <BaseCreateItem
                isCreating={props.isCreating}
                defaultCategory={data}
                defaultValues={props.defaultValues}
                onClose={props.onClose}
                onSend={(data) => sendData(data)}
            />
        </>
    );
}
