import { Dispatch, SetStateAction } from "react";
import Text from "./../reusables/Text";
interface IRegisterProgressBar {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
}

const RegisterProgressBar: React.FC<IRegisterProgressBar> = ({
  step,
  setStep,
}) => {
  return (
    <div className="w-full flex mb-10">
      <div className="flex flex-col w-1/3 mr-1" >
        <Text
          type="p"
          textEng="1. Basic Info"
          textKor="1. 기본 정보"
          customStyles={step >= 1 ? "text-hotPink" : "text-gray-300"}
        />
        <div
          className={`w-full h-2 rounded-sm mt-1 ${
            step >= 1 ? "bg-hotPink" : "bg-gray-300"
          }`}
        />
      </div>
      <div className="flex flex-col w-1/3 mr-1" >
        <Text
          type="p"
          textEng="2. Auth"
          textKor="2. 인증"
          customStyles={step >= 2 ? "text-hotPink" : "text-gray-300"}
        />
        <div
          className={`w-full h-2 rounded-sm mt-1 ${
            step >= 2 ? "bg-hotPink" : "bg-gray-300"
          }`}
        />
      </div>

      <div className="flex flex-col w-1/3">
        <Text
          type="p"
          textEng="3. Group"
          textKor="3. 그룹"
          customStyles={step === 3 ? "text-hotPink" : "text-gray-300"}
        />
        <div
          className={`w-full h-2 rounded-sm mt-1 ${
            step === 3 ? "bg-hotPink" : "bg-gray-300"
          }`}
        />
      </div>
    </div>
  );
};

export default RegisterProgressBar;
