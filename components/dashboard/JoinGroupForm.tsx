import { Dispatch, SetStateAction, useContext, useState } from "react";
import { useForm } from "react-hook-form";
import Text from "../reusables/Text";
import FormSubmitButton from './../reusables/FormSubmitButton';
import { GlobalContext } from './../../context/Provider';
import { checkIfGroupExists, loadUser } from "../../context/actions/auth";
import { joinGroup } from "../../context/call-backs";
import router from "next/router";

interface IJoinGroupForm {
  setShowGroupForm: Dispatch<SetStateAction<boolean>>;
}

export interface IForm {
  unique_group_name: string;
}

const JoinGroupForm: React.FC<IJoinGroupForm> = ({ setShowGroupForm }) => {

  const [isLoading, setIsLoading] = useState(false);
  const {authDispatch, authState} = useContext(GlobalContext);
  const [groupDoesNotExistWarning, setGroupDoesNotExistWarning] = useState(false)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>();

  const onSubmit = async (data: IForm) => {
    setIsLoading(true)

    const check = await checkIfGroupExists(data, "join")(authDispatch)
    
    if(check === "success") {
        await joinGroup(data)
        await loadUser()(authDispatch)
        setShowGroupForm(false)

        if(authState?.isAuthenticated){
          router.reload()
        }
    } else {
      setGroupDoesNotExistWarning(true)
    }
    setIsLoading(false)

  };

  return (
    <div className="fixed right-0 top-0 w-screen max-h-screen h-screen z-50">
      <div className="w-full h-full flex px-10 py-10 relative justify-center items-center">
        {/* Backdrop */}
        <div
          className="h-full w-full fixed bg-black bg-opacity-60 "
          onClick={() => setShowGroupForm(false)}
        />



        <form
          className="w-full md:w-7/12 xl:w-3/12 z-10 px-7 py-10 bg-white"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col w-full mb-16">
          <Text type='h3' textEng='Join Group' textKor='그룹 조인' customStyles='mb-4'/>
            <div className="flex mb-2">
              
              <Text
                type="p"
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
              placeholder="Enter your group id"
            />
            {groupDoesNotExistWarning && <Text type='p' textEng='The group you are trying to join does not exist' textKor='가입하려는 그룹이 존재하지 않습니다.' customStyles='text-red-400 mt-2'/>}
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

          <FormSubmitButton
            loading={isLoading}
            textEng="Join!"
            textKor="가입"
            black={true}
          />
        </form>
      </div>
    </div>
  );
};

export default JoinGroupForm;
