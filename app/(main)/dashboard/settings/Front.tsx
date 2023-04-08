'use client';
import React, { useMemo, useState } from 'react';
import DefaultItem from '@images/design/item_placeholder.webp';
import { leaveProject, updateProject, uploadProjectAsset } from '@libs/request/client/project';
import FormInput from '@components/form/input';
import WhiteButton from '@components/form/Button/White';
import Image from 'next/image';
import FileInput from '@components/form/FileInput';
import SimpleSelect from '@components/form/Select/simple';
import { VERSION } from '@libs/constant';
import CopyField from '@components/form/CopyField';
import { ProjectRole } from '@prisma/client';
import RedButton from '@components/form/Button/Red';
import { ReadableProjectData } from '@definitions/project';

type State = {
    name?: string;
    description?: string;
    version?: string;
    asset?: File | null;
    namespace?: string;
};

export default function Front({ data }: { data: ReadableProjectData }) {
    const [state, setState] = useState<State>();

    const preview = useMemo(() => {
        if (state?.asset) {
            return URL.createObjectURL(state.asset);
        } else if (data.asset) {
            return data.asset;
        } else {
            return DefaultItem;
        }
    }, [state?.asset, data.asset]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };

    const onSubmit = async (fieldName: string) => {
        if (!state || !data) {
            return;
        }

        const currentState = { ...state } as { [index: string]: any };
        const field = currentState[fieldName];

        if (!field) return;

        if (field instanceof File) {
            await uploadProjectAsset(data.id, field).then(() => {
                setState({ ...state, asset: null });
            });

            return;
        }

        await updateProject(data.id, { [fieldName]: field }).then(() => {
            setState({ ...state, [fieldName]: null });
        });
    };

    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project identifier</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Its a unique identifier for your project, you can use it to contact the support team if you have any problem.
                    </p>
                    <CopyField>{data.id ?? 'Bip Bop I am searching.'}</CopyField>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>For contact staff use this identifiant.</p>
                    </div>
                </div>
            </div>

            {[ProjectRole.OWNER, ProjectRole.ADMIN].some((role) => role === data.role) && (
                <>
                    <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                        <div className={'p-8'}>
                            <h1 className={'text-2xl text-white'}>Project Name</h1>
                            <hr />
                            <p className={'text-zinc-400 text-base'}>
                                You can change the name of your project here, the modification will be applied to all users.
                            </p>
                            <FormInput placeholder={'Project Name'} name={'name'} onChange={onChange} value={state?.name ?? ''} />
                        </div>
                        <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                            <div className={'flex flex-row justify-between items-center'}>
                                <p className={'text-zinc-400 text-base font-bold mb-0'}>Maximum 50 characters.</p>
                                <WhiteButton onClick={() => onSubmit('name')}>Update</WhiteButton>
                            </div>
                        </div>
                    </div>

                    <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                        <div className={'p-8'}>
                            <h1 className={'text-2xl text-white'}>Project Description</h1>
                            <hr />
                            <p className={'text-zinc-400 text-base'}>
                                You can change the description of your project here, be short and inventive 😁
                            </p>
                            <FormInput
                                placeholder={'Project description'}
                                name={'description'}
                                onChange={onChange}
                                value={state?.description ?? ''}
                            />
                        </div>
                        <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                            <div className={'flex flex-row justify-between items-center'}>
                                <p className={'text-zinc-400 text-base font-bold mb-0'}>Maximum 255 characters.</p>
                                <WhiteButton onClick={() => onSubmit('description')}>Update</WhiteButton>
                            </div>
                        </div>
                    </div>

                    <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                        <div className={'p-8'}>
                            <div className={'flex justify-between'}>
                                <div>
                                    <h1 className={'text-2xl text-white'}>Project image</h1>
                                    <p className={'text-zinc-400 text-base mb-4'}>
                                        You can change the image of your project here noted some rules:
                                    </p>
                                </div>
                                <Image src={preview} width={64} height={64} alt={'Project image'} className={'rounded-md w-16 h-16'} />
                            </div>
                            <ul className={'text-zinc-400 text-base list-disc list-inside mb-4'}>
                                <li className={'text-zinc-400 text-base'}>
                                    The image must be in one of the following formats: png, jpg, jpeg, gif or webp.
                                </li>
                                <li className={'text-zinc-400 text-base'}>The image must not exceed 1MB</li>
                                <li className={'text-zinc-400 text-base'}>The image will be automatically resized to 64x64 pixel</li>
                            </ul>
                            <FileInput onChange={(file) => setState({ ...state, asset: file })} />
                        </div>
                        <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                            <div className={'flex flex-row justify-between items-center'}>
                                <p className={'text-zinc-400 text-base font-bold mb-0'}>
                                    <span className={'text-red-500'}>*</span> Maximum 3 modifications per day.
                                </p>
                                <WhiteButton onClick={() => onSubmit('asset')}>Upload</WhiteButton>
                            </div>
                        </div>
                    </div>

                    <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                        <div className={'p-8'}>
                            <h1 className={'text-2xl text-white'}>Project Version</h1>
                            <hr />
                            <p className={'text-zinc-400 text-base'}>
                                Its the minecraft version of your project, you can change it here, the modification will be applied to all
                                users.
                            </p>
                            <SimpleSelect
                                options={VERSION}
                                values={VERSION[0].value}
                                onChange={(value) => setState({ ...state, version: value })}
                            />
                        </div>
                        <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                            <div className={'flex flex-row justify-between items-center'}>
                                <p className={'text-zinc-400 text-base font-bold mb-0'}>Only 1.19.x Available</p>
                                <WhiteButton onClick={() => onSubmit('version')}>Update</WhiteButton>
                            </div>
                        </div>
                    </div>

                    <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                        <div className={'p-8'}>
                            <h1 className={'text-2xl text-white'}>Project namespace</h1>
                            <hr />
                            <p className={'text-zinc-400 text-base'}>
                                A namespace represents in a data pack the folder where all technical data will be present.
                            </p>
                            <FormInput
                                placeholder={'Project namespace'}
                                name={'namespace'}
                                onChange={onChange}
                                value={state?.namespace ?? ''}
                            />
                        </div>
                        <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                            <div className={'flex flex-row justify-between items-center'}>
                                <p className={'text-zinc-400 text-base font-bold mb-0'}>Only lowercase characters or underscore</p>
                                <WhiteButton onClick={() => onSubmit('namespace')}>Update</WhiteButton>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {data && ProjectRole.OWNER !== data.role && (
                <div className={'rounded-md w-full bg-black/50 border-red-700 border'}>
                    <div className={'p-8'}>
                        <h1 className={'text-2xl text-white'}>Leave</h1>
                        <hr />
                        <p className={'text-zinc-400 text-base'}>
                            You are about to leave this project, you will no longer be able to access it, you will also lose all your rights
                            on it.
                        </p>
                    </div>
                    <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-500 border-t'}>
                        <div className={'flex flex-row justify-between items-center'}>
                            <p className={'text-zinc-400 text-base font-bold mb-0'}>This action is irreversible.</p>
                            <RedButton onClick={async () => await leaveProject(data.id)}>Leave</RedButton>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
