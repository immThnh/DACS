import * as React from "react";

function CourseSection() {
    return (
        <section className="flex flex-wrap gap-5 w-full max-w-screen-xl text-start px-4 md:px-8 mt-10">
            <div className="flex flex-col flex-1">
                <h2 className="text-2xl md:text-4xl font-semibold leading-tight md:leading-snug text-neutral-800">
                    Our Courses
                </h2>
                <p className="mt-1 text-sm md:text-base leading-snug md:leading-normal text-zinc-600">
                    Lorem ipsum dolor sit amet consectetur. Tempus tincidunt
                    etiam eget elit id imperdiet et. Cras eu sit dignissim lorem
                    nibh et. Ac cum eget habitasse in velit fringilla feugiat
                    senectus in.
                </p>
            </div>
        </section>
    );
}

export default CourseSection;