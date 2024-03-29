import React from 'react'

export default function Header() {
  return (
    <div className="self-stretch h-[151px] flex flex-col items-center justify-start top-[0] z-[99] sticky max-w-full text-left text-lg text-grey-15 font-be-vietnam-pro">
      <header className="self-stretch h-[52px] rounded-lg bg-black" />
      <div className="self-stretch flex-1 box-border flex flex-row items-center justify-between pt-5 px-[132px] pb-6 max-w-full gap-[20px] border-b-[1px] border-solid border-white-95 mq925:pl-[66px] mq925:pr-[66px] mq925:box-border mq450:pl-5 mq450:pr-5 mq450:box-border">
        <div className="self-stretch flex flex-row items-center justify-start gap-[50px] max-w-full mq450:gap-[50px_25px]">
          <img
            className="h-[54px] w-[54px] relative rounded-lg overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/logo.png"
          />
          <div className="flex flex-row items-center justify-start gap-[26px] mq1875:hidden">
            <button className="relative leading-[150%] inline-block min-w-[52px] whitespace-nowrap">
              Home
            </button>
            <button className="relative leading-[150%] inline-block min-w-[72px] whitespace-nowrap">
              Courses
            </button>
            <button className="relative leading-[150%] inline-block min-w-[81px] whitespace-nowrap">
              About Us
            </button>
          </div>
        </div>
        <div className="flex flex-row items-center justify-start gap-[30px] mq1400:hidden">
          <button className="relative leading-[150%] inline-block min-w-[67px] whitespace-nowrap">
            Sign Up
          </button>
          <button className="cursor-pointer [border:none] py-3.5 px-[34px] bg-black rounded-lg flex flex-row items-center justify-start hover:bg-darkslategray">
            <div className="relative text-lg leading-[150%] font-be-vietnam-pro text-absolute-white text-left inline-block min-w-[49px] whitespace-nowrap">
              Login
            </div>
          </button>
        </div>
      </div>
    </div>
  )
}

