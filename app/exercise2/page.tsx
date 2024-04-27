import { Range } from "@/components/range/Range";
import { endpoints, pageTitles } from "@/constants/constants";
import { getRangeValues } from "@/services/apiService";

const PageExercise2 = async () => {
  const { data } = await getRangeValues(endpoints.fixedValues);
  console.log(data);

  return (
    <>
      <h1 className="title">{pageTitles.exercise2}</h1>
      <Range />
      <div>{data.fixedValues}</div>
    </>
  );
};

export default PageExercise2;
