import { RangeNormal } from "@/_common/components/range-normal/RangeNormal";
import { pageTitles } from "@/_common/constants/constants";
import { getRangeNormalData } from "@/_infra/services/apiService";

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
