import { useContext } from "react"
import { GlobalContext } from "../../context/Provider"

const styles = {
    h1: '',
    h2: 'font-sans text-5xl font-bold',
    h3: 'font-sans text-4xl font-bold',
    h4: 'font-serif text-gray-500',
    p: 'text-sm',
    span: '',
    label: 'font-serif',
    button: 'font-sans text-xl font-bold',
    
}

interface IText {
    type: "h1"| "h2" | "h3" | "h4" | "p" | "span" | "label" | "button",
    textEng: string | React.ReactNode,
    textKor: string | React.ReactNode,
    customStyles?: string,
}

const Text:React.FC<IText> = ({type, textEng, textKor, customStyles}) => {

    const {languageState } = useContext(GlobalContext);
    return (
        <div className={`${styles[type]} ${languageState.korean && 'font-kor'} ${customStyles}`}>
            {languageState.korean ? textKor : textEng}
        </div>
    )
}

export default Text
