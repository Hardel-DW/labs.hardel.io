'use client';

import { ReadableProjectData } from '@definitions/project';
import React, { useMemo } from 'react';
import ProjectCard from '@main/dashboard/ProjectCard';
import { SearchProjectContext } from '@components/context/SearchContext';
import { Session } from 'next-auth';

type Props = {
    data: ReadableProjectData[];
    session: Session;
};

export default function CardContainer({ data, session }: Props) {
    const { search } = React.useContext(SearchProjectContext);
    const display = useMemo(() => {
        return data?.filter((project) => project.name.toLowerCase().includes(search.toLowerCase()));
    }, [data, search]);

    return <>{data && display?.map((project, index) => <ProjectCard key={index} session={session} project={project} />)}</>;
}
