import { useState } from "react";
import { View,Text,StyleSheet } from "react-native";
import { SafeArea } from "../components/SafeArea";
import { Theme } from "../utils/theme";

export function Donate () {
    return (
        <SafeArea>
            <Text style={styles.title}>Donate</Text>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
    title:{
        color:Theme.colors.brown300,
        fontSize:Theme.sizes[4]
    }
})