import React from 'react'
import Header from './Header'
import FooterSection from './FooterSection'
import Button from './Button'
import Checkbox from './CheckBox'

export default function LoginPageWithEmail() {
  return (
    <div className="w-full relative bg-white-97 overflow-hidden flex flex-col items-start justify-start pt-5 px-0 pb-0 box-border gap-[94px] tracking-[normal] mq925:gap-[23px_94px] mq1400:gap-[47px_94px]">
    <main className="self-stretch flex flex-row items-start justify-start py-0 px-[30px] box-border max-w-full">
      <section className="flex-1 flex flex-col items-end justify-start gap-[62px] max-w-full text-center text-[48px] text-grey-15 font-be-vietnam-pro mq925:gap-[31px_62px] mq450:gap-[15px_62px]">
        <Header />
        <div className="w-[1824px] flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
          <div className="w-[660px] rounded-xl bg-absolute-white flex flex-col items-start justify-start pt-[57.5px] px-[50px] pb-[103px] box-border gap-[57.5px] max-w-full mq925:gap-[29px_57.5px] mq925:pt-6 mq925:px-[25px] mq925:pb-11 mq925:box-border mq1400:pt-[37px] mq1400:pb-[67px] mq1400:box-border">
            <h1 className="m-0 self-stretch relative text-inherit font-semibold font-inherit mq925:text-[38px] mq450:text-[29px]">
              Login
            </h1>
            <div className="self-stretch flex flex-col items-start justify-start gap-[30px] max-w-full text-lg">
              <div className="self-stretch flex flex-col items-start justify-start gap-[24px] max-w-full text-left">
                <div className="self-stretch flex flex-col items-start justify-start gap-[14px] max-w-full">
                  <div className="self-stretch relative leading-[150%] font-medium">
                    Email
                  </div>
                  <div className="self-stretch rounded-3xs bg-white-99 box-border flex flex-row items-center justify-start py-6 px-[23px] max-w-full border-[1px] border-solid border-white-95">
                    <input
                      className="w-full [border:none] [outline:none] font-be-vietnam-pro text-lg bg-[transparent] h-[27px] flex-1 relative leading-[150%] text-grey-40 text-left inline-block min-w-[250px] max-w-full p-0"
                      placeholder="Enter your Email"
                      type="text"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[14px] max-w-full">
                  <div className="self-stretch relative leading-[150%] font-medium">
                    Password
                  </div>
                  <div className="self-stretch rounded-3xs bg-white-99 box-border flex flex-row items-center justify-start py-6 px-[23px] gap-[10px] max-w-full text-grey-40 border-[1px] border-solid border-white-95">
                    <input
                      className="w-full [border:none] [outline:none] font-be-vietnam-pro text-lg bg-[transparent] h-[27px] flex-1 relative leading-[150%] text-grey-40 text-left inline-block min-w-[250px] max-w-full p-0"
                      placeholder="Enter your Password"
                      type="text"
                    />
                    <button><img
                      className="h-6 w-6 relative overflow-hidden shrink-0"
                      alt=""
                      src="/eye-svgrepo-com.svg"
                    />  </button>
                  </div>
                  <button className="self-stretch relative leading-[150%] text-grey-30 text-right">
                    Forgot Password?
                  </button>
                </div>
                <div className="self-stretch flex flex-row flex-wrap items-center justify-start gap-[10px] max-w-full text-grey-40">
                  {/* <img
                    className="h-[30px] w-[30px] relative rounded overflow-hidden shrink-0 min-h-[30px]"
                    loading="lazy"
                    alt=""
                    src="/check-box.svg"
                  /> Tạo check box bằng hình ảnh !*/}
                  <Checkbox className="h-[120px] w-[120px] relative rounded overflow-hidden shrink-0 min-h-[30px]" />
                  <div className="flex-1 relative leading-[150%] inline-block min-w-[98px] max-w-full">
                    Remember Me
                  </div>
                </div>
                <button className="cursor-pointer [border:none] py-[18px] px-5 bg-black self-stretch rounded-3xs flex flex-row items-center justify-start box-border max-w-full hover:bg-darkslategray">
                  <div className="flex-1 relative text-lg leading-[150%] font-medium font-be-vietnam-pro text-absolute-white text-center inline-block max-w-full">
                    Login
                  </div>
                </button>
              </div>
              <div className="self-stretch flex flex-row flex-wrap items-end justify-start gap-[12px] text-grey-60 font-inter">
                <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[12.5px] box-border min-w-[166px]">
                  <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-white-90" />
                </div>
                <div className="w-[26px] relative leading-[150%] flex items-center justify-center min-w-[26px]">
                  OR
                </div>
                <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[12.5px] box-border min-w-[166px]">
                  <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-white-90" />
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start justify-start gap-[33px] mq925:gap-[16px_33px]">
                <div className="self-stretch flex flex-col items-start justify-start gap-[30px]">
                  <Button inputFieldPassword="Login with Google" heroiconsOutlinedevicePho="/google-color-svgrepo-com.svg"></Button>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
                    <Button inputFieldPassword="Login with FaceBook" heroiconsOutlinedevicePho="/facebook-svgrepo-com.svg" />
                    <Button inputFieldPassword="Login with GitHub" heroiconsOutlinedevicePho="github-svgrepo-com.svg" />
                  </div>
                </div>
                <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
                  <div className="w-[309px] flex flex-row items-start justify-start gap-[6px]">
                    <div className="flex-1 relative leading-[150%]">
                      <span>{`Don’t have an account? `}</span>
                      <span className="[text-decoration:underline] font-medium">
                        Sign Up
                      </span>
                    </div>
                    <div className="h-[25.5px] flex flex-col items-start justify-start pt-[1.5px] px-0 pb-0 box-border">
                      <img
                        className="w-6 h-6 relative overflow-hidden shrink-0"
                        loading="lazy"
                        alt=""
                        src="/diagonal-arrow-right-up-outline-svgrepo-com.svg"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <FooterSection />
  </div>
  )
}
