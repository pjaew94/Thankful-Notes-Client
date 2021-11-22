import Text from "./../reusables/Text";
import { useForm } from "react-hook-form";
import { Dispatch, SetStateAction, useEffect } from "react";
import { ILanguageState } from "../../context/types";
import { IData } from "../../pages/register";
import FormSubmitButton from "./../reusables/FormSubmitButton";
import { useState } from "react";

export interface IRegisterFormPt {
  setStep: Dispatch<SetStateAction<number>>;
  setData: Dispatch<SetStateAction<IData>>;
  languageState: ILanguageState;
  data: IData;
}

interface IRegisterFormData {
  first_name: string;
  last_name: string;
  age: number;
}

const RegisterFormPt1: React.FC<IRegisterFormPt> = ({
  setStep,
  languageState,
  setData,
  data,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<IRegisterFormData>();

  useEffect(() => {
    if (data.first_name && data.last_name && data.age) {
      setValue("first_name", data.first_name);
      setValue("last_name", data.last_name);
      setValue("age", data.age);
    }
  }, []);

  const onSubmit = (formData: IRegisterFormData) => {
    const { first_name, last_name, age } = formData;
    setIsLoading(true);
    if (errors.first_name || errors.last_name || errors.age) {
      setIsLoading(false); 
    } else {
      setData({ ...data, first_name, last_name, age });
      setStep(2);
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='w-full md:min-h-[300px]'>
      {/* First Name Input */}
      <div className="flex flex-col w-full mb-6">
        <div className="flex mb-2">
          <Text
            type="label"
            textEng="First Name"
            textKor="이름"
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
          className="px-3 py-2  border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black "
          {...register("first_name", {
            required: "Please include your first name.",
          })}
          name="first_name"
          placeholder={languageState.korean ? "마이클" : "Michael"}
        />
        <Text
          type="p"
          textEng={errors!.first_name ? errors.first_name.message! : ""}
          textKor={errors!.first_name ? errors.first_name.message! : ""}
          customStyles="text-black"
        />
      </div>

      {/* Last Name Input */}
      <div className="flex flex-col w-full mb-6">
        <div className="flex mb-2">
          <Text
            type="label"
            textEng="Last Name"
            textKor="성"
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
          className="px-3 py-2  border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black "
          {...register("last_name", {
            required: "Please include your last name.",
          })}
          name="last_name"
          placeholder={languageState.korean ? "스캇트" : "Scott"}
        />
        <Text
          type="p"
          textEng={errors!.last_name ? errors.last_name.message! : ""}
          textKor={errors!.last_name ? errors.last_name.message! : ""}
          customStyles="text-black"
        />
      </div>

      {/* age Input */}
      <div className="flex flex-col w-full mb-14">
        <div className="flex mb-2">
          <Text
            type="label"
            textEng="Age"
            textKor="나이"
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
          type="number"
          className="px-3 py-2  border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black "
          {...register("age", { required: "Please include your age." })}
          name="age"
          placeholder={languageState.korean ? "나이" : "how old are ya?"}
        />
        <Text
          type="p"
          textEng={errors!.age ? errors.age.message! : ""}
          textKor={errors!.age ? errors.age.message! : ""}
          customStyles="text-black"
        />
      </div>

      <FormSubmitButton loading={isLoading} textEng="Next" textKor="다음" black={true} />
    </form>
  );
};

export default RegisterFormPt1;
