import { Banner } from "@/_common/components/banner/Banner";
import { pageTitles } from "@/_common/constants/constants";

export default function Home() {
  return (
    <>
      <h1 className="title">{pageTitles.home}</h1>
      <Banner />
    </>
  );
}
