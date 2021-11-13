import { useContext } from "react"
import { removeWarning } from "../../context/actions/auth";
import { GlobalContext } from "../../context/Provider"
import Text from './../reusables/Text';
import Button from './../reusables/Button';

const AuthWarning:React.FC = () => {

    const {authState, authDispatch} = useContext(GlobalContext);

 
    const closeWarning = async () => {
        await removeWarning()(authDispatch)
    }


    return (
        <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-10'>
            <div className ='h-full w-full fixed bg-black bg-opacity-60 ' onClick={() => closeWarning()} />
            <div className='w-3/4 min-h-[150px] bg-white z-10 rounded-md px-6 py-6 max-w-xs'>
                <Text type='h4' textEng={authState!.error!.eng} textKor={authState!.error!.kor} customStyles='mb-5' />

                <Button onClick={() => closeWarning()} textEng='Close' textKor='닫기'></Button>
            </div>
        </div>
    )
}

export default AuthWarning
