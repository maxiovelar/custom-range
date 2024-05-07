import { RangeNormal } from '@/_components/range-normal/RangeNormal';
import { pageTitles } from '@/_constants/constants';
import { getRangeNormalData } from '@/_services/apiService';

const PageExercise1 = async () => {
    const { min, max } = await getRangeNormalData();

    return (
        <>
            <h1 className="title">{pageTitles.exercise1}</h1>
            <RangeNormal min={min} max={max} />
        </>
    );
};

export default PageExercise1;
