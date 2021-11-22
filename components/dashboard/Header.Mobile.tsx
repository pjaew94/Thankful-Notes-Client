import Hamburger from "./Hamburger.Mobile"


import {Dispatch, SetStateAction, useContext} from 'react';
import { GlobalContext } from '../../context/Provider';
import Text from "../reusables/Text";
import LanguageDropdown from "../languageToggle/LanguageDropdown";


interface IHeader {

}

const Header: React.FC<IHeader> = () => { 

    const {navState} = useContext(GlobalContext) 


    return (
        <div className='w-full flex justify-between items-center mb-5'>
            <Hamburger />
            <Text type='h4' customStyles="text-xl" textEng={navState.value} textKor={navState.value === "Dashboard" ? "계기반" : navState.value === "Group" ? "그룹" : "설정"} />
            <LanguageDropdown />
        </div>
    )
}

export default Header
