import { Stack } from "expo-router";

// Import your global CSS file
import "../global.css"
import React, { useEffect, useState } from "react";
import { ContactList, Context } from "@/custom/context";
export default function RootLayout() {
  const emptyContactList: ContactList = { name: "empty", contacts: [], done: [], lastModified: ""}
  const [activeContactList, setActiveContactList] = useState<ContactList>(emptyContactList);
  const [allContactLists, setAllContactLists] = useState<ContactList[]>([]);
  return (
    <Context.Provider value={{ activeContactList, setActiveContactList, allContactLists, setAllContactLists }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </Context.Provider>
  );
}
