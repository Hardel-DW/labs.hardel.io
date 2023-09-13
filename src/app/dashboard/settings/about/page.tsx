import ProgressBar from '@/components/form/progress/ProgressBar';
import AlertInfo from '@/components/alert/AlertInfo';

export default function About() {
    return (
        <div className={'flex flex-col gap-y-8'}>
            <AlertInfo>
                This page is not finished yet, it will be available in a future update. Currently, you have infinite disk space, crafts,
                items and members, soon these will be limited.
            </AlertInfo>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border opacity-50'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Disk space</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        You have used <span className={'text-white'}>0.00</span> of your <span className={'text-white'}>∞</span> GB of disk
                        space.
                    </p>
                    <ProgressBar value={50} label={'0.00 GB'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>
                            Max disk space: <span className={'text-white'}>∞ GB</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border opacity-50'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Numbers crafts</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        You have created <span className={'text-white'}>0</span> crafts.
                    </p>
                    <ProgressBar value={50} label={'0 Craft'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>
                            Max crafts: <span className={'text-white'}>∞</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border opacity-50'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Numbers items</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        You have created <span className={'text-white'}>0</span> items.
                    </p>
                    <ProgressBar value={50} label={'0 Items'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>
                            Max items: <span className={'text-white'}>∞</span>
                        </p>
                    </div>
                </div>
            </div>

            <div className={'rounded-md w-full bg-black/50 border-zinc-600 border opacity-50'}>
                <div className={'p-8'}>
                    <h1 className={'text-2xl text-white'}>Numbers members</h1>
                    <hr />
                    <p className={'text-zinc-400 text-base'}>
                        You have invited <span className={'text-white'}>0</span> members.
                    </p>
                    <ProgressBar value={50} label={'0 members'} />
                </div>
                <div className={'bg-zinc-900 rounded-b-md px-6 py-4 border-zinc-600 border-t'}>
                    <div className={'flex flex-row justify-between items-center'}>
                        <p className={'text-zinc-400 text-base font-bold mb-0'}>
                            Max members: <span className={'text-white'}>∞</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
