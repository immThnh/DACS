import * as React from "react";
import Imagelandingpage from './imagelandingpage';
import CourseSection from './coursesection';
import CourseCard from './CourseCard';
import PromoSlideshow from './slideshow';

function LandingPage() {
  return (
    <div className="flex flex-col items-center pt-5 bg-neutral-100 z-0">
      <main className="flex flex-col items-center w-full">
        <PromoSlideshow />
        <CourseSection />
        <hr></hr>
        <div className="flex justify-center w-full">
          <CourseCard />
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
