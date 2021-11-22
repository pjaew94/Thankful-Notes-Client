import Button from "./../reusables/Button";
import FormSubmitButton from "./../reusables/FormSubmitButton";
import { useContext, useEffect, useState } from "react";
import { IRegisterFormPt } from "./RegisterFormPt1";
import { useForm } from "react-hook-form";
import Text from "../reusables/Text";
import RegisterDropdown from "./RegisterDropdown";
import { checkIfGroupExists } from "../../context/actions/auth";
import { GlobalContext } from "./../../context/Provider";

export interface IRegisterFormData3 {
  unique_group_name: string;
  group_name?: string;
}

export type IGroupOptions = "join" | "create" | "alone";

interface IRegisterFormPt3 extends IRegisterFormPt {
  registerUser: () => void;
}

const RegisterFormPt3: React.FC<IRegisterFormPt3> = ({
  setStep,
  data,
  setData,
  languageState,
  registerUser,

}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [groupOption, setGroupOption] = useState<IGroupOptions>("join");

  const { authDispatch } = useContext(GlobalContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm<IRegisterFormData3>();

  const watchUniqueGroupName = watch("unique_group_name");

  useEffect(() => {
    setData({ ...data, unique_group_name: watchUniqueGroupName });
  }, [watch, watchUniqueGroupName]);

  const onSubmit = async (formData: IRegisterFormData3) => {
    setIsLoading(true);

    if (groupOption === "join") {
      const res = await checkIfGroupExists(formData, "join")(authDispatch);
      if (res === "success") {
        registerUser();
      }
    }
    if (groupOption === "create") {
      const res = await checkIfGroupExists(formData, "create")(authDispatch);
      if (res === "success") {
        registerUser();
      }
    }
    if(groupOption === 'alone') {
      reset();
      setData({...data, unique_group_name: null})
      registerUser();
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Dropdown for group option */}
      <RegisterDropdown
        setGroupOption={setGroupOption}
        groupOption={groupOption}
      />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col md:min-h-[300px] md:justify-between"
      >
        <div>
          {/* unique_group_name Input */}
          {groupOption === "join" && (
            <div className="flex flex-col w-full mb-6">
              <div className="flex mb-2">
                <Text
                  type="label"
                  textEng="Group name you wish to join:"
                  textKor="가입하고 싶은 그룹명"
                  customStyles="text-gray-500"
                />
              </div>
              <input
                className="px-3 py-2 border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black "
                {...register("unique_group_name", {
                  required: "Make sure to include the group name.",
                })}
                name="unique_group_name"
                placeholder={
                  languageState.korean ? "그룹 ID를 입력하세요." : "Enter your group id"
                }
              />
              <Text
                type="p"
                textEng={
                  errors!.unique_group_name
                    ? errors.unique_group_name.message!
                    : ""
                }
                textKor={
                  errors!.unique_group_name
                    ? errors.unique_group_name.message!
                    : ""
                }
                customStyles="text-hotPink"
              />
            </div>
          )}

          {groupOption === "create" && (
            <>
              <div className="flex flex-col w-full mb-6">
                <div className="flex mb-2">
                  <Text
                    type="label"
                    textEng="Name of your new group:"
                    textKor="가입하고 싶은 그룹명"
                    customStyles="text-gray-500"
                  />
                </div>
                <input
                  className="px-3 py-2 border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black"
                  {...register("group_name", {
                    required: "Make sure to include the group name.",
                  })}
                  name="group_name"
                  placeholder={
                    languageState.korean ? "Best Group Ever" : "Best Group Ever"
                  }
                />
                <Text
                  type="p"
                  textEng={errors!.group_name ? errors.group_name.message! : ""}
                  textKor={errors!.group_name ? errors.group_name.message! : ""}
                  customStyles="text-hotPink"
                />
              </div>

              <div className="flex flex-col w-full mb-6">
                <div className="flex mb-2">
                  <Text
                    type="label"
                    textEng="Unique group id:"
                    textKor="유일한 그룹 아이디:"
                    customStyles="text-gray-500"
                  />
                </div>
                <input
                  className="px-3 py-2 border-[1px] border-gray-300 text-black font-serif focus:outline-none focus:ring-1 focus:ring-black "
                  {...register("unique_group_name", {
                    required: "Make sure to include a unique group name.",
                  })}
                  name="unique_group_name"
                  placeholder={
                    languageState.korean
                      ? "다른 멤버들이 가입할수있는 방법"
                      : "This is how other people will join"
                  }
                />
                <Text
                  type="p"
                  textEng={
                    errors!.unique_group_name
                      ? errors.unique_group_name.message!
                      : ""
                  }
                  textKor={
                    errors!.unique_group_name
                      ? errors.unique_group_name.message!
                      : ""
                  }
                  customStyles="text-hotPink"
                />
              </div>
            </>
          )}

          {groupOption === "alone" && (
            <div className="flex mb-8">
              <Text
                type="label"
                textEng="Are you sure you want to continue by yourself?"
                textKor="그룹없이 진행하실껍니까?"
                customStyles="text-gray-500"
              />
            </div>
          )}
        </div>
        <div className="flex w-full justify-between">
          <Button
            onClick={() => setStep(2)}
            textEng="Prev"
            textKor="이전"
            customStyles="w-5/12 bg-white border border-black"
            disabled={isLoading}
          />
          <FormSubmitButton
            loading={isLoading}
            textEng="Join!"
            textKor="가입"
            customStyles="w-5/12"
            black={true}
          />
        </div>
      </form>
    </div>
  );
};

export default RegisterFormPt3;
