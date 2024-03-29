import React from 'react'
import Header from '../Header'; // Đường dẫn tương đối đến Header.js
import FooterSection from '../FooterSection';
import SubContainer from './SubContainer'
export default function CoursesPage() {
  return (
    <div className="w-full relative bg-white-97 overflow-hidden flex flex-col items-start justify-start pt-[22px] px-0 pb-0 box-border gap-[158px] tracking-[normal] mq925:gap-[39px_158px] mq1400:gap-[79px_158px]">
      <Header />
      <div className="self-stretch box-border flex flex-row items-start justify-center pt-0 px-5 pb-[50px] max-w-full border-b-[1px] border-solid border-white-90 mq925:gap-[100px_50px] mq450:gap-[100px_25px]">
          <h1 className="m-0 w-[1596px] text-19xl relative text-inherit leading-[150%] font-semibold font-inherit inline-block max-w-full mq925:text-19xl mq925:leading-[58px] mq450:text-10xl mq450:leading-[43px]">
            Online Courses on Design and Development
          </h1>
        </div>
      <section className="self-stretch flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
        <SubContainer />
      </section>
      <FooterSection />
    </div>
  )
}
