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
import { sampleData } from './assets/data/sample-data';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

export default function App () {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.header}>
          <View style={styles.leftHeader}>
            <Image 
            source={require('./assets/charityapp.png')}
            alt='app logo'
            style={styles.logo}/>
            <Text style={styles.brandName}>CharityApp</Text>
          </View>

          <FontAwesomeIcon icon={faUser} color="#5C469C" size={36}/>
        </View>

        <View style={styles.body}>
          <View style={styles.actionBlock}> 
            <View style={styles.actionBox}>
              
            </View>
            <View style={styles.actionBox}>
              
            </View>
            <View style={styles.actionBox}>
              
            </View>
            <View style={styles.actionBox}>
              
            </View>
          </View>

          <View style={styles.recent}>
            <Text style={styles.recentTitle}>Recent donations</Text>

            <View style={styles.recentScroll}>
              <FlatList 
              data={sampleData}
              renderItem={({item}) => {
                return (
                  <View style={styles.recentBlock}>
                    <View style={styles.donationDetails}>
                      <Text style={styles.donationAmount}>₦{item.amount}</Text>
                      <Text style={styles.donationInfo}>{item.time} minutes ago</Text>
                    </View>
      
                    <Text style={styles.donatedBy}>Donated by {item.email}</Text>
                  </View>
                )
              }}
              key={({item}) => item.id}
              showsVerticalScrollIndicator={false}/>
            </View>
          </View>

        </View>
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
  },
  body:{
    flex:1,
    marginTop:10
  },
  actionBlock:{
    flex:2.5,
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    gap:6,
    backgroundColor:'#E34DA2',
    padding:8,
    borderRadius:10,
  },
  recent:{
    flex:3.5,
    marginTop:8,
    padding:8,
    borderRadius:8,
    backgroundColor:'#FDE2F3',
  },
  actionBox:{
    width:'49%',
    height:'49%',
    backgroundColor:'#77037B',
    borderRadius:10,
  },
  recentTitle:{
    fontSize:22,
    marginBottom:2
  },
  recentBlock:{
    backgroundColor:'#5C469C',
    paddingHorizontal:6,
    paddingVertical:8,
    gap:4,
    borderRadius:8,
    marginBottom:3
  },
  recentScroll:{
    flex:1,//new
    flexDirection:'column',//new
  },
  donationDetails:{
    flexDirection:'row',
    justifyContent:'space-between'
  },
  donationAmount:{
    fontSize:20,
    color:'#fff'
  },
  donationInfo:{
    color:'#D4ADFC'
  },
  donatedBy:{
    color:'#D4ADFC',
    fontSize:16
  }
})