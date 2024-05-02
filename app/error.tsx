'use client';

import { useEffect } from 'react';
import { Wrong } from './_common/components/svg/wrong/Wrong';

export default function Error({
    error,
    reset,
}: {
    readonly error: Error & { digest?: string };
    readonly reset: () => void;
}) {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <>
            <Wrong />
            <h2>Something went wrong!</h2>
            <button className="flat-button" onClick={() => reset()}>
                Try again
            </button>
        </>
    );
}
