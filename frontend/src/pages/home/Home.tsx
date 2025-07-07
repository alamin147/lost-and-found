import Banner from "../../components/banner/Banner";
import Services from "../services/Services";
import RecentLostItem from "../../components/recentItem/RecentLostItem";
import Reviews from "../reviews/Reviews";
import AboutUs from "../../components/aboutUs/aboutUs";
import RecentFoundItem from "../../components/recentItem/RecentFoundItem";
import Faq from "../../components/faq/Faq";
import SuccessStats from "../../components/successStats/SuccessStats";

const Home = () => {
  return (
    <>
      <Banner />
      <Services />
      <SuccessStats />
      <RecentLostItem />
      <RecentFoundItem />
      <Reviews />
      <AboutUs />
      <Faq/>
    </>
  );
};

export default Home;
