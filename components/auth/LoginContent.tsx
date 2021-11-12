import { useRouter } from "next/router";
import { useState } from "react";
import LanguageDropdown from "../languageToggle/LanguageDropdown";
import Text from "../reusables/Text";
import Brand from "../brand/Brand";
import LoginForm from "./LoginForm";



const LoginContent: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);


  return (
    <div className="flex flex-col w-full min-h-full p-10">
        <div className='flex w-full justify-between items-center'>
            <Brand size="small" />
            <LanguageDropdown />
        </div>
        
        
        {/* Greet Text */}
        <div className='flex flex-col justify-between mt-10 mb-10'>
            <Text type='h2' textEng="Login" textKor="로그인" customStyles="mb-2" />
            <Text type='h4' textEng="What were you thankful for today?" textKor='오들은 무엇이 감사했나요?' customStyles="text-gray-400" />
        </div>

        {/* Actual form fields and content */}
        <LoginForm />

      {/* Submit */}


      {/* Links to Register/WhatIsThisSite */}
    </div>
  );
};

export default LoginContent;
