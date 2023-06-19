import { useState } from "react";
import { StyleSheet,View,FlatList } from "react-native";
import { SafeArea } from "../components/SafeArea";
import { Button, Card, Text } from 'react-native-paper';
import { Theme } from '../utils/theme';
import { db } from '../settings/firebase.setting';
import { getDocs,collection } from "firebase/firestore";

export function FundRaisers () {
    const [raisers,setRaisers] = useState([]);

    const handleGetRaisers = async () => {
        const querySnap = await getDocs(collection(db,'projects'));
        setRaisers(querySnap.docs.map(doc => {
            return {
                id:doc.id,
                data:{...doc.data()}
            }
        }))
    }
    handleGetRaisers();

    return (
        <SafeArea>
            <View style={styles.container}>
                {/* Please scroll down to find some notes that I have added */}
               <FlatList data={raisers} 
                key={({item}) => item.id}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => {
                return (
                    <Card style={styles.card}>
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Content style={styles.cardContent}>
                            <Text variant="headlineMedium">{item.data.title}</Text>
                            <Text variant="titleLarge" style={{color:'green',marginBottom:8}}>Target: ₦{item.data.target}</Text>
                            <Text variant="bodyMedium">{item.data.description}</Text>
                        </Card.Content>
                        <Card.Actions>
                            <Button style={styles.viewBtn}>View</Button>
                            <Button style={styles.donateBtn}>Dontate</Button>
                        </Card.Actions>
                    </Card>
                )
               }}/>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        //gap:Theme.sizes[3],//remove this line and set margin bottom on Card
    },
    card:{//add this
        marginBottom:Theme.sizes[3]
    }, 
    //create a PayStack account at https://dashboard.paystack.com/#/signup
    //we will setup card payments on our next class
    cardContent:{
        paddingVertical:Theme.sizes[2]
    },
    viewBtn:{
        borderWidth:1,
        borderColor:Theme.colors.gray400,
    },
    donateBtn:{
        backgroundColor:Theme.colors.gray400,
        color:Theme.colors.lime400
    }
})