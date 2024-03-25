import * as React from "react";
export default function Header() {
    return (
        <header className="flex gap-5 justify-between px-16 pt-4 pb-5 w-full text-sm leading-5 border-b border-gray-100 border-solid max-w-[1400px] max-md:flex-wrap max-md:px-5 max-md:max-w-full">
        <div className="flex gap-5 justify-between self-start text-neutral-800">
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/0f45d1307cb97c92a49a0d0c83d9e40a60d2a51e5a3617933dd9a68d96367a87?apiKey=9349475655ee4a448868f824f5feb11d&" alt="Logo" className="shrink-0 w-11 aspect-square" />
          <nav className="flex gap-5 justify-between my-auto">
            <a href="#">Home</a>
            <a href="#">Courses</a>
            <a href="#">About Us</a>
          </nav>
        </div>
        <div className="flex gap-5 justify-between">
          <a href="#" className="my-auto text-neutral-800">Sign Up</a>
          <a href="#" className="justify-center px-6 py-3 text-white whitespace-nowrap bg-black rounded-md max-md:px-5">
            Login
          </a>
        </div>
      </header>
    );
  }