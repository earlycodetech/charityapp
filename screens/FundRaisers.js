import { useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { StyleSheet,View,Image,ScrollView,TouchableOpacity} from "react-native";
import { SafeArea } from "../components/SafeArea";

export function FundRaisers () {
    const { uid } = useContext(AppContext);

    return (
        <SafeArea>
         
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    first:{
        paddingLeft:15
    },
    second:{
        paddingLeft:13
    }
})