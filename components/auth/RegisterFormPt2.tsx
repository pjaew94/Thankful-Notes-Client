import Text from "./../reusables/Text";
import Button from "./../reusables/Button";
import { IRegisterFormPt } from "./RegisterFormPt1";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState, useContext } from "react";
import FormSubmitButton from "./../reusables/FormSubmitButton";
import { GlobalContext } from "./../../context/Provider";
import { secondStepRegistrationCheckPoint } from "./../../context/actions/auth";

export interface IRegisterFormData2 {
  username: string;
  email: string;
  password: string;
  repeat_password: string;
}

const RegisterFormPt2: React.FC<IRegisterFormPt> = ({
  setStep,
  data,
  setData,
  languageState,
}) => {
  const { authDispatch } = useContext(GlobalContext);

  const [isLoading, setIsLoading] = useState(false);


  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IRegisterFormData2>();

  useEffect(() => {
    if (data.username && data.email) {
      setValue("username", data.username);
      setValue("email", data.email);
    }


  }, [data.email, data.username, setValue]);

  const onSubmit:SubmitHandler<IRegisterFormData2> = async (formData, e) => {
    e?.preventDefault();
    setIsLoading(true);
    const { username, email, password, repeat_password } = formData;
    try {
      const res = await secondStepRegistrationCheckPoint(formData)(authDispatch);
      if(res === "success") {
        setData({ ...data, username, email, password, repeat_password });
        setStep(3)
      }
      setIsLoading(false)
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Username Input */}
      <div className="flex flex-col w-full mb-6">
        <div className="flex mb-2">
          <Text
            type="label"
            textEng="Username"
            textKor="유저네임"
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
          {...register("username", {
            required: "Username must be unique.",
          })}
          name="username"
          placeholder={languageState.korean ? "BestThanker" : "PrisonMike"}
        />
        <Text
          type="p"
          textEng={errors!.username ? errors.username.message! : ""}
          textKor={errors!.username ? errors.username.message! : ""}
          customStyles="text-hotPink"
        />
      </div>

      {/* Email Name Input */}
      <div>
        <div className="flex flex-col w-full mb-6">
          <div className="flex mb-2">
            <Text
              type="label"
              textEng="Email"
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
            {...register("email", {
              required: "Please include your email.",
            })}
            name="email"
            placeholder={
              languageState.korean
                ? "example@thankfulnotes.com"
                : "example@thankfulnotes.com"
            }
          />
          <Text
            type="p"
            textEng={errors!.email ? errors.email.message! : ""}
            textKor={errors!.email ? errors.email.message! : ""}
            customStyles="text-hotPink"
          />
        </div>
      </div>

      {/* Password Input */}
      <div className="flex flex-col w-full mb-6">
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
        type="password"
          className="px-3 py-2 rounded-md border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-hotPink "
          {...register("password", {
            required:
              "Password must be 6 to 30 characters with at least one capital, one lowercase, and one number.",
          })}
          name="password"
          placeholder={
            languageState.korean ? "비밀번호" : "hard to guess password"
          }
        />
        <Text
          type="p"
          textEng={errors!.password ? errors.password.message! : ""}
          textKor={errors!.password ? errors.password.message! : ""}
          customStyles="text-hotPink"
        />
      </div>

      {/* Password Repeat Input */}
      <div className="flex flex-col w-full mb-14">
        <div className="flex mb-2">
          <Text
            type="label"
            textEng="Re-enter Password"
            textKor="비밀번호를 다시 입력하세요 "
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
        type="password"
          className=" px-3 py-2 rounded-md border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-hotPink "
          {...register("repeat_password", {
            required: "Must match your password.",
          })}
          name="repeat_password"
          placeholder={
            languageState.korean ? "비밀번호" : "hard to guess password"
          }
        />
        <Text
          type="p"
          textEng={
            errors!.repeat_password ? errors.repeat_password.message! : ""
          }
          textKor={
            errors!.repeat_password ? errors.repeat_password.message! : ""
          }
          customStyles="text-hotPink"
        />
      </div>

      <div className="flex w-full justify-between">
        <Button
          onClick={() => setStep(1)}
          textEng="Prev"
          textKor="이전"
          customStyles="w-5/12 bg-white border border-black"
          disabled={isLoading}
        />
        <FormSubmitButton
          loading={isLoading}
          textEng="Next"
          textKor="다음"
          customStyles="w-5/12 bg-white"
        />
      </div>
    </form>
  );
};

export default RegisterFormPt2;
