import { useRouter } from "next/router";
import { useContext, useState } from "react";
import LanguageDropdown from "../languageToggle/LanguageDropdown";
import Text from "../reusables/Text";
import LoginForm from "./LoginForm";
import LogoLink from './../brand/LogoLink';
import Link from 'next/link'
import { GlobalContext } from "../../context/Provider";



const LoginContent: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {authState} = useContext(GlobalContext)


  return (
    <div className="flex flex-col w-full min-h-full p-10">
        <div className='flex w-full justify-between items-center'>
            <LogoLink />
            <LanguageDropdown />
        </div>
        
        
        {/* Greet Text */}
        <div className='flex flex-col justify-between mt-10 mb-10'>
            <Text type='h2' textEng="Login" textKor="로그인" customStyles="mb-2" />
            <Text type='h4' textEng="What were you thankful for today?" textKor='오들은 무엇이 감사했나요?' customStyles="text-gray-400" />
        </div>

        {/* Actual form fields and content */}
        <LoginForm />


      {/* Links to Register/WhatIsThisSite */}
        <div className='w-full flex flex-wrap mt-5'>
          <Text type='h4' textEng='New to Thankful Notes?' textKor='세로운 유저 인가요?' />
          <Link href='/register'>
            <a><Text type='h4' textEng='Register' textKor='등록' customStyles='text-hotPink ml-2' /></a>
          </Link>
        </div>
        <button onClick={() => console.log(authState)}>TEST CLICK</button>
    </div>
  );
};

export default LoginContent;
