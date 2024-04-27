import { Banner } from "@/components/banner/Banner";
import { pageTitles } from "@/constants/constants";

export default function Home() {
  return (
    <>
      <h1 className="title">{pageTitles.home}</h1>
      <Banner />
    </>
  );
}
