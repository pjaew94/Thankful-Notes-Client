import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../context/actions/auth";
import { GlobalContext } from "../../context/Provider";
import FormSubmitButton from "../reusables/FormSubmitButton";
import Text from "./../reusables/Text";
import { loadUser } from "./../../context/actions/auth";
import { useRouter } from "next/router";
import {  getTodaysMessage } from './../../context/actions/todaysMessage';

export interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { authState, languageState, authDispatch } = useContext(GlobalContext);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginForm>();

  const [isLoading, setIsLoading ] = useState(false);

  useEffect(() => {
    if (authState!.error) {
      setIsLoading(false);
      reset();
    }
  }, [authState, reset]);

  const onSubmit = async (data: ILoginForm) => {
    setIsLoading(true);
    await login(data.email, data.password)(authDispatch);
    await loadUser()(authDispatch);
  
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full md:items-center md:bg-white md:px-10 md:py-10 md:rounded-lg md:my-10 md:shadow-lg">
      {/* Greet Text */}
      <div className="flex flex-col justify-between mt-10 mb-10 md:items-center">
        <Text
          type="h2"
          textEng="Welcome Back"
          textKor="로그인"
          customStyles="mb-2"
        />
        <Text
          type="h4"
          textEng="What were you thankful for today?"
          textKor="오들은 무엇이 감사했나요?"
          customStyles="text-gray-400"
        />
      </div>

      {/* Email Input */}
      <div className="flex flex-col w-full mb-6">
        <div className="flex mb-2">
          <Text
            type="label"
            textEng="Your Email"
            textKor="이메일"
            customStyles="text-gray-500"
          />
          <Text
            type="label"
            textEng="*"
            textKor="*"
            customStyles="text-red-400 ml-1"
          />
        </div>
        <input
          className="px-3 py-2 border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black "
          {...register("email", { required: "Please include your email." })}
          name="email"
          placeholder={languageState.korean ? "유효한 이메일" : "valid email"}
        />
        <Text
          type="label"
          textEng={errors!.email ? errors.email.message! : ""}
          textKor={errors!.email ? errors.email.message! : ""}
          customStyles="text-red-400"
        />
      </div>
      {/* Password Input */}
      <div className="flex flex-col w-full mb-14">
        <div className="flex mb-2">
          <Text
            type="label"
            textEng="Password"
            textKor="비밀번호"
            customStyles="text-gray-500"
          />
          <Text
            type="label"
            textEng="*"
            textKor="*"
            customStyles="text-red-400 ml-1"
          />
        </div>
        <input
          className="px-3 py-2  border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black"
          {...register("password", {
            required: "Please include your password.",
          })}
          name="password"
          type="password"
          placeholder={
            languageState.korean ? "죄소 8자 이상" : "at least 8 characters"
          }
        />
        <Text
          type="label"
          textEng={errors!.password ? errors.password.message! : ""}
          textKor={errors!.password ? errors.password.message! : ""}
          customStyles="text-red-400"
        />
      </div>

      {/* Submit button */}
      <FormSubmitButton loading={isLoading} textEng='Login' textKor='로그인' black={true} />
    </form>
  );
};

export default LoginForm;
