"use client";
import Button from '@/components/button';
import InputField from '@/components/inputField';
import { useRouter } from "next/navigation";
import { register } from '@/lib/authAPI';
import { useState } from 'react';
import Spinner from '@/components/spinner';

export default function RegisterPage() {

    const router = useRouter();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(username, password, confirmPassword){

        setIsLoading(true);
        try {
            console.log(username, password, confirmPassword);
            if (password != confirmPassword) {
                throw new Error("Password and confirm password do not match");
            }

            await register(username, password, confirmPassword);
            router.push("/products");
        }
        catch (e) {
            alert(e);
        }
        finally {
            setIsLoading(false);
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
                <InputField value={username} onChange={(u)=>{setUsername(u)}} placeholder="Enter your username"></InputField>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-black">Password</p>
                <InputField type="password" value={username} onChange={(p)=>{setPassword(p)}} placeholder="Enter your password"></InputField>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-black">Confirm Password</p>
                <InputField type="password" value={username} onChange={(p)=>{setConfirmPassword(p)}} placeholder="Enter the same password"></InputField>
            </div>
            <div className="h-16"></div>
            { isLoading ? <Spinner/> : <Button w={180} text="Register" onClick={()=>{handleRegister(username, password, confirmPassword)}}></Button>}
            <div className="flex flex-row items-center justify-center gap-2">
                <p className="text-black">Already have an account?</p>
                <p className="text-[#5325FB]" onClick={()=>{router.push("/login")}}>Login</p>
            </div>
        </div>
    </div>
  );
};