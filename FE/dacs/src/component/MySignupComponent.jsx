import * as React from "react";
import Header from './Header'
import SignUpForm from './SignUpForm'
import Footer from './Footer'

function MyComponent() {
    return (
        <div className="flex flex-col items-center pt-5 bg-neutral-100">
        <div className="shrink-0 max-w-full h-10 bg-black rounded-md w-[1400px]" />
        <Header />
        <main>
          <SignUpForm />
        </main>
        <Footer />
      </div>
    );
  }
  
  export default MyComponent;