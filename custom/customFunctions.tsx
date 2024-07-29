import AsyncStorage from "@react-native-async-storage/async-storage";
import { ContactList, CustomContextType } from "./context";

export function getLocalTime(): string {
    const date = new Date();
    const offset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
    const localDate = new Date(date.getTime() - offset);
    const formattedTime = localDate.toLocaleTimeString();
    return formattedTime
}

export async function updateContactListLocalStorage(activeContacts: ContactList, allContacts: ContactList[]) {
    await AsyncStorage.setItem('allContactLists', JSON.stringify(allContacts));
    await AsyncStorage.setItem('activeContactList', JSON.stringify(activeContacts));
    //update contact list
}

