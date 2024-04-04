import * as React from "react";
import Imagelandingpage from './imagelandingpage'
import CourseSection from './coursesection'
import CourseCard from './CourseCard'
import PromoSlideshow from './slideshow'
function LandingPage() {
    return (
        <div className="flex flex-col mt-20 items-center pt-5 bg-neutral-100 z-0">
        <main >
        <div className="relative mx-auto max-w-screen-xl my-4 rounded-xl z-0">
        <PromoSlideshow/>
</div>
      
        <CourseSection/>
        <hr></hr>
        <div className="flex items-center">
        <CourseCard/>
        </div>
        </main>
      </div>
    );
  }
  
  export default LandingPage;