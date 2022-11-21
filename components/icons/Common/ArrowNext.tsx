import { SVGProps } from 'react';

export default function ArrowNext(props: SVGProps<SVGSVGElement>) {
    return (
        <svg {...props} focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIosIcon">
            <path d="M6.23 20.23 8 22l10-10L8 2 6.23 3.77 14.46 12z"></path>
        </svg>
    );
}
