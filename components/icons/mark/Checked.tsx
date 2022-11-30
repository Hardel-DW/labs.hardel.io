import React, { SVGProps } from 'react';

export function Checked(props: SVGProps<SVGSVGElement>) {
    return (
        <svg width="1em" height="1em" viewBox="0 0 24 24" {...props}>
            <path d="m10 16.4l-4-4L7.4 11l2.6 2.6L16.6 7L18 8.4Z"></path>
        </svg>
    );
}
export default Checked;
