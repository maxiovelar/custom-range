import { Range } from "@/components/range/Range";
import { endpoints, pageTitles } from "@/constants/constants";
import { getRangeValues } from "@/services/apiService";

const PageExercise1 = async () => {
  const { data } = await getRangeValues(endpoints.normalRange);
  console.log(data);

  return (
    <>
      <h1 className="title">{pageTitles.exercise1}</h1>
      <Range />
      <div>
        {data.min} {data.max}
      </div>
    </>
  );
};

export default PageExercise1;
