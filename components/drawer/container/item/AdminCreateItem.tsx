'use client';

import fetcher from '@libs/request/fetcher';
import useSWR from 'swr';
import { Category } from '@prisma/client';
import { deleteItem } from '@libs/request/client/item';
import { ReadableItemData } from '@definitions/minecraft';
import { useRouter } from 'next/navigation';
import BaseCreateItem, { SendData } from '@components/drawer/container/item/BaseCreateItem';

type Props = {
    onClose: () => void;
    isCreating: boolean;
    defaultValues?: Partial<ReadableItemData>;
};

export default function AdminCreateItem(props: Props) {
    const { data } = useSWR<Category[]>('/api/categories/lite', fetcher);
    const router = useRouter();

    const sendData = async (data: SendData) => {
        const { name, minecraftId, asset, tags, categories } = data;
        /*        await assetUploadItem(minecraftId, asset);
        await upsertVanillaItem(!props.isCreating, name, minecraftId, tags, categories, props.defaultValues?.id).then(() => {
            router.refresh();
            props.onClose();
        });*/
    };

    const handleDelete = async () => {
        if (props.defaultValues?.id) {
            await deleteItem(props.defaultValues?.id).then(() => {
                router.refresh();
                props.onClose();
            });
        }
    };

    return (
        <BaseCreateItem
            isCreating={props.isCreating}
            defaultCategory={data}
            onClose={props.onClose}
            onSend={(data) => sendData(data)}
            onDeleted={() => handleDelete()}
        />
    );
}
