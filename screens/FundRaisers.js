import { useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { StyleSheet } from "react-native";
import { SafeArea } from "../components/SafeArea";
import { Theme } from "../utils/theme";

export function FundRaisers () {
    const { uid } = useContext(AppContext);

    return (
        <SafeArea>
          
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    title:{
        color:Theme.colors.brown300,
        fontSize:Theme.sizes[4]
    }
})