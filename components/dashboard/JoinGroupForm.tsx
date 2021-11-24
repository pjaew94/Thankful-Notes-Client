import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import Text from "../reusables/Text";

interface IJoinGroupForm {
  setShowGroupForm: Dispatch<SetStateAction<boolean>>;
}

interface IForm {
    unique_group_name: string
}

const JoinGroupForm: React.FC<IJoinGroupForm> = ({ setShowGroupForm }) => {

    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<IForm>();

      const onSubmit = async(data: IForm) => {
        
      }


  return (
    <div className="fixed right-0 top-0 w-screen max-h-screen h-screen z-50">
      <div className="w-full h-full flex px-10 py-10 relative justify-center items-center">
        {/* Backdrop */}
        <div
          className="h-full w-full fixed bg-black bg-opacity-60 "
          onClick={() => setShowGroupForm(false)}
        />
    <form onSubmit={handleSubmit(onSubmit)}>
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
          {...register("unique_group_name", { required: "This group does not exist." })}
          name="email"
          placeholder={"Enter ID of group"}
        />
        </div>

    </form>


      </div>
    </div>
  );
};

export default JoinGroupForm;
