import React from 'react'

export default function Lesson() {
  return (
    <div className="self-stretch rounded-lg box-border flex flex-row items-center justify-start py-6 px-[29px] gap-[6px] max-w-full border-[1px] border-solid border-white-95 mq925:flex-wrap">
              <div className="flex-1 flex flex-col items-start justify-center gap-[6px] min-w-[302px] max-w-full">
                <div className="self-stretch relative leading-[150%] font-medium mq450:text-base mq450:leading-[24px]">
                  The Role of UI/UX Design in Product Development
                </div>
                <div className="self-stretch relative text-lg leading-[150%] text-grey-35">
                  Lesson 02
                </div>
              </div>
              <button className="cursor-pointer [border:none] py-3 px-3.5 bg-white-97 h-12 rounded-md flex flex-row items-start justify-start box-border gap-[4px] whitespace-nowrap hover:bg-gainsboro-100">
                <img
                  className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                  alt=""
                  src="/time.svg"
                />
                <div className="relative text-lg font-be-vietnam-pro text-grey-35 text-left inline-block min-w-[53px]">
                  1 Hour
                </div>
              </button>
    </div>
  )
}
