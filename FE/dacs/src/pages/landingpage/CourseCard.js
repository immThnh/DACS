
import React, { useState,memo } from 'react';
const courses = [
  {
    id: 1,
    title: 'Web Design Fundamentals',
    price: 100,
    discount: 20,
    description: 'Learn the fundamentals of web design, including HTML, CSS, and responsive design principlesssssssssssssssssssssssssssssssssssssssssssssssssssssss.',
    thumbnail: 'https://picsum.photos/id/237/800/500',
    categories: [
      { id: 1, name: 'Design' },
      { id: 2, name: 'Frontend' }
    ],
    lessons: [
      { id: 1, title: 'Introduction to HTML' },
      { id: 2, title: 'Styling with CSS' }
    ]
  },
  {
    id: 2,
    title: 'Software Engineering Fundamentals',
    price: 100,
    discount: 20,
    description: 'Learn the fundamentals of web design, including HTML, CSS, and responsive design principles.',
    thumbnail: 'https://picsum.photos/id/239/800/500',
    categories: [
      { id: 1, name: 'Design' },
      { id: 2, name: 'Frontend' }
    ],
    lessons: [
      { id: 1, title: 'Introduction to HTML' },
      { id: 2, title: 'Styling with CSS' }
    ]
  },
  {
    id: 2,
    title: 'Software Engineering Fundamentals',
    price: 100,
    discount: 20,
    description: 'Learn the fundamentals of web design, including HTML, CSS, and responsive design principles.',
    thumbnail: 'https://picsum.photos/id/238/800/500',
    categories: [
      { id: 1, name: 'Design' },
      { id: 2, name: 'Frontend' }
    ],
    lessons: [
      { id: 1, title: 'Introduction to HTML' },
      { id: 2, title: 'Styling with CSS' }
    ]
  },
  
  // Add more courses as needed
];

function Badge({ children }) {
  return (
    <div className="flex justify-center px-2.5 py-1 bg-white rounded-md border border-gray-500 border-solid text-xs ">
      {children}
    </div>
  );
}
const CourseCard = memo(({ course }) => {
  return (
    // For small screens: full width. For medium screens and up: 1/3 width.
    <div className="course-card w-full md:w-1/3 px-4 flex flex-col">
      <div className="bg-white rounded-xl border border-gray-100 p-6 flex flex-col">
        <div className="flex justify-center">
          {/* Adjust image size for smaller screens */}
          <img src={course.thumbnail} alt="" className="course-image rounded-t-lg mb-4 w-full object-cover" style={{ height: '200px', objectFit: 'cover' }} />
        </div>
        <div className="flex justify-start space-x-2 mb-2">
          {course.categories.map((category) => (
            <Badge key={category.id}>{category.name}</Badge>
          ))}
        </div>
        <h3 className="text-md sm:text-lg font-semibold text-neutral-800 mb-2 truncate text-start">
          {course.title}
        </h3>
        <p className="text-neutral-600 text-xs sm:text-sm mb-4 line-clamp text-start">
          {course.description}
        </p>
        <button className="px-4 py-2 text-xs sm:text-sm font-medium text-center rounded-md border border-gray-100 bg-neutral-100 text-neutral-800">
          Get it Now
        </button>
      </div>
    </div>
  );
});

const CoursesComponent = () => {
  return (
    // Use padding adjustment for smaller screens if necessary.
    <section className="p-4 sm:px-5 sm:py-10 mx-auto max-w-[1350px]">
      {/* Change to column layout on small screens */}
      <div className="flex flex-wrap justify-center">
        {courses.map((course, index) => (
          <CourseCard key={index} course={course} />
        ))}
      </div>
    </section>
  );
};

export default CoursesComponent;