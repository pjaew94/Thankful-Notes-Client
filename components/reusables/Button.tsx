
import Text from './Text';
interface IButton {
    onClick: () => void
    textEng: string,
    textKor: string
}

const Button: React.FC<IButton> = ({onClick, textEng, textKor}) => {

    return (
        <button className='w-full flex justify-center items-center text-center text-white bg-hotPink rounded-md py-3 min-h-[50px]' onClick={() => onClick()}>
            <Text type='button' textEng={textEng} textKor={textKor} />
    </button>
    )
}

export default Button
