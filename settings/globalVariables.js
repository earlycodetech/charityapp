import { createContext,useState } from "react";

const AppContext = createContext();

function AppProvider ({children}) {
    const [email,setEmail] = useState(null);
    const [uid,setUid] = useState(undefined);

    return (
        <AppContext.Provider value={{email,setEmail,uid,setUid}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,AppProvider }