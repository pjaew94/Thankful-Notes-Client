import { ITodaysMessageState } from "../types"

const todaysMessageInitialState: ITodaysMessageState = {
        loadedMessage: {
            message: null,
            message_kor: null,
            book: null,
            book_kor: null,
            chapter_and_verse: null,
        },
        loading: true
    
}

export default todaysMessageInitialState