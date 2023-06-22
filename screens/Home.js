import { useState,useEffect,useCallback,useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { View,Text,StyleSheet,FlatList,TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faHeartCirclePlus,faUsersViewfinder,faClockRotateLeft,faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { SafeArea } from "../components/SafeArea";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons  from 'react-native-vector-icons/Ionicons';
import { History } from "./History";
import { About } from "./About";
import { Theme } from "../utils/theme";
import { db } from "../settings/firebase.setting";
import { collection,getDoc,getDocs,doc,query,orderBy,limit } from "firebase/firestore";
import { numberWithCommas } from "../utils/numberWithCommas";
import { toDateTime } from "../utils/timestampConversion";

const Tab = createBottomTabNavigator();

function Home ({navigation}) {
  const [appIsReady, setAppIsReady] = useState(false);
  const {uid} = useContext(AppContext);
  const [userRecords,setUserRecords] = useState(undefined);
  const [donations,setDonations] = useState([]);

//get all donations by the most recent, limit to 20 objects
const handleGetDonations = async () => {
  const donationsRef = collection(db,'donations');
  const q = query(donationsRef,orderBy('createdAt','desc'),limit(20));

  const querySnap = await getDocs(q);
  setDonations(querySnap.docs.map(doc => {
      return {
          id:doc.id,
          data:{...doc.data()}
      }
  }))
}
handleGetDonations();

  //fetch data after component is loaded
  useEffect(() => {
    const handleGetUserRecords = async () => {
      const snapShot = await getDoc(doc(db,'users',uid));
      setUserRecords(snapShot.data());
    }
    handleGetUserRecords();
  },[]);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({Pacifico_400Regular});
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
  
    prepare();
  }, []);
    
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <SafeArea>
      <View style={styles.header} >
        <Text style={{
          fontSize:28,
          fontFamily:'Pacifico_400Regular',
        }}>Charity App</Text>

        <View style={styles.headerRight}>
          <TouchableOpacity onPress={() => navigation.navigate(userRecords == undefined ? 'Create Profile' : 'Profile')}>
            <FontAwesomeIcon icon={faUser} color={Theme.colors.gray400} size={30}/>
          </TouchableOpacity>
{/* 
          <TouchableOpacity onPress={handleSignOut}>
            <FontAwesomeIcon icon={faSignOut} color={Theme.colors.gray400} size={30}/>
          </TouchableOpacity> */}
        </View>
      </View>

      <View style={styles.body}>
        <View style={styles.actionBlock}> 
          <TouchableOpacity style={styles.actionBox} 
          onPress={() => navigation.navigate('Profile')}>
            <FontAwesomeIcon 
            icon={faHeartCirclePlus} 
            color={Theme.colors.lime100}
            size={Theme.sizes[5]}/>
            <Text style={styles.optionText}>Donate</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionBox} 
          onPress={() => navigation.navigate('Fund Raisers')}>
            <FontAwesomeIcon 
            icon={faUsersViewfinder} 
            color={Theme.colors.lime100}
            size={Theme.sizes[5]}/>
            <Text style={styles.optionText}>Raisers</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={() => navigation.navigate('History')}
          style={styles.actionBox}>
            <FontAwesomeIcon 
            icon={faClockRotateLeft} 
            color={Theme.colors.lime100}
            size={Theme.sizes[5]}/>
            <Text style={styles.optionText}>History</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          style={styles.actionBox}
          onPress={() => navigation.navigate('Create')}>
            <FontAwesomeIcon 
            icon={faCirclePlus} 
            color={Theme.colors.lime100}
            size={Theme.sizes[5]}/>
            <Text style={styles.optionText}>Create</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recent}>
          <Text style={styles.recentTitle}>Recent donations</Text>

          <View style={styles.recentScroll}>
            <FlatList 
            data={donations}
            renderItem={({item}) => {
              return (
                <View style={styles.recentBlock}>
                  <View style={styles.donationDetails}>
                    <Text style={styles.donationAmount}>₦{numberWithCommas(item.data.amount)}</Text>
                    <Text style={styles.donationInfo}>{toDateTime(item.data.createdAt)}</Text>
                  </View>
    
                  <Text style={styles.donatedBy}>Donated by {item.data.donatedByEmail}</Text>
                </View>
              )
            }}
            key={({item}) => item.id}
            showsVerticalScrollIndicator={false}/>
          </View>
        </View>
      </View>
    </SafeArea>
  )
}

export function MyHome ({navigation}) { 

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'heart-circle-sharp' : 'heart-circle-outline';
          } else if (route.name === 'About') {
            iconName = focused ? 'information-circle' : 'information-circle-outline';
          }
          
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: Theme.colors.lime400,
        tabBarInactiveTintColor: Theme.colors.gray400,
      })}
    >
      <Tab.Screen name="Home" component={Home} options={{headerShown:false}}/>
      <Tab.Screen name="History" component={History} options={{headerShown:true}}/>
      <Tab.Screen name="About" component={About} options={{headerShown:false}}/>
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    justifyContent:'space-between',
  },
  headerRight:{
    flexDirection:'row',
    gap:26,
  },
  headerIcon:{
    width:48,
    height:48
  },
  optionText:{
    fontSize:26,
    color:'white',
    fontWeight:'bold'
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
  },
  recent:{
    flex:3.5,
    marginTop:16,
    marginBottom:6,
    padding:8,
    borderRadius:8,
    backgroundColor:Theme.colors.gray100,
  },
  actionBox:{
    width:'49%',
    height:'49%',
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:Theme.colors.gray400,
    borderRadius:10,
  },
  recentTitle:{
    fontSize:22,
    color:'white',
    marginBottom:6
  },
  recentBlock:{
    backgroundColor:Theme.colors.gray400,
    paddingHorizontal:6,
    paddingVertical:8,
    gap:4,
    borderRadius:8,
    marginBottom:3
  },
  recentScroll:{
    flex:1,
    flexDirection:'column',
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
    color:Theme.colors.lime100
  },
  donatedBy:{
    color:Theme.colors.lime100,
    fontSize:16
  }
})