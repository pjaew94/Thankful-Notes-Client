import { useContext } from "react"
import { GlobalContext } from "../../context/Provider"

const styles = {
    h1: '',
    h2: 'font-sans text-6xl',
    h3: '',
    h4: 'font-serif text-gray',
    p: '',
    span: '',
    
}

interface IText {
    type: "h1"| "h2" | "h3" | "h4" | "p" | "span",
    textEng: string,
    textKor: string,
    customStyles?: string
}

const Text:React.FC<IText> = ({type, textEng, textKor, customStyles}) => {

    const {languageState } = useContext(GlobalContext);
    return (
        <div className={`${styles[type]} ${customStyles} ${languageState.korean && 'font-kor'}`}>
            {languageState.korean ? textKor : textEng}
        </div>
    )
}

export default Text
