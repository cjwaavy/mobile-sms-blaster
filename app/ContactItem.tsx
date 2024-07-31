import { Button, Text, Touchable, TouchableOpacity, View } from "react-native"
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons' 
import * as Linking from 'expo-linking' 
import { useEffect, useState } from "react" 
import { useContextValue } from "@/custom/context" 
import { getLocalTime, updateContactListLocalStorage } from "@/custom/customFunctions"
import TextButton from "./TextButton"
import React from "react"

interface ContactItemProps {
    index: number
    firstName: string,
    lastName: string
    phones: string[]
    city: string
    state: string
    address: string
}
export default function ContactItem( {index, firstName, lastName, phones, city, state, address} : ContactItemProps) {
    const {activeContactList, setActiveContactList, allContactLists, setAllContactLists} = useContextValue() 
    const [clicked, setClicked] = useState(activeContactList.done.includes(index))
    
    useEffect(() => {
        // updateContactListLocalStorage(useContextValue())
            // console.log(activeContactList.done)
    })
    useEffect(() => {
        //update contact list
        setAllContactLists([activeContactList, ...allContactLists.filter((list) => list.name !== activeContactList.name)]);
      },[activeContactList.done])
    return (
        <View className={`flex rounded-xl h-auto mt-1 mx-2 p-3 ${clicked == 1 ? "bg-slate-700":"bg-slate-500"} shadow-xl`}>
            <Text className="text-xl font-bold">{`${firstName} ${lastName}`}</Text>
            <Text className="text-md font-bold">{`${address}`}</Text>
            <Text>{`${city}, ${state}`}</Text>
            <View className="flex flex-row flex-wrap items-center">
                <Feather name="phone" size={12} color="white"  />
                <Text className="text-md text-white font-bold">{ ` ${phones.length}`}</Text>
            </View>
            {/* <TouchableOpacity 
                style={{ position: 'absolute', top: "22%", right: "5%", backgroundColor: 'green', borderRadius: 50, width: 55 , height: 55, justifyContent: 'center', alignItems: 'center'  }}
                onPress={() => {
                    Linking.openURL(`tel:${phones[0]}`)
                    setClicked(1)
                    const refresh = { name: activeContactList.name,
                    contacts: activeContactList.contacts, 
                    done: [...activeContactList.done, index],
                    lastModified: getLocalTime()}
                    setActiveContactList(refresh)
                    console.log(activeContactList.done)
                    }}
                    >
                    <Feather name="phone" size={30} color="white"  />
                    </TouchableOpacity> */}
            {phones.map((phone, index) => (
                <TextButton key={index} index={index} firstName={firstName} lastName={lastName} phone={phone} city={city} state={state} address={address} setClicked={setClicked} />
            ))}
            <Text className="text-md text-white font-bold">{ ` ${index}`}</Text>

            

        </View>
    )
}