import * as React from "react";
export default function SignUpForm() {
    return (
        <section className="flex flex-col p-10 mt-24 max-w-full text-base leading-6 bg-white rounded-xl text-neutral-800 w-[540px] max-md:px-5 max-md:mt-10">
        <h2 className="text-4xl font-semibold text-center max-md:max-w-full">Sign Up</h2>
       
        <form>
          <div className="mt-10 text-left">
            <label htmlFor="firstName" className="font-medium max-md:max-w-full ">Họ</label>
            <input
              type="text"
              id="firstName"
              placeholder="Nhập họ của bạn"
              className="justify-center p-5 mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:max-w-full w-full"
            />
          </div>
          <div className="mt-5 text-left">
            <label htmlFor="lastName" className="font-medium max-md:max-w-full">Tên</label>
            <input
              type="text"
              id="lastName"
              placeholder="Nhập tên của bạn"
              className="justify-center p-5 mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:max-w-full w-full"
            />
          </div>
          <div className="mt-5 text-left">
            <label htmlFor="email" className="font-medium max-md:max-w-full">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your Email"
              className="justify-center p-5 mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:max-w-full w-full"
            />
          </div>
          <div className="mt-5 text-left">
            <label htmlFor="password" className="font-medium max-md:max-w-full">Mật Khẩu</label>
            <div className="flex gap-2.5 p-5 mt-2.5 bg-gray-50 rounded-lg border border-gray-100 border-solid text-stone-500 max-md:flex-wrap">
              <input
                type="password"
                id="password"
                placeholder="Enter your Password"
                className="flex-1 bg-transparent outline-none"
              />
              <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/a8819b1cf48d19a6e95bc57cb5d373ec0162742f3cfe62b7ec31b90b0b48de06?apiKey=9349475655ee4a448868f824f5feb11d&" alt="Eye icon" className="shrink-0 w-6 aspect-square" />
            </div>
          </div>
          <div className="flex gap-2 mt-5 text-stone-500 max-md:flex-wrap">
            <input
              type="checkbox"
              id="terms"
              className="shrink-0 w-6 h-6 border border-gray-100 border-solid fill-neutral-100 stroke-[1px] stroke-gray-100"
            />
            <label htmlFor="terms" className="flex-1 underline max-md:max-w-full">
              I agree with <a href="#" className="underline">Terms of Use</a> and{" "}
              <a href="#" className="underline">Privacy Policy</a>
            </label>
          </div>
          <button
            type="submit"
            className="justify-center px-5 py-3.5 mt-5 text-sm font-medium text-center text-white bg-black rounded-lg max-md:max-w-full w-full"
          >
            Sign Up
          </button>
        </form>
        <div className="flex gap-3 justify-center items-center mt-6 text-sm text-center whitespace-nowrap text-neutral-400 max-md:flex-wrap">
          <hr className="flex-1 shrink-0 self-stretch my-auto h-px border border-solid bg-zinc-200 border-zinc-200" />
          <span className="self-stretch">OR</span>
          <hr className="flex-1 shrink-0 self-stretch my-auto h-px border border-solid bg-zinc-200 border-zinc-200" />
        </div>
        <button className="flex justify-center items-center px-6 py-4 mt-6 text-sm font-medium rounded-lg border border-gray-100 border-solid bg-neutral-100 max-md:px-5 max-md:max-w-full w-full">
          <span className="flex gap-3.5">
            <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/594c1ef681dbaa53ffbe8bad5c1e9959c8a88da1be4e3fcd11a66325aa7fb14c?apiKey=9349475655ee4a448868f824f5feb11d&" alt="Google logo" className="shrink-0 w-6 aspect-square" />
            <span>Sign Up with Google</span>
          </span>
        </button>
        <p className="flex gap-1.5 justify-center px-20 mt-6 text-center max-md:flex-wrap max-md:px-5">
          <span className="underline">Already have an account?</span>{" "}
          <a href="#" className="font-medium underline text-neutral-800">Login</a>
          <img loading="lazy" src="https://cdn.builder.io/api/v1/image/assets/TEMP/52e263b3f77bfff5dc120002e909b75e45aba8be06ea8bd8be14872be77d8f38?apiKey=9349475655ee4a448868f824f5feb11d&" alt="Arrow icon" className="shrink-0 my-auto w-5 aspect-square" />
        </p>
      </section>
    );
  }