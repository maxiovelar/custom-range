import { Range } from "@/_components/range/Range";
import { pageTitles } from "@/_constants/constants";

const Exercise = () => {
  return (
    <>
      <h1 className="title">{pageTitles.exercise1}</h1>
      <Range />
    </>
  );
};

export default Exercise;
