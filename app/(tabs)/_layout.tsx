import { Tabs } from "expo-router";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import { useContextValue } from "@/custom/context";
import { updateContactListLocalStorage } from "@/custom/customFunctions";
export default function TabLayout(){
    const {activeContactList, setActiveContactList, allContactLists, setAllContactLists} = useContextValue();
    useEffect(() => {
       console.log("initial useEffect:")
       const syncLocalStorage = async () => {
        try {
            const allContactListsString = await AsyncStorage.getItem('allContactLists');
            console.log("allContactListsString: ", allContactListsString)
            const activeContactListString = await AsyncStorage.getItem('activeContactList');
            console.log("activeContactListcString: ", activeContactListString)
            if(allContactListsString){
                setAllContactLists(JSON.parse(allContactListsString));
                console.log("tried to set allContactLists state, here it is: ", allContactLists)
            }
            if(activeContactListString){
                setActiveContactList(JSON.parse(activeContactListString));
                console.log("tried to set activeContactList state, here it is: ", activeContactList)
            }
        }
        catch (error) {
          console.error(error);
        }
       } 
       syncLocalStorage()
    },[])
    useEffect(() => {
      const syncLocalStorage = async () => {
        try {
            await AsyncStorage.setItem('allContactLists', JSON.stringify(allContactLists));
            console.log("All Contact Lists (Local Storage): ", await AsyncStorage.getItem('allContactLists'))
            await AsyncStorage.setItem('activeContactList', JSON.stringify(activeContactList));
            console.log("Active Contact List (Local Storage): ", await AsyncStorage.getItem('activeContactList'))
        } catch (error) {
          console.error(error);
        }
      };
  
      syncLocalStorage();
        console.log("Active Contact List: ", activeContactList)
        console.log("All Contact Lists: ", allContactLists)

        
    },[activeContactList, allContactLists]);
    
    return(
        <Tabs screenOptions={{ tabBarActiveTintColor: 'blue'}}>
            <Tabs.Screen name="index" options={{ 
                title: "Home",
                tabBarIcon: ({ color }) => <AntDesign name="home" size={24} color={color} />,
                }} 
            />
            <Tabs.Screen name="sms" options={{
                title: "Text",
                tabBarIcon: ({ color }) => <Ionicons name="chatbubble-ellipses-outline" size={24} color={color} />,
                
                }}
            />
        </Tabs>
    )
}