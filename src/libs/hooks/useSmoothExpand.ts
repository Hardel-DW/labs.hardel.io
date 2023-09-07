import { useCallback, useRef, useState } from 'react';

export default function useSmoothExpand() {
    const [collapsed, setCollapsed] = useState(true);
    const [height, setHeight] = useState(0);
    const refDropdown = useRef<HTMLDivElement>(null);

    const toggleCollapse = useCallback(() => {
        setCollapsed(!collapsed);
        setHeight(collapsed ? refDropdown.current?.offsetHeight ?? 0 : 0);
    }, [collapsed]);

    return {
        collapsed,
        height,
        refDropdown,
        toggleCollapse
    };
}
