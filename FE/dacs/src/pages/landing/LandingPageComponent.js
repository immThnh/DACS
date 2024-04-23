import * as React from "react";
import CourseSection from "../../component/ladingComponent/CourseSection.js";
import CourseCard from "../../component/ladingComponent/CourseCard";
import SlideShow from "../../component/ladingComponent/SlideShow.js";
function LandingPageComponent() {
    return (
        <div className="z-49  flex flex-col mt-20 items-center pt-5 bg-neutral-100">
            <main>
                <div className="relative mx-auto max-w-screen-xl overflow-hidden my-4 rounded-xl">
                    <SlideShow />
                </div>

                <CourseSection />
                <hr></hr>
                <div className="flex items-center">
                    <CourseCard />
                </div>
            </main>
        </div>
    );
}

export default LandingPageComponent;
