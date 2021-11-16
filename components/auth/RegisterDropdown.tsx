import Text from "../reusables/Text"
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Transition } from "@headlessui/react";
import { Dispatch, SetStateAction, useState } from "react";
import { IGroupOptions } from "./RegisterFormPt3";

interface IRegisterDropdown {
    setGroupOption: Dispatch<SetStateAction<IGroupOptions>>
    groupOption: IGroupOptions
}

const RegisterDropdown:React.FC<IRegisterDropdown> = ({setGroupOption, groupOption}) => {

    const [showDropdown, setShowDropdown] = useState(false);

    const buttonClicked = (option: IGroupOptions) => {
        setGroupOption(option);
        setShowDropdown(false);
    }

    return (
        <div className="relative inline-block text-center mb-2">
        <button
          className="flex items-center xl:group focus:outline-none"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Text
            type="button"
            textEng={groupOption === "join" ? 'Join Group' : groupOption === "create" ? "Create Group" : "Continue Alone"}
            textKor={groupOption === "join" ? '그룹 가입하기' : groupOption === "create" ? "새로운 그룹 만들기" : "혼자 시작하기"}
            customStyles="group-hover:text-gray-400"
          />
          <ChevronDownIcon className="w-5 h-6 text-black flex group-hover:text-gray-400" />
        </button>

        {/* Dropdown Menu */}
        <Transition
          show={showDropdown}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="flex flex-col absolute right-0 w-full bg-white divide-y divide-gray-100 round-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {groupOption !== "join" && (
              <button
                className="px-2 py-2"
                onClick={() => buttonClicked("join")}
              >
                <Text
                  type="span"
                  textEng="Join Group"
                  textKor="그룹 가입하기"
                  customStyles="hover:text-gray"
                />
              </button>
            )}
            {groupOption !== "create" && (
              <button
                className="px-2 py-2"
                onClick={() => buttonClicked("create")}
              >
                <Text
                  type="span"
                  textEng="Create New Group"
                  textKor="새로운 그룹 만들기"
                  customStyles="hover:text-gray"
                />
              </button>
            )}
            {groupOption !== "alone" && (
              <button
                className="px-2 py-2"
                onClick={() => buttonClicked("alone")}
              >
                <Text
                  type="span"
                  textEng="Continue Alone"
                  textKor="혼자 하기"
                  customStyles="hover:text-gray"
                />
              </button>
            )}
          </div>
        </Transition>
      </div>
    )
}

export default RegisterDropdown
