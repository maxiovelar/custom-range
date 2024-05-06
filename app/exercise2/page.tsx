import { RangeFixedValues } from '@/_common/components/range-fixed-values/RangeFixeValues';
import { pageTitles } from '@/_common/constants/constants';
import { getFixedValuesRangeData } from '@/_services/apiService';

interface FixedValuesProps {
    rangeValues: number[];
}

const PageExercise2 = async () => {
    const { rangeValues } = (await getFixedValuesRangeData()) as FixedValuesProps;
    console.log('RANGE VALUES: ', rangeValues);

    return (
        <>
            <h1 className="title">{pageTitles.exercise2}</h1>
            <RangeFixedValues rangeValues={rangeValues} />
        </>
    );
};

export default PageExercise2;
