import { NextPage } from "next";
import LogoLink from "./../components/brand/LogoLink";
import LanguageDropdown from "./../components/languageToggle/LanguageDropdown";
import Text from "./../components/reusables/Text";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";

import RegisterProgressBar from "../components/auth/RegisterProgressBar";
import RegisterFormPt1 from "../components/auth/RegisterFormPt1";
import RegisterFormPt2 from "./../components/auth/RegisterFormPt2";
import RegisterFormPt3 from "./../components/auth/RegisterFormPt3";
import { GlobalContext } from "../context/Provider";
import AuthWarning from "./../components/warnings/AuthWarning";
import { loadUser, register } from "../context/actions/auth";
import { useRouter } from "next/router";

export interface IData {
  username: string | null;
  first_name: string | null;
  last_name: string | null;
  age: number | null;
  email: string | null;
  password: string | null;
  repeat_password: string | null;
  unique_group_name: string | null;
}

const Register: NextPage = () => {

  const router = useRouter();

  const [step, setStep] = useState(1);
  const [data, setData] = useState<IData>({
    username: null,
    first_name: null,
    last_name: null,
    age: null,
    email: null,
    password: null,
    repeat_password: null,
    unique_group_name: null,
  });

  const { languageState, authState, authDispatch } = useContext(GlobalContext);

  const registerUser = async () => {

     const res = await register(data)(authDispatch)

     if(res === "success"){
        loadUser()(authDispatch)
     }
  }

  useEffect(() => {
    loadUser()(authDispatch)
    if(authState?.isAuthenticated) {
      router.push('/dashboard')
    }
  }, [authState, router, authDispatch])

  return (
    <div className="flex flex-col w-screen min-h-screen p-10 md:bg-pink md:justify-center md:items-center">
      {authState?.error && <AuthWarning />}
      <div className=" w-full md:w-3/4 md:max-w-lg relative">
        {/* Logo and Language Dropdown */}
        <div className="flex w-full justify-between items-center md:justify-center">
          <LogoLink />
          <LanguageDropdown customStyles="absolute right-0 top-0" />
        </div>

        {/* Greet Text and FORMS container */}
        <div className="flex flex-col w-full md:items-center md:bg-white md:px-10 md:py-10 md:rounded-lg md:my-10 md:shadow-lg">
          {/* Greet */}
          <div className="flex flex-col justify-between mt-10 mb-5 md:items-center">
            <Text
              type="h2"
              textEng="Thankful.Note"
              textKor="감사노트"
              customStyles="mb-2"
            />
            <Text
              type="h4"
              textEng="Let's change our perspectives to magnify the brighter parts of our days!"
              textKor="우리의 관점을 바꾸워 내 삶을 변화시키는 하나님의 선물을 받자!"
              customStyles="text-gray-400"
            />
          </div>

          <RegisterProgressBar setStep={setStep} step={step} />

          {step === 1 ? (
            <RegisterFormPt1
              setData={setData}
              data={data}
              setStep={setStep}
              languageState={languageState}
            />
          ) : step === 2 ? (
            <RegisterFormPt2
              setData={setData}
              data={data}
              setStep={setStep}
              languageState={languageState}
            />
          ) : (
            <RegisterFormPt3
              setData={setData}
              data={data}
              setStep={setStep}
              languageState={languageState}
              registerUser={registerUser}
            />
          )}
        </div>

        {/* Link to Login if already user */}
        <div className="w-full flex flex-wrap mt-2 justify-center">
          <Text
            type="h4"
            textEng="Already a member?"
            textKor="세로운 유저 인가요?"
          />
          <Link href="/login">
            <a>
              <Text
                type="h4"
                textEng="Login"
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

export default Register;
