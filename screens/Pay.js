import { useContext } from "react";
import { AppContext } from '../settings/globalVariables';
import { StyleSheet,View,Alert } from "react-native";
import { SafeArea } from "../components/SafeArea";
import { db } from '../settings/firebase.setting';
import { addDoc,collection } from "firebase/firestore";
import { Paystack } from "react-native-paystack-webview";
import { publicKey } from "../settings/paystack.setting";

//If you got the follwing error message, follw the steps outlined below to solve it

//Build failed: Gradle build failed with unknown error. See logs for the "Run gradlew" phase for more information.

//STEPS TO TAKE
//Delete the existing build on expo.dev
//remove the following from app.json
// "extra": {
//     "eas": {
//       "projectId": "4add5f7e-573c-4910-ab1b-6a06045615ed"
//     }
//   }
//Then, install expo-cli again (to install the latest version of expo)
//Copy your assets folder to another location (the next step might delete it). Copy it back (after the update) to your project if was deleted
//Update other dependencies to be compatible with the latest expo-cli by running expo update 
//Finally, run eas build -p android --profile preview

export function Pay ({navigation,route}) {
    const {uid,email} = useContext(AppContext);
    const {project,amount} = route.params;

    const handlePostDonation = () => {
        addDoc(collection(db,'donations'),{
            amount:Number(amount),
            project:project,
            donatedByEmail:email,
            donatedByUid:uid,
            createdAt:new Date().getTime()
        })
        .then(() => {
            Alert.alert(
                'Message',
                'Your donation was successful!!',
                [
                    {text:'Go to Home',onPress:() => navigation.navigate('My Home')},
                    {text:'Go to History',onPress:() => navigation.navigate('History')},
                ]
            )   
        })
        .catch(error => {
            Alert.alert(
                'Message',
                error.message,
                [{text:'Dismiss'}]
            )
        })
    }

    return (
        <SafeArea>
            <View style={styles.container}>
            <Paystack  
                paystackKey={publicKey}
                amount={amount}
                billingEmail={email}
                activityIndicatorColor="green"
                onCancel={(e) => {
                    // handle response here
                    navigation.navigate('My Home')
                }}
                onSuccess={(res) => {
                    // handle response here
                    handlePostDonation();
                }}
                autoStart={true}
            />
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
})