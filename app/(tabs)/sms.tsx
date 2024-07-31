import { ActivityIndicator, Alert, Button, FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View } from "react-native";
import "../global.css"
import { Asset, useAssets } from "expo-asset";
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import * as Papa from 'papaparse'
import { useContext, useEffect, useState } from "react";
import ContactItem from "../ContactItem";
import { ContactList, Context, Property, useContextValue } from "@/custom/context";
// import { getLocalTime, updateContactListLocalStorage } from "@/custom/customFunctions";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getLocalTime, updateContactListLocalStorage } from "@/custom/customFunctions";
import { AntDesign } from "@expo/vector-icons";
import React from "react";


export default function SMS() {
  const {activeContactList, setActiveContactList, allContactLists, setAllContactLists} = useContextValue();
  const [error, setError] = useState(null);
  const [contacts, setContacts] = useState<Property[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 50;
  useEffect(() => {
    const loadContacts = () => {
      setLoading(true);
      const start = (page - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setContacts([...activeContactList.contacts.slice(start, end)]);
      setLoading(false);
    };
    loadContacts();
  }, [page])
  
  const nextPage = () => {
    if(page < Math.ceil(activeContactList.contacts.length / itemsPerPage)) 
      setPage(page + 1);
  }
  const lastPage = () => {
    if(page > 1)
      setPage(page - 1);
  }
  return (
    <View className="flex-1 bg-stone-700">
      <SafeAreaView className="mt-5 flex-1 items-center justify-center">
        <Text className="pt-5 text-3xl font-bold text-center text-white">SMS</Text>
        {error && <Text style={{ color: 'red' }}>Error: {error.message}</Text>}
        <TouchableOpacity 
          style={{ zIndex: 10, backgroundColor: "rgb(203 213 225)", position: "absolute", opacity: 0.9, left: 20, bottom: 60, borderRadius: 9999 }}
          onPress={lastPage}>
          <View className="p-5">
            <AntDesign name="left" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
            style={{ zIndex: 10, backgroundColor: "rgb(203 213 225)", position: "absolute",opacity: 0.9, right: 20, bottom: 60, borderRadius: 9999 }}
            onPress={nextPage}>
          <View className="p-5">
            <AntDesign name="right" size={24} color="white" />
          </View>
        </TouchableOpacity>
        <View style={{zIndex: 10, position: 'absolute', bottom: 60, right: "45%", opacity: 0.9, backgroundColor: 'rgb(203 213 225)', borderRadius: 50, width: 55 , height: 55, justifyContent: 'center', alignItems: 'center'  }}>
          <Text className="text-3xl font-bold text-center text-white">{page}/{Math.ceil(activeContactList.contacts.length / itemsPerPage)}</Text>
        </View>
        {loading && <ActivityIndicator/>}
          <View className="mb-16">
            <ScrollView className="pb-44 mb-12">
              {contacts?.map((item : Property, index) => (
                <ContactItem
                index={(page-1) * itemsPerPage + index}
                key={(page-1) * itemsPerPage + index}
                firstName={item["Owner 1 First Name"]} 
                lastName={item["Owner 1 Last Name"]} 
                address={item["Address"]} 
                phones={item["Phone"].split(/,\s*/)}
                city={item["City"]}
                state={item["State"]}
                
                />
              ))}
            </ScrollView>
          </View>
      </SafeAreaView>
    </View>
  );
}