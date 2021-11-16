import { useContext, useState } from "react";
import { GlobalContext } from "../../context/Provider";
import Text from "../reusables/Text";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { switchLanguage } from "./../../context/actions/language";
import { Transition } from "@headlessui/react";

const LanguageDropdown: React.FC<{ customStyles?: string }> = ({
  customStyles,
}) => {
  const { languageState, languageDispatch } = useContext(GlobalContext);
  const [showDropdown, setShowDropdown] = useState(false);

  const switchButtonClicked = (lang: "kor" | "eng") => {
    switchLanguage(lang)(languageDispatch);
    setShowDropdown(false);
  };

  return (
    <div className={`${customStyles}`}>
      <div className={`relative inline-block text-center`}>
        {/* Button to change Dropdown */}
        <button
          className="flex items-center xl:group focus:outline-none px-2 py-2"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <Text
            type="span"
            textEng="ENG"
            textKor="한국어"
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
            {languageState.korean && (
              <button
                className="px-2 py-2"
                onClick={() => switchButtonClicked("eng")}
              >
                <Text
                  type="span"
                  textEng="ENG"
                  textKor="영어"
                  customStyles="hover:text-gray"
                />
              </button>
            )}
            {!languageState.korean && (
              <button
                className="px-2 py-2"
                onClick={() => switchButtonClicked("kor")}
              >
                <Text
                  type="span"
                  textEng="KOR"
                  textKor="한국어"
                  customStyles="hover:text-gray"
                />
              </button>
            )}
          </div>
        </Transition>
      </div>
    </div>
  );
};

export default LanguageDropdown;
