import Categories from "@/components/UI/Homepage/Categories/Categories";
import HeroSection from "@/components/UI/Homepage/HeroSection/HeroSection";
import TopRatedCourse from "@/components/UI/Homepage/TopRatedCourses/TopRatedCourse";
import GetAllCourses from "@/components/UI/pages/GetAllCourses";

const Homepage = () => {
  return (
    <div>
      <HeroSection />
      <Categories />
      <TopRatedCourse />
      <GetAllCourses />
    </div>
  );
};

export default Homepage;
