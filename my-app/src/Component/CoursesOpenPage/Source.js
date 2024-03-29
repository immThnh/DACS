import React from 'react'
import Lesson from './Lesson'

export default function Source() {
  return (
    <div className="flex-1 rounded-xl bg-absolute-white flex flex-col items-end justify-start p-[50px] box-border gap-[50px] min-w-[587px] max-w-full mq925:py-8 mq925:px-[25px] mq925:box-border mq925:min-w-full mq450:gap-[25px_50px]">
          <b className="self-stretch h-[59px] relative leading-[24px] inline-block text-grey-15 text-right mq925:text-21xl mq925:leading-[14px] mq450:text-5xl mq450:leading-[10px]">
            01
          </b>
          <div className="self-stretch relative text-5xl tracking-[-0.01em] leading-[150%] font-semibold mq450:text-lgi mq450:leading-[29px]">
            Introduction to UI/UX Design
          </div>
          <div className="self-stretch flex flex-col items-start justify-start gap-[20px] max-w-full text-xl">
          <Lesson />
          <Lesson />
          <Lesson />  
          </div>
          
    </div>
  )
}
