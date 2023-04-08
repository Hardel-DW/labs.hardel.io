'use client';

import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import FileInput from '@components/form/FileInput';
import { createProject, uploadProjectAsset } from '@libs/request/client/project';
import HardelLoader from '@components/loader/HardelLoader';
import SimpleSelect from '@components/form/Select/simple';
import { VERSION } from '@libs/constant';
import DefaultItem from '@images/design/item_placeholder.webp';
import Image from 'next/image';
import { ReadableProjectData } from '@definitions/project';

type Props = {
    onClose: () => void;
};

export default function CreateProject(props: Props) {
    const router = useRouter();
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [version, setVersion] = React.useState<string | undefined>('1.19.x');
    const [asset, setAsset] = React.useState<File | undefined>();
    const [pending, setPending] = React.useState(false);

    const displayPreview = useMemo(() => {
        return asset ? URL.createObjectURL(asset) : DefaultItem;
    }, [asset]);

    const sendData = async () => {
        if (!asset || !version) return;
        setPending(true);

        const namespace = name
            .toLowerCase()
            .replace(/[^a-z_]/gi, '')
            .toLowerCase();

        createProject<ReadableProjectData>({ name, description, version, namespace })
            .then((data) => uploadProjectAsset(data.id, asset))
            .finally(() => {
                setName('');
                setDescription('');
                setAsset(undefined);
                setPending(false);
                props.onClose();
                router.refresh();
            });
    };

    return (
        <div>
            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Name</p>
                    <small className="text-sm text-gray-400">Enter a name for your project</small>
                </div>
                <FormInput placeholder={'Name'} value={name} onChange={(e) => setName(e.target.value)} />
                <hr />
            </div>

            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Description</p>
                    <small className="text-sm text-gray-400">The description can be changed later</small>
                </div>
                <FormInput placeholder={'Description'} value={description} onChange={(e) => setDescription(e.target.value)} />
                <hr />
            </div>

            <div>
                <div className={'mb-4 flex justify-between items-center'}>
                    <div>
                        <p className="text-xl pl-1 mb-0 font-bold">Asset</p>
                        <small className="text-sm text-gray-400">The asset of minecraft data pack</small>
                    </div>
                    <Image src={displayPreview} alt={''} className={'w-8 h-8 rounded-full'} width={100} height={100} />
                </div>
                <FileInput onChange={(file) => setAsset(file)} />
                <hr />
            </div>

            <div>
                <div className={'mb-4'}>
                    <p className="text-xl pl-1 mb-0 font-bold">Version</p>
                    <small className="text-sm text-gray-400">
                        The version of minecraft data pack currently supported (Only 1.19.x for the moment)
                    </small>
                </div>
                <SimpleSelect options={VERSION} values={'1.19.x'} onChange={(value) => setVersion(value)} />
                <hr />
            </div>

            <div className={'flex justify-end w-full gap-x-2 mt-4'}>
                {pending ? (
                    <div className={'p-4'}>
                        <HardelLoader />
                    </div>
                ) : (
                    <WhiteButton onClick={() => sendData()}>Create</WhiteButton>
                )}
            </div>
        </div>
    );
}
