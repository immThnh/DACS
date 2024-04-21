import React, { useState } from 'react';
import CourseOption from "../../component/SelectionCard"
const CourseCreationPage = () => {
  const [step, setStep] = useState(1);

  // Handlers to navigate through the course creation steps
  const goToNextStep = () => setStep((prev) => (prev < 4 ? prev + 1 : prev));
  const goToPreviousStep = () => setStep((prev) => (prev > 1 ? prev - 1 : prev));

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Step Indicator */}
      <div className="mb-8">
        <div className="text-center text-2xl font-semibold">Step {step} of 4</div>
      </div>

      {/* Main content area */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
          {/* Content based on the step */}
          {step === 1 && (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">First, let's find out what type of course you're creating.</h3>
              <CourseOption/>              
            </div>
          )}

          {step === 2 && (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">What's the content title?</h3>
              {/* Input for the course title */}
              {/* ... */}
            </div>
          )}

          {step === 3 && (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">Which category best fits the knowledge you're sharing?</h3>
              {/* Dropdown for the course category */}
              {/* ... */}
            </div>
          )}

          {step === 4 && (
            <div>
              <h3 className="text-lg leading-6 font-medium text-gray-900">How much time can you dedicate each week to creating your course?</h3>
              {/* Options for time commitment */}
              {/* ... */}
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          {step > 1 && (
            <button
              onClick={goToPreviousStep}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-300 hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Previous
            </button>
          )}
          {step < 4 && (
            <button
              onClick={goToNextStep}
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Next
            </button>
          )}
          {step === 4 && (
            <button
              // Implement the final submit handler here
              className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Create Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCreationPage;
