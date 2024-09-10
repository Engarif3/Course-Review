import Categories from "@/components/UI/Homepage/Categories/Categories";
import HeroSection from "@/components/UI/Homepage/HeroSection/HeroSection";
import GetAllCourses from "@/components/UI/pages/GetAllCourses";

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <GetAllCourses />
      <Categories />
    </div>
  );
};

export default Homepage;
