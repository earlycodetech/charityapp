import { 
View,
Text,
StyleSheet,
TouchableOpacity,
FlatList,
Image,
SafeAreaView,
Platform,
StatusBar } from "react-native";

export default function App () {
  
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftHeader}>
          <Image 
          source={require('./assets/charityapp.png')}
          alt='app logo'
          style={styles.logo}/>
          <Text style={styles.brandName}>CharityApp</Text>
        </View>

        <Image 
        source={require('./assets/user.png')}
        alt='icon'
        style={styles.headerIcon}/>
      </View>

      <View style={styles.middleContainer}>
        <View style={styles.actionBox}>
          
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop:Platform.OS == 'android' ? StatusBar.currentHeight : 0,
    paddingHorizontal:8
  },
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  leftHeader:{
    flexDirection:'row',
    alignItems:'center'
  },
  logo:{
    width:52,
    height:52,
    marginRight:4
  },
  brandName:{
    fontSize:28,
    fontWeight:'bold',
    color:'red'
  },
  headerIcon:{
    width:48,
    height:48
  }
})