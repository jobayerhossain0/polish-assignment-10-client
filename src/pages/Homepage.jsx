import LatestVisas from "../components/LatestVisas";
import HeroSlider from "../components/HeroSlider";
import Features from "../components/Features";
import TestimonialsSection from "../components/Testimonials";

const Homepage = () => {
  return (
    <main>
      <HeroSlider />
      <Features />
      <LatestVisas />
      <TestimonialsSection />
    </main>
  );
};

export default Homepage;
