import * as React from "react";
import CourseSection from "../../component/ladingComponent/CourseSection.js";
import CourseCard from "../../component/ladingComponent/CourseCard.js";
import SlideShow from "../../component/ladingComponent/SlideShow.js";
import Footer from "../../layout/footer/index.js";
function LandingPageComponent() {
    return (
        <div className="z-49  flex flex-col items-center pt-5 bg-neutral-100">
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
            <Footer />

        </div>
    );
}

export default LandingPageComponent;
