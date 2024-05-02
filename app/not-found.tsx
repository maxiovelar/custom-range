import { ImageNotFound } from './_common/components/svg/not-found/ImageNotFound';
export default function NotFound() {
    return (
        <>
            <ImageNotFound />
            <h2>Not Found</h2>
            <p>Could not find requested resource</p>
        </>
    );
}
