import { pageTitles } from '@/_common/constants/constants';
import { Banner } from './_common/components/svg/banner/Banner';

export default function Home() {
    return (
        <>
            <h1 className="title">{pageTitles.home}</h1>
            <Banner />
        </>
    );
}
