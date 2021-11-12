
const styles = {
    h1: '',
    h2: '',
    h3: '',
    h4: '',
    p: '',
    span: '',
    
}

interface IText {
    type: "h1"| "h2" | "h3" | "h4" | "p" | "span",
    textEng: string,
    textKor: string
}

const Text:React.FC<IText> = ({type, textEng, textKor}) => {
    return (
        <div className={styles[type]}>
            
        </div>
    )
}

export default Text
