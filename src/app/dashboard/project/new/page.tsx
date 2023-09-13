import AlertInfo from '@/components/alert/AlertInfo';
import PendingSpin from '@/components/form/PendingSpin';
import FormRoundedImage from '@/components/form/FormRoundedImage';
import FormLabel from '@/components/form/FormLabel';
import FormInput from '@/components/form/FormInput';
import FormTextArea from '@/components/form/FormTextArea';
import Button from '@/components/form/Button';
import DashboardHeader from '@/components/layout/DashboardHeader';
import { createProject } from '@/server/project';
import Form from '@/components/form/Form';

export default function NewProjectPage() {
    return (
        <DashboardHeader name={'New project'}>
            <hr className={'mb-8'} />

            <AlertInfo className={'mb-10'}>
                When you create a project, you are the owner of this project. You can invite other people to join your project. All data
                likes recipes and items are linked to the project, and stored on cloud.
            </AlertInfo>

            <Form className="flex gap-x-8" action={createProject}>
                <div className="flex-shrink-0 border-r border-zinc-700 px-8">
                    <div className="flex justify-center items-center flex-col">
                        <p className={'text-2xl font-semibold tracking-wider'}>Projects Icons</p>
                        <FormRoundedImage id={'icons'} />
                    </div>
                </div>
                <div className="ml-4 w-full flex flex-col gap-y-10">
                    <div className="flex flex-col gap-y-2">
                        <FormLabel htmlFor="title">Project name :</FormLabel>
                        <FormInput id="title" type="text" name="title" placeholder="Project name" required validate="^." />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <FormLabel htmlFor="namespace">Namespace Identifier :</FormLabel>
                        <FormInput
                            className="lowercase"
                            id="namespace"
                            type="text"
                            name="namespace"
                            placeholder="enchantplus"
                            autoCapitalize="none"
                            validate="^[a-z._-]+$"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-y-2">
                        <FormLabel htmlFor="description">Project description :</FormLabel>
                        <FormTextArea
                            id="description"
                            name="description"
                            validate="^."
                            rows={4}
                            placeholder="My beautiful projects descriptions !"
                            required
                        />
                    </div>
                    <Button toasts={{ variant: 'info', text: 'Creating projects...' }} type="submit" className={'w-1/2 max-w-[350px]'}>
                        Create project
                    </Button>
                    <PendingSpin />
                </div>
            </Form>
        </DashboardHeader>
    );
}
