import React from 'react'
import Image from './Image'

export default function SubContainer() {
  return (
    <div className="w-[1596px] rounded-xl bg-absolute-white flex flex-col items-start justify-start py-[50px] pr-12 pl-[50px] box-border gap-[30px] max-w-full text-left text-5xl text-grey-15 font-be-vietnam-pro mq925:gap-[15px_30px] mq925:pt-[21px] mq925:pb-[21px] mq925:box-border mq1400:py-8 mq1400:pr-6 mq1400:pl-[25px] mq1400:box-border">
      <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[50px] max-w-full shrink-0 mq925:gap-[25px]">
        <div className="flex-1 flex flex-col items-start justify-start gap-[10px] min-w-[836px] max-w-full mq1400:min-w-full">
          <div className="self-stretch relative leading-[150%] font-semibold mq450:text-lgi mq450:leading-[29px]">
            Web Design Fundamentals
          </div>
          <div className="self-stretch relative text-lg leading-[150%] text-grey-35">
            Learn the fundamentals of web design, including HTML, CSS, and
            responsive design principles. Develop the skills to create visually
            appealing and user-friendly websites.
          </div>
        </div>
        <div className="flex flex-col items-start justify-start pt-[18.5px] px-0 pb-0">
          <button className="cursor-pointer py-[18px] px-[23px] bg-grey-10 rounded-lg flex flex-row items-start justify-start whitespace-nowrap border-[1px] bg-black border-solid border-black hover:bg-dimgray hover:box-border hover:border-[1px] hover:border-solid hover:border-gainsboro-200">
            <div className="w-28 relative text-lg leading-[150%] font-medium font-be-vietnam-pro text-white-95 text-center inline-block min-w-[112px]">
              View Course
            </div>
          </button>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start justify-start pt-0 px-0 pb-5 box-border gap-[30px] max-w-full shrink-0 text-xl">
        <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[29.94999999999891px] max-w-full">
          <Image/>
          <Image/>
          <Image/>
        </div>
        <div className="self-stretch flex flex-row items-center justify-between gap-[20px] mq925:flex-wrap">
          <div className="flex flex-row items-start justify-start gap-[10px]">
            <button className="cursor-pointer py-2.5 px-[15px] bg-absolute-white rounded-lg flex flex-row items-start justify-start whitespace-nowrap border-[1px] border-solid border-white-95 hover:bg-gainsboro-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-gainsboro-200">
              <div className="relative text-lg font-be-vietnam-pro text-grey-35 text-left inline-block min-w-[75px]">
                4 Weeks
              </div>
            </button>
            <button className="cursor-pointer py-2.5 px-[15px] bg-absolute-white rounded-lg flex flex-row items-start justify-start border-[1px] border-solid border-white-95 hover:bg-gainsboro-100 hover:box-border hover:border-[1px] hover:border-solid hover:border-gainsboro-200">
              <div className="relative text-lg font-be-vietnam-pro text-grey-35 text-left inline-block min-w-[78px]">
                Beginner
              </div>
            </button>
          </div>
          <div className="relative font-medium mq450:text-base">
            By John Smith
          </div>
        </div>
      </div>
      <div className="self-stretch rounded-3xs box-border overflow-hidden flex flex-col items-start justify-start max-w-full shrink-0 text-3xl border-[1px] border-solid border-white-95">
        <div className="self-stretch box-border flex flex-row items-start justify-start py-6 px-[30px] max-w-full border-b-[1px] border-solid border-white-95">
          <div className="flex-1 relative leading-[150%] font-semibold inline-block max-w-full mq450:text-lg mq450:leading-[26px]">
            Curriculum
          </div>
        </div>
        <div className="self-stretch rounded-xl bg-absolute-white flex flex-row flex-wrap items-start justify-between py-[30px] px-[50px] gap-[20px] text-31xl mq1400:pl-[25px] mq1400:pr-[25px] mq1400:box-border">
          <div className="w-[199.2px] flex flex-col items-start justify-start gap-[20px]">
            <div className="h-[37px] relative leading-[150%] font-extrabold inline-block min-w-[58px] mq925:text-21xl mq925:leading-[60px] mq450:text-11xl mq450:leading-[45px]">
              01
            </div>
            <div className="self-stretch relative text-lg leading-[150%] font-medium text-grey-20">
              Introduction to HTML
            </div>
          </div>
          <div className="h-28 w-px relative box-border border-r-[1px] border-solid border-white-95 mq1400:w-full mq1400:h-px" />
          <div className="w-[199.2px] flex flex-col items-start justify-start gap-[20px]">
            <div className="h-[37px] relative leading-[150%] font-extrabold inline-block min-w-[69px] mq925:text-21xl mq925:leading-[60px] mq450:text-11xl mq450:leading-[45px]">
              02
            </div>
            <div className="self-stretch relative text-lg leading-[150%] font-medium text-grey-20">
              Styling with CSS
            </div>
          </div>
          <div className="h-28 w-px relative box-border border-r-[1px] border-solid border-white-95 mq1400:w-full mq1400:h-px" />
          <div className="w-[199.2px] flex flex-col items-start justify-start gap-[20px]">
            <div className="h-[37px] relative leading-[150%] font-extrabold inline-block min-w-[70px] mq925:text-21xl mq925:leading-[60px] mq450:text-11xl mq450:leading-[45px]">
              03
            </div>
            <div className="self-stretch relative text-lg leading-[150%] font-medium text-grey-20">
              Introduction to Responsive Design
            </div>
          </div>
          <div className="h-28 w-px relative box-border border-r-[1px] border-solid border-white-95 mq1400:w-full mq1400:h-px" />
          <div className="w-[199.2px] flex flex-col items-start justify-start gap-[20px]">
            <div className="h-[37px] relative leading-[150%] font-extrabold inline-block min-w-[72px] mq925:text-21xl mq925:leading-[60px] mq450:text-11xl mq450:leading-[45px]">
              04
            </div>
            <div className="self-stretch relative text-lg leading-[150%] font-medium text-grey-20">
              Design Principles for Web
            </div>
          </div>
          
        </div>
      </div>
    </div>
  )
}
