import React from 'react'
import Header from '../Header'; // Đường dẫn tương đối đến Header.js
import FooterSection from '../FooterSection';
import Container from './Container'
import Source from './Source';
export default function CoursesOpenPage() {
  return (
    <div className="w-full relative bg-white-97 overflow-hidden flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border gap-[100px] tracking-[normal] text-left text-[48px] text-grey-15 font-be-vietnam-pro mq925:gap-[25px_100px] mq1400:gap-[50px_100px]">
      <Header />
      <div className="self-stretch flex flex-row items-start justify-start py-0 px-[30px] box-border max-w-full">
        <div className="flex-1 box-border flex flex-row items-start justify-between pt-0 px-[132px] pb-[50px] max-w-full gap-[20px] border-b-[1px] border-solid border-white-90 mq925:pl-[33px] mq925:pr-[33px] mq925:box-border mq1400:pl-[66px] mq1400:pr-[66px] mq1400:box-border mq1875:flex-wrap">
          <div className="w-[748px] flex flex-col items-start justify-start pt-[18px] px-0 pb-0 box-border max-w-full">
            <h1 className="m-0 self-stretch relative text-inherit leading-[150%] font-semibold font-inherit mq925:text-[38px] mq925:leading-[58px] mq450:text-[29px] mq450:leading-[43px]">
              UI/UX Design Course
            </h1>
          </div>
          <div className="w-[748px] relative text-lg leading-[150%] text-grey-35 inline-block max-w-full">
            Welcome to our UI/UX Design course! This comprehensive program will
            equip you with the knowledge and skills to create exceptional user
            interfaces (UI) and enhance user experiences (UX). Dive into the
            world of design thinking, wireframing, prototyping, and usability
            testing. Below is an overview of the curriculum
          </div>
        </div>
      </div>
      <main className="self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-36 box-border max-w-full mq925:pb-10 mq925:box-border mq450:pb-[26px] mq450:box-border mq1400:pb-[61px] mq1400:box-border">
        <section className="h-[2984px] w-[1596px] flex flex-col items-start justify-start gap-[100px] max-w-full mq925:gap-[50px_100px] mq450:gap-[25px_100px] mq1400:h-auto">
           <div className="w-[1628px] h-[822px] rounded-xl [background:linear-gradient(rgba(0,_0,_0,_0.2),_rgba(0,_0,_0,_0.2)),_#c4c4c4] box-border overflow-hidden shrink-0 flex flex-row items-start justify-start py-[359px] px-[762px] max-w-[102%] border-[16px] border-solid border-white-97 mq925:py-[233px] mq925:px-[190px] mq925:box-border mq450:py-[151px] mq450:px-5 mq450:box-border mq1400:pl-[381px] mq1400:pr-[381px] mq1400:box-border">
            <div className="h-[72px] w-[72px] rounded-[68px] bg-gray-200 box-border flex flex-row items-start justify-start py-3.5 px-2 border-[6px] border-solid border-gray-100">
              <img
                className="h-11 w-11 relative overflow-hidden shrink-0"
                loading="lazy"
                alt=""
                src="/logo.png"
              />
            </div>
          </div> 
          {/* <Container /> */}
          <div className="self-stretch flex flex-col items-start justify-start gap-[30px] max-w-full shrink-0 text-left text-61xl text-grey-20 font-be-vietnam-pro">
            <div className="self-stretch flex flex-row flex-wrap items-start justify-start gap-[30px] max-w-full">
                <Source />
                <Source />
                <Source />
                <Source />
                <Source />
            </div>
          </div>
        </section>
      </main>
      <FooterSection />
    </div>
  )
}
