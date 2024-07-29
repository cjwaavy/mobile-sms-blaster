import React, { Dispatch, useContext } from "react";

export type Property = {
    "Owner 1 First Name": string;
    "Owner 1 Last Name": string;
    Address: string;
    Phone: string;
    City: string;
    State: string;
};

export type ContactList = {
    name: string;
    contacts: Property[]
    done: number[]
    lastModified: string
}

export type CustomContextType = {
    activeContactList: ContactList
    setActiveContactList: React.Dispatch<React.SetStateAction<ContactList>>
    allContactLists: ContactList[]
    setAllContactLists: React.Dispatch<React.SetStateAction<ContactList[]>>
}

export const Context = React.createContext< CustomContextType | undefined>(undefined);

export function useContextValue():  CustomContextType{
    const contextValue = useContext(Context);
    if(!contextValue){
        throw new Error('useContextValue must be used within a ContextProvider')
    }
    return contextValue;
}

