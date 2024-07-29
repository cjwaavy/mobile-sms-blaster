import { useAssets } from 'expo-asset';
import * as Papa from 'papaparse'
const csvData = `
name,age,city
Alice,30,New York
Bob,25,Los Angeles
Charlie,35,Chicago
`;

const results = Papa.parse(csvData, {
  header: true,
  dynamicTyping: true,
  skipEmptyLines: true
});

export default async function csvToObjectArray() {
  const [assets, error] = useAssets([require('../assets/contacts/output1.csv')]); 
  const contacts = assets ? Papa.parse(assets[0], {
    header: true,
    dynamicTyping: true,
    skipEmptyLines: true
  }) : null
  return contacts;
} // Array of objects