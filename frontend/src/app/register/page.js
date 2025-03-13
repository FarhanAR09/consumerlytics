"use client";
import Button from '@/components/button';
import InputField from '@/components/inputField';
import { useRouter } from "next/navigation";

export default function RegisterPage() {

    const router = useRouter();

    let username = "";
    let password = "";
    let confirmPassword = "";

    function handleRegister(password, confirmPassword) {
        if (password !== confirmPassword) {
            alert("Password doesn't match");
        }
    }

  return (
    <div className="h-screen w-screen flex flex-row bg-gradient-to-l from-[#83C3EC] to-[#306AFF]">
        <div className="flex-1 h-full">
            <img src="/images/loginImage.png" alt="Sample" className="w-full h-full object-cover"/>
        </div>
        <div className="flex-1 h-full flex flex-col items-center justify-center gap-2">
            <p className="font-bold text-[24px] text-black">Register</p>
            <img width={64} height={64} src="globe.svg"></img>
            <div className="flex flex-col gap-2">
                <p className="text-black">Username</p>
                <InputField value={username} onChange={(u)=>{username=u}} placeholder="Enter your username"></InputField>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-black">Password</p>
                <InputField type="password" value={username} onChange={(p)=>{password=p}} placeholder="Enter your password"></InputField>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-black">Confirm Password</p>
                <InputField type="password" value={username} onChange={(p)=>{confirmPassword=p}} placeholder="Enter the same password"></InputField>
            </div>
            <div className="h-16"></div>
            <Button w={180} text="Register" onClick={()=>{handleRegister(password, confirmPassword)}}></Button>
            <div className="flex flex-row items-center justify-center gap-2">
                <p className="text-black">Already have an account?</p>
                <p className="text-[#5325FB]" onClick={()=>{router.push("/login")}}>Login</p>
            </div>
        </div>
    </div>
  );
};