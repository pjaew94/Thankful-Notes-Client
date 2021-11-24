import { useRouter } from "next/router"
import { useEffect } from "react"




const UserProfile = () => {

    const {query} = useRouter()


    useEffect(() => {
       
    }, [])
    return (
        <div>
            {query.username}
        </div>
    )
}

export default UserProfile
