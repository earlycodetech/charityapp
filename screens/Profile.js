import { useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { StyleSheet } from "react-native";
import { SafeArea } from "../components/SafeArea";
import { Theme } from "../utils/theme";
import { Button } from "react-native-paper";

export function Profile ({navigation}) {
    const { uid,setFirstName } = useContext(AppContext);

    return (
        <SafeArea>
            <Button onPress={() => navigation.navigate('Create Profile')}>Create Profile</Button>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    title:{
        color:Theme.colors.brown300,
        fontSize:Theme.sizes[4]
    }
})