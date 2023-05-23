import { createContext,useState } from "react";

const AppContext = createContext();

function AppProvider ({children}) {
    const [firstName,setFirstName] = useState('Joseph');
    const [uid,setUid] = useState('iejye7736');

    return (
        <AppContext.Provider value={{firstName,setFirstName,uid,setUid}}>
            {children}
        </AppContext.Provider>
    )
}

export { AppContext,AppProvider }