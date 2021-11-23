
import { useContext } from 'react'
import Calendar from 'react-calendar'
import Text from './Text'
import { GlobalContext } from './../../context/Provider';


const CalendarComponent:React.FC = () => {

    const {authState} = useContext(GlobalContext)


    const dateJoined = authState?.user?.date_joined.slice(0, 10)
    const yearJoined = Number(dateJoined?.slice(0,4))
    const monthJoined = Number(dateJoined?.slice(5,7))
    const dayJoined = Number(dateJoined?.slice(8,10))
    const maxDate = new Date()
    const minDate = new Date(yearJoined, monthJoined - 1, dayJoined)
    


    return (
        <div className='mt-auto pb-8 flex flex-col w-full'>
            <Text type='h7' textEng='Calendar' textKor='달력' customStyles='mb-7' />
            <Calendar
                calendarType="US"
                
                minDate={minDate}
                maxDate={maxDate}
            />

        </div>
    )
}

export default CalendarComponent
