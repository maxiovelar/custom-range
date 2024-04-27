import { Banner } from "./_components/banner/banner";
import { pageTitles } from "./_constants/constants";

export default function Home() {
  return (
    <>
      <h1 className="title">{pageTitles.home}</h1>
      <Banner />
    </>
  );
}
