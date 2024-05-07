import { pageTitles } from '@/_constants/constants';
import { Banner } from './_components/svg/banner/Banner';

export default function Home() {
    return (
        <>
            <h1 className="title">{pageTitles.home}</h1>
            <Banner />
        </>
    );
}
