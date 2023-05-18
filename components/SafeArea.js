import { View,SafeAreaView,StyleSheet,Platform,StatusBar } from "react-native";

export function SafeArea ({children}) {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {children}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    },
    wrapper:{
        flex:1,
        paddingHorizontal:12
    },
})