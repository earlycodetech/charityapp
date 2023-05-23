import { useContext } from "react";
import { AppContext } from '../settings/globalVariables';
import { View,Text,StyleSheet } from "react-native";
import { Button,TextInput } from "react-native-paper";
import { SafeArea } from "../components/SafeArea";

export function Create({navigation}) {
    const { uid } = useContext(AppContext);

    return uid !== null ? (
        <SafeArea>
            <Text style={styles.mainTitle}>Create a Fund Raiser</Text>
            <Text style={styles.crimeAlert}>This app is a demonstration app built by a cohort of students and instructor at early code. This app must not be used by any means for frudulent purposes. The students and the institutions takes no responsible for any act of crime on the app.</Text>
        </SafeArea>
    )
    : (
        <SafeArea>
            <View style={styles.wrapper}>
                <Text style={styles.subHeader2}>Sign in first to create a fund raiser</Text>
                <Button 
                mode="contained" 
                contentStyle={{paddingVertical:4}}
                onPress={() => navigation.navigate('Login')}>Go to sign in</Button>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        gap:16
    },
    subHeader2:{
        fontSize:24,
        textAlign:'center'
    },
    mainTitle:{
        fontSize:26,
        marginBottom:6
    },
    crimeAlert:{
        fontSize:12,
        color:'gray',
        marginBottom:8
    }
})