"use client";
import './globals.css';
import Button from '@/components/button';
import { useRouter } from "next/navigation";

export default function LandingPage() {

  const router = useRouter();

  return (
    <div className="h-screen w-screen flex flex-col bg-gradient-to-l from-[#83C3EC] to-[#306AFF]">
      <div className="absolute top-0 left-0 p-4 flex items-center gap-4">
        <img src="/globe.svg" alt="Sample" className="w-16 h-16"/>
        <div className="flex flex-col">
          <p className="text-[16px] font-semibold text-black">Consumerlytics</p>
          <p className="text-[12px] font-normal text-black">Analyze your Market!</p>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center w-full min-h-screen p-32">
        {/*Panel*/}
        <div className="h-full flex-1 flex flex-row items-start justify-center bg-gradient-to-b from-[#42EFFC] to-[#3CAEFF] rounded-3xl p-16 gap-4">
          {/*Left Content*/}
          <div className="h-full flex flex-3 flex-col justify-center items-start gap-4">
            <p className="text-3xl font-semibold text-black">
              The Ultimate Site for Market AI Analysis
            </p>
            <p className="text-m font-default text-black">
              dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"
            </p>
            <div className="flex flex-row items-start gap-4">
              <Button text="Get Started Now" onClick={() => {router.push("/register")}} variant="primary" w={300}></Button>
              <Button text="Already have account? Login" onClick={() => {router.push("/login")}} variant="primary" w={300}></Button>
            </div>
          </div>
          {/*Right Content*/}
          <div className="flex-2 h-full"></div>
        </div>
      </div>
    </div>
  );
}