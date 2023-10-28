import { createContext, useState, useEffect} from "react";

const authContext = createContext()

export const authProvider = ({children}) => {

    const [loading, setLoading] = useState(true)

    const [user, setUser] = useState(null)

    const contextData = {
        user,
        setUser,
        loading,
        setLoading
    }

    return <authContext.Provider value={contextData}>
        {loading ? <p>Loading...</p> : children}
    </authContext.Provider>
}

export const userAuth = () => {return useContext(authContext)}

export default authContext