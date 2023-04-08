import Image from 'next/image';
import Harion from '@images/logo/harion.webp';
import { getSession } from '@libs/session';

export default async function StreamingAvatar() {
    const session = await getSession();

    return <Image className="rounded-full" width={32} height={32} src={session?.user?.image ?? Harion} alt="user photo" />;
}
