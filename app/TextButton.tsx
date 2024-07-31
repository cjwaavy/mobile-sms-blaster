import { Property, useContextValue } from "@/custom/context"
import { getLocalTime } from "@/custom/customFunctions"
import { AntDesign, Ionicons } from "@expo/vector-icons"
import React from "react"
import { useState } from "react"
import { Linking, TouchableOpacity, View, Text } from "react-native"

interface Props{
    index: number
    firstName: string
    lastName: string
    phone: string
    city: string
    state: string
    address: string
    setClicked: React.Dispatch<React.SetStateAction<boolean>>
}
export default function TextButton({index, firstName, lastName, phone, city, state, address, setClicked}: Props){
    const {activeContactList, setActiveContactList, setAllContactLists, allContactLists} = useContextValue()
    const [alreadyTexted, setAlreadyTexted] = useState(false)
    const getRandomMessage = () => {
        const choice = Math.floor(Math.random() * 7) + 1
        let message 

        switch (choice) {
            case 1:
                message = `Hi there, this is Charles. I'm interested in your property at ${address}. Are you open to discussing a potential buy out deal and get you cash in your pockets? No obligation. Thanks!` 
                break 
            case 2:
                message = `Hello, hope you're well. I'm Charles, a local buyer in ${city}. I'm interested in purchasing your property at ${address}. Would you consider selling? Let's chat!` 
                break 
            case 3:
                message = `Hi, I'm Charles, a specialist in helping homeowners with quick sales. If you're looking to sell your property at ${address} hassle-free, let's talk. No pressure.` 
                break 
            case 4:
                message = `Hello, I'm Charles, a real estate buyer. I can make a fast cash offer for your property at ${address}. Interested? Reply and we can discuss details.` 
                break 
            case 5:
                message = `Hi, I'm Charles, a local real estate buyer. I'm interested in your property at ${address}. If you’re thinking of selling, I’d love to make an offer. No strings attached.` 
                break 
            case 6:
                message = `Hi, I'm Charles, a local real estate buyer in the ${city} Area. I'm interested in your property at ${address}. If you’re thinking of selling, I’d love to make an offer. No strings attached.` 
                break 
            case 7:
                message = `Hi, was just driving by what I believe to be your property at ${address} I was curious if you were trying to sell as I'm looking to buy houses all cash in the ${city} Area` 
                break 
            default:
                message = `Hi, I'm Charles, a specialist in helping homeowners with quick sales. If you're looking to sell your property at ${address} hassle-free, let's talk. No pressure.` 
                break 
        }
    
        return message         
    }

    return(
        <TouchableOpacity 
                style={{backgroundColor: !alreadyTexted ? 'green' : 'orange', padding: 10, borderRadius: 50, marginTop: 5, justifyContent: 'center', alignItems: 'left'  }}
                onPress={() => { 
                    Linking.openURL(`sms:${phone}?body=${encodeURIComponent(getRandomMessage())}`)
                    setClicked(true)
                    setAlreadyTexted(true)
                    // let firstElement = activeContactList.contacts[0]
                    
                    // let tempContacts = [activeContactList.contacts[0], ...activeContactList.contacts.slice(1)]
                    // console.log(tempContacts)
                    const refresh = { name: activeContactList.name,
                        contacts: activeContactList.contacts, 
                        done: [...activeContactList.done, index],
                        lastModified: getLocalTime()}
                    setActiveContactList(refresh)
                    // console.log(activeContactList.done)
                }}
                >
                    <View className={`flex-row items-center`} >
                        <View className="w-55 rounded-full p-2">
                            <Ionicons name="chatbubble-ellipses-outline" size={30} color="white" />
                        </View>
                        <Text className="ml-5 text-xl text-center text-white">{phone}</Text>
                        <AntDesign name="right" size={20} color="white" />
                    </View>
                </TouchableOpacity>
    )
}
