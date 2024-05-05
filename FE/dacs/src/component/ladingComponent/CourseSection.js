import * as React from "react";

function CourseSection() {
    return (
        <section className="flex gap-5 w-full max-w-[1200px] max-md:flex-wrap max-md:mt-10 max-md:max-w-full text-start pl-8 mt-20">
            <div className="flex flex-col flex-1 max-w-[1350px]">
                <h2 className="text-4xl font-semibold leading-[57px] text-neutral-800 max-md:max-w-full">
                    Our Courses
                </h2>
                <p className="mt-1 text-base leading-6 text-zinc-600 max-md:max-w-full ">
                    Lorem ipsum dolor sit amet consectetur. Tempus tincidunt
                    etiam eget elit id imperdiet et. Cras eu sit dignissim lorem
                    nibh et. Ac cum eget habitasse in velit fringilla feugiat
                    senectus in.
                </p>
            </div>
            {/* <button className="justify-center self-end px-5 py-3.5 mt-16 text-sm font-medium leading-5 text-center bg-gray-50 rounded-md border border-gray-100 border-solid text-neutral-800 max-md:mt-10">
        View All
      </button> */}
        </section>
    );
}

export default CourseSection;
