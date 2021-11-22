import { Dispatch, SetStateAction } from "react";
import Button from "../reusables/Button";
import Text from "../reusables/Text";


interface IPrivateWarning {
    setShowPrivateWarning: Dispatch<SetStateAction<boolean>>;
  }

const PrivateWarning: React.FC<IPrivateWarning> = ({setShowPrivateWarning}) => {
    return (
        <div className='h-screen w-screen fixed top-0 left-0 flex justify-center items-center z-50'>
             <div className ='h-full w-full fixed bg-black bg-opacity-60 ' onClick={() => setShowPrivateWarning(false)} />
            <div className='w-3/4 min-h-[150px] bg-white z-10 rounded-md px-6 py-6 max-w-xs'>
                <Text type='h4' textEng='This post is set to private. You are not permitted to view the post.' textKor='이 게시물은 비공개로 설정되어 있습니다. 게시물을 볼 수 없습니다.' customStyles='mb-5' />

                <Button onClick={() => setShowPrivateWarning(false)} textEng='Close' textKor='닫기'></Button>
            </div>
        </div>
    )
}

export default PrivateWarning
