
import { useContext } from 'react';
import { GlobalContext } from '../../context/Provider';
import Text from '../reusables/Text';


const TodaysMessage: React.FC = () => {

    const {messageState} = useContext(GlobalContext)


    return (
        <div className='flex w-full flex-col'>
            <Text type='h6' textEng="Today's Message" textKor='오늘의 메세지' customStyles='mb-5' />
            <div className='flex flex-col p-5 bg-pink'>
                <Text type='p' textEng={messageState?.loadedMessage?.message} textKor={messageState?.loadedMessage?.message_kor} customStyles=""/>
                <div className='flex justify-end items-center mt-3'>
                    <Text type='p' textEng={messageState?.loadedMessage?.book} textKor={messageState?.loadedMessage?.book_kor} customStyles='mr-2 text-gray-400' />
                    <Text type='p' textEng={messageState?.loadedMessage?.chapter_and_verse} textKor={messageState?.loadedMessage?.chapter_and_verse} customStyles='text-gray-400' />
                </div>
            </div>
        </div>
    )
}

export default TodaysMessage
