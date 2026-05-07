import {createContext, useState} from "react"

export const UserContext = createContext();


export const UserProvider = ({children})=>{
    const [user, setUser] = useState({
        name:"Manjil",
        loggedIn:true
    });
    const [inputData, setInputData] = useState('')
    
return (
    <UserContext.Provider value={{user,setUser,inputData,setInputData}}>
        {children}
    </UserContext.Provider>

);
}

