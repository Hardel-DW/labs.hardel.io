import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';
import FormCopy from '@/components/form/FormCopy';
import { ProjectRole } from '@prisma/client';
import FormInput from '@/components/form/FormInput';
import Button from '@/components/form/Button';
import SimpleSelect from '@/components/form/select/SimpleSelect';
import { VERSIONS } from '@/libs/constant';
import { leaveProject, updateProject, updateProjectAsset } from '@/server/project';
import FormFileInput from '@/components/form/FormFileInput';
import Form from '@/components/form/Form';

export default async function DashboardSettingsPages() {
    const session = await getSession();
    if (!session?.project) redirect('/dashboard');
    const { project } = session;

    return (
        <div className={'flex flex-col gap-y-8'}>
            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Project identifier</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Its a unique identifier for your project, you can use it to contact the support team if you have any problem.
                    </p>
                    <FormCopy>{project.id}</FormCopy>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>For contact staff use this identifiant.</p>
                    </div>
                </div>
            </div>

            {[ProjectRole.OWNER, ProjectRole.ADMIN].some((role) => role === project.session?.role) && (
                <>
                    <Form action={updateProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                            <div className={'p-8'}>
                                <h1 className={'text-2xl text-white'}>Project Name</h1>
                                <hr />
                                <p className={'text-zinc-400 text-base'}>
                                    You can change the name of your project here, the modification will be applied to all users.
                                </p>
                                <FormInput required key={Math.random()} placeholder="Project Name" name="name" id="name" validate={'^.'} />
                            </div>

                            <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                                <div className={'flex flex-row justify-between items-center'}>
                                    <p className={'text-zinc-400 text-base font-bold mb-0'}>Maximum 50 characters.</p>
                                    <Button type="submit">Update</Button>
                                </div>
                            </div>
                        </div>
                    </Form>

                    <Form action={updateProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                            <div className={'p-8'}>
                                <h1 className={'text-2xl text-white'}>Project Description</h1>
                                <hr />
                                <p className={'text-zinc-400 text-base'}>
                                    You can change the description of your project here, be short and inventive 😁
                                </p>
                                <FormInput
                                    required
                                    key={Math.random()}
                                    placeholder="Project description"
                                    name="description"
                                    id="description"
                                    validate={'^.'}
                                />
                            </div>

                            <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                                <div className={'flex flex-row justify-between items-center'}>
                                    <p className={'text-zinc-400 text-base font-bold mb-0'}>Maximum 255 characters.</p>
                                    <Button type="submit">Update</Button>
                                </div>
                            </div>
                        </div>
                    </Form>

                    <Form action={updateProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                            <div className={'p-8'}>
                                <h1 className={'text-2xl text-white'}>Project Version</h1>
                                <hr />
                                <p className={'text-zinc-400 text-base'}>
                                    Its the minecraft version of your project, you can change it here, the modification will be applied to
                                    all users.
                                </p>
                                <SimpleSelect options={VERSIONS} defaultValue={VERSIONS[0].value} />
                            </div>
                            <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                                <div className={'flex flex-row justify-between items-center'}>
                                    <p className={'text-zinc-400 text-base font-bold mb-0'}>Only 1.19.x Available</p>
                                    <Button type="submit">Update</Button>
                                </div>
                            </div>
                        </div>
                    </Form>

                    <Form action={updateProject}>
                        <input type="hidden" name="id" value={project.id} />
                        <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                            <div className={'p-8'}>
                                <h1 className={'text-2xl text-white'}>Project namespace</h1>
                                <hr />
                                <p className={'text-zinc-400 text-base'}>
                                    A namespace represents in a data pack the folder where all technical data will be present.
                                </p>
                                <FormInput
                                    required
                                    key={Math.random()}
                                    placeholder="Project namespace"
                                    name="namespace"
                                    id="namespace"
                                    validate={'^[a-z_]+$'}
                                />
                            </div>

                            <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                                <div className={'flex flex-row justify-between items-center'}>
                                    <p className={'text-zinc-400 text-base font-bold mb-0'}>Only lowercase characters or underscore</p>
                                    <Button type="submit">Update</Button>
                                </div>
                            </div>
                        </div>
                    </Form>

                    <Form action={updateProjectAsset}>
                        <input type="hidden" name="id" value={project.id} />
                        <div className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                            <div className={'p-8'}>
                                <div className={'flex justify-between'}>
                                    <div>
                                        <h1 className={'text-2xl text-white'}>Project image</h1>
                                        <p className={'text-zinc-400 text-base mb-4'}>
                                            You can change the image of your project here noted some rules:
                                        </p>
                                    </div>
                                </div>
                                <ul className={'text-zinc-400 text-base list-disc list-inside mb-4'}>
                                    <li className={'text-zinc-400 text-base'}>
                                        The image must be in one of the following formats: png, jpg, jpeg, gif or webp.
                                    </li>
                                    <li className={'text-zinc-400 text-base'}>The image must not exceed 1MB</li>
                                    <li className={'text-zinc-400 text-base'}>The image will be automatically resized to 64x64 pixel</li>
                                </ul>
                                <FormFileInput required key={Math.random()} name="icons" id="icons" />
                            </div>
                            <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                                <div className={'flex flex-row justify-between items-center'}>
                                    <p className={'text-zinc-400 text-base font-bold mb-0'}>
                                        <span className={'text-red-500'}>*</span> Maximum 3 modifications per day.
                                    </p>
                                    <Button type="submit">Upload</Button>
                                </div>
                            </div>
                        </div>
                    </Form>
                </>
            )}

            {ProjectRole.OWNER !== project.session?.role && (
                <form action={leaveProject} className={'rounded-md w-full bg-black/50 border-red-700 border'}>
                    <input type="hidden" name="id" value={project.id} />

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
                            <Button variant="red" type="submit">
                                Leave
                            </Button>
                        </div>
                    </div>
                </form>
            )}
        </div>
    );
}
