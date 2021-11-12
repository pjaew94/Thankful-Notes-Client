import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../context/actions/auth";
import { GlobalContext } from "../../context/Provider";
import FormSubmitButton from "../reusables/FormSubmitButton";
import Text from "./../reusables/Text";
import { loadUser } from './../../context/actions/auth';


export interface ILoginForm {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const { authState,languageState, authDispatch } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginForm>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: ILoginForm) => {

        setIsLoading(true);
        await login(data.email, data.password)(authDispatch);
        await loadUser()(authDispatch)
        setIsLoading(false);


  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-full">

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
            customStyles="text-hotPink ml-1"
          />
        </div>
        <input
          className="px-3 py-2 rounded-md border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-hotPink "
          {...register("email", { required: "Please include your email." })}
          name="email"
          placeholder={languageState.korean ? "유효한 이메일" : "valid email"}
        />
        <Text
          type="label"
          textEng={errors!.email ? errors.email.message! : ""}
          textKor={errors!.email ? errors.email.message! : ""}
          customStyles="text-hotPink"
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
            customStyles="text-hotPink ml-1"
          />
        </div>
        <input
          className="px-3 py-2 rounded-md border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-hotPink"
          {...register("password", {
            required: "Please include your password.",
          })}
          name="password"
          type='password'
          placeholder={
            languageState.korean ? "죄소 8자 이상" : "at least 8 characters"
          }
        />
        <Text
          type="label"
          textEng={errors!.password ? errors.password.message! : ""}
          textKor={errors!.password ? errors.password.message! : ""}
          customStyles="text-hotPink"
        />
      </div>

      {/* Submit button */}
      <FormSubmitButton 
        loading={isLoading}
        value="Login"
      />


    </form>
  );
};

export default LoginForm;
