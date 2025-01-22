

import GridPattern from './ui/grid-pattern';
import Hero from './Home';
import FooterPage from './FooterPage';

const HeroPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0E0C0A] text-white">
      <div className="container mx-auto sm:px-6 lg:px-8 flex flex-col min-h-screen">
        <GridPattern
          squares={[
            [4, 4],
            [5, 1],
            [8, 2],
            [5, 3],
            [5, 5],
            [10, 10],
            [12, 15],
            [15, 10],
            [10, 15],
            [15, 10],
            [10, 15],
            [15, 10],
          ]}
          className="[mask-image:radial-gradient(400px_circle_at_center,white,transparent)] inset-x-0 inset-y-[-30%] h-[200%] skew-y-12"
        />
        <Hero />
        <FooterPage/>

      </div>
      
    </div>
  );
};

export default HeroPage;
