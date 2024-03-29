import React from 'react'

export default function FooterSection() {
  return (
    <footer className="self-stretch bg-absolute-white flex flex-col items-center justify-start pt-[100px] px-5 pb-[29px] box-border gap-[50px] max-w-full text-left text-lg text-grey-15 font-be-vietnam-pro mq925:gap-[25px_50px]">
      <div className="w-[1596px] flex flex-row items-start justify-between max-w-full gap-[20px] mq1400:flex-wrap">
        <div className="w-[392px] flex flex-col items-start justify-start gap-[40px] min-w-[392px] max-w-full mq925:min-w-full mq450:gap-[20px_40px] mq1400:flex-1">
          <img
            className="w-[54px] h-[54px] relative rounded-lg overflow-hidden shrink-0"
            loading="lazy"
            alt=""
            src="/logo.png"
          />
          <div className="self-stretch flex flex-row flex-wrap items-start justify-start py-0 pr-[149px] pl-0 box-border gap-[20px] min-h-[74px] mq925:pr-[74px] mq925:box-border mq450:pr-5 mq450:box-border">
            <div className="h-[27px] rounded-md flex flex-row items-center justify-start gap-[6px]">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/mailicon.svg"
              />
              <div className="relative leading-[150%] whitespace-nowrap">
                hello@skillbridge.com
              </div>
            </div>
            <div className="h-[27px] rounded-md flex flex-row items-center justify-start gap-[6px]">
              <img
                className="h-6 w-6 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/mapicon.svg"
              />
              <div className="relative leading-[150%]">
                Somewhere in the World
              </div>
            </div>
          </div>
        </div>
        <div className="w-[807px] flex flex-row items-start justify-start gap-[30px] max-w-full text-xl mq925:flex-wrap">
          <div className="flex-1 flex flex-col items-start justify-start gap-[14px] min-w-[187px]">
            <div className="self-stretch relative leading-[150%] font-semibold mq450:text-base mq450:leading-[24px]">
              Home
            </div>
            <div className="self-stretch flex flex-col items-start justify-start text-lg text-grey-35">
              <div className="self-stretch relative leading-[150%]">
                Our Courses
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[14px] min-w-[187px]">
            <div className="self-stretch relative leading-[150%] font-semibold mq450:text-base mq450:leading-[24px]">
              About Us
            </div>
            <div className="self-stretch flex flex-col items-start justify-start text-lg text-grey-35">
              <div className="self-stretch relative leading-[150%]">
                Our Goals
              </div>
            </div>
          </div>
          <div className="flex-1 flex flex-col items-start justify-start gap-[14px] min-w-[187px]">
            <div className="self-stretch relative leading-[150%] font-semibold mq450:text-base mq450:leading-[24px]">
              Social Profiles
            </div>
            <div className="w-[184px] h-[52px] flex flex-row items-start justify-start gap-[14px]">
              <button className="self-stretch flex-1 rounded-lg bg-white-97 flex flex-col items-start justify-start py-3.5 px-[13px] border-[1px] border-solid border-white-95">
                <img
                  className="w-6 h-6 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/fbicon.svg"
                />
              </button>
              <button className="self-stretch flex-1 rounded-lg bg-white-97 flex flex-col items-start justify-start py-3.5 px-[13px] border-[1px] border-solid border-white-95">
                <img
                  className="w-6 h-6 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/twittericon.svg"
                />
              </button>
              <button className="self-stretch flex-1 rounded-lg bg-white-97 flex flex-col items-start justify-start py-3.5 px-[13px] border-[1px] border-solid border-white-95">
                <img
                  className="w-6 h-6 relative overflow-hidden shrink-0"
                  loading="lazy"
                  alt=""
                  src="/linkin.svg"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="w-[1596px] h-px relative box-border max-w-full border-t-[1px] border-solid border-white-95" />
    </footer>
  )
}
