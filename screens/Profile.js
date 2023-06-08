import { useContext,useEffect, useState } from "react";
import { View,StyleSheet,Text } from "react-native";
import { AppContext } from '../settings/globalVariables';
import { SafeArea } from "../components/SafeArea";
import { Theme } from "../utils/theme";
import { Button } from "react-native-paper";
import { db } from '../settings/firebase.setting';
import { getDoc,doc } from "firebase/firestore";

export function Profile ({navigation}) {
    const { uid } = useContext(AppContext);
    //updated useState after data is fetched
    const [userRecords,setUserRecords] = useState({});

    //fetch data after component is loaded
    useEffect(() => {
        const handleGetUserRecords = async () => {
            const snapShot = await getDoc(doc(db,'users',uid));

            setUserRecords(snapShot.data());
        }

        handleGetUserRecords();
    },[]);

    return (
        <>
        <Image />
        <SafeAreaView>
            
        </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    
})