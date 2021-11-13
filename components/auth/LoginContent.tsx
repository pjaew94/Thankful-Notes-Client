import { useRouter } from "next/router";
import LanguageDropdown from "../languageToggle/LanguageDropdown";
import Text from "../reusables/Text";
import LoginForm from "./LoginForm";
import LogoLink from "./../brand/LogoLink";
import Link from "next/link";
import { useEffect } from "react";

const LoginContent: React.FC = () => {
  const router = useRouter();

  useEffect(() => {});

  return (
    <div className="flex flex-col w-full min-h-full p-10 md:justify-center md:items-center md:bg-pink">
      <div className='relative w-full md:w-3/4 md:max-w-lg'>
        <div className="flex w-full justify-between items-center md:justify-center">
          <LogoLink />
          <LanguageDropdown customStyles="absolute right-0 top-0" />
        </div>

        {/* Actual form fields and content */}
        <LoginForm />

        {/* Links to Register/WhatIsThisSite */}
        <div className="w-full flex flex-wrap mt-5 md:justify-center">
          <Text
            type="h4"
            textEng="New to Thankful Notes?"
            textKor="세로운 유저 인가요?"
          />
          <Link href="/register">
            <a>
              <Text
                type="h4"
                textEng="Register"
                textKor="등록"
                customStyles="text-hotPink ml-2"
              />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginContent;
