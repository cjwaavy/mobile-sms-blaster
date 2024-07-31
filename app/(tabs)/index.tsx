import React from "react";
import { ContactList, useContextValue } from "@/custom/context";
import { Link } from "expo-router";
import { Alert, Button, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { AntDesign } from '@expo/vector-icons';
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import * as Papa from 'papaparse'
import { getLocalTime } from "@/custom/customFunctions";
import { sendSMS } from "@/custom/smsFunctions";
// import { updateContactListLocalStorage } from "@/custom/customFunctions";

export default function Index() {
  const {activeContactList, setActiveContactList, allContactLists, setAllContactLists} = useContextValue();
  const handlePickDocument = async () => {
    try {
      const result : DocumentPicker.DocumentPickerResult = await DocumentPicker.getDocumentAsync({
        type: 'text/csv',
      })

      if(result.assets){
        const fileUri = result.assets[0].uri;
        const csvText = await FileSystem.readAsStringAsync(fileUri);
        const results = Papa.parse(csvText, {
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true
        });
        
        let newContactList: ContactList = {
          name: result.assets[0].name,
          contacts: results.data,
          done: [],
          lastModified: getLocalTime()
        }
        if(allContactLists.find(list => list.name === newContactList.name)){
          Alert.alert('Error', 'Contact list with the same name already exists', [
            {text: 'OK', onPress: () => console.log('OK Pressed')},
          ])
        }
        else{
          setActiveContactList(newContactList)
          setAllContactLists([...allContactLists, newContactList]);
        }
      }
    }
    catch (err: string | any) {
      console.error('Error picking the document:', err);
    }
  }
  const handleResetCache = async () => {
    await AsyncStorage.clear();
    setActiveContactList({name: "empty", contacts: [], done: [], lastModified: ""});
    setAllContactLists([]);
  }
  useEffect(() => {
    // if(allContactLists.length > 0){
    //   console.log(allContactLists[0].lastModified)
    // }
  })
  useEffect(() => {
    // updateContactListLocalStorage(useContextValue())
  })
  return(
    <View className="flex-1 px-5 pt-10 ">
      <Text className="text-3xl font-extrabold">Dashboard</Text>
      {allContactLists.map((list, index) => (
        <Link key={index} href="/sms" className="justify-center items-center" onPress={() => setActiveContactList(list)}>
          <Text className="text-xl">{list.name}</Text>
          <AntDesign name="right" size={20} color="black" />
          <Text className="absolute text-md text-gray-400 italic">Last Modified: {list.lastModified}</Text>
        </Link>
      ))}
      <Button title="text test" />
      <View className="absolute shadow-[0_10px_20px_-10px_rgba(109,110,114,0.5)] bottom-10 left-10 p-7 rounded-full  bg-slate-200 shadow-gray-950">
        <TouchableOpacity className="rounded-xl justify-center items-center " onPress={handlePickDocument} >
          <AntDesign name="upload" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-10 right-10">
        <TouchableOpacity className="flex p-10 rounded-lg justify-center items-center bg-red-400" onPress={handleResetCache} >
          <Text className="text-gray-500 text-center">Reset Cache</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
