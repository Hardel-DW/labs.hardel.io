import { getSession } from '@/libs/session';
import { redirect } from 'next/navigation';
import { ProjectRole } from '@prisma/client';
import FormInput from '@/components/form/FormInput';
import Button from '@/components/form/Button';
import { deleteProject, transferOwnership } from '@/server/project';
import Form from '@/components/form/Form';

export default async function DashboardMembersPages() {
    const session = await getSession();
    if (!session?.project) redirect('/dashboard');
    if (session?.project?.session?.role !== ProjectRole.OWNER) redirect('/dashboard/settings');
    const { project } = session;

    return (
        <div className={'flex flex-col gap-y-8'}>
            <Form action={transferOwnership} className={'rounded-md w-full bg-black/50 border-zinc-600 border'}>
                <input type="hidden" name="id" value={project.id} />
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Transfer ownership</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Transfer the ownership of your project to another member of your project, your new owner will be able to delete your
                        project and change the settings.
                        <b> Your new role will be set to &quot;Admin&quot;.</b>
                    </p>
                    <div className={'flex flex-row gap-x-2'}>
                        <FormInput placeholder={'hardel@exemple.com'} name={'email'} id={'email'} validate="^.+\@.+\..+$" />
                    </div>
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>This action is irreversible</p>
                        <Button variant="white">Transfer</Button>
                    </div>
                </div>
            </Form>

            <Form action={deleteProject} className={'rounded-md w-full bg-black/50 border-red-700 border'}>
                <input type="hidden" name="id" value={project.id} />
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Delete this project</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        Deleting the project will delete all the data associated with it, including all the users and their data. This
                        action is irreversible, please be careful.
                    </p>
                    <p className={'text-red-400 text-base'}>
                        To delete this project, please type the name of the project.
                        <br />
                        Project name: &quot;<b>{project.name}</b>&quot;
                    </p>
                    <FormInput placeholder={'Project Name'} name="confirm" id="confirm" validate={'^' + project.name + '$'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-500 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>This action is irreversible, all data will be lost.</p>
                        <Button variant="red" type="submit">
                            Delete
                        </Button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
