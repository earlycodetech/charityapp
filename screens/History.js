import { useState,useEffect,useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { View,Text,StyleSheet,FlatList } from "react-native";
import { SafeArea } from "../components/SafeArea";
import { db } from "../settings/firebase.setting";
import { getDocs,collection,query,where,orderBy } from "firebase/firestore";
import { numberWithCommas } from "../utils/numberWithCommas";
import { toDateTime } from "../utils/timestampConversion";
import { Theme } from "../utils/theme";

export function History ({navigation}) {
    const {uid} = useContext(AppContext);
    const [donations,setDonations] = useState([]);

    //get all donations made by a specific user
    const handleGetDonations = async () => {
        const donationsRef = collection(db,'donations');
        const q = query(donationsRef,where('donatedByUid','==',uid));

        const querySnap = await getDocs(q);
        setDonations(querySnap.docs.map(doc => {
            return {
                id:doc.id,
                data:{...doc.data()}
            }
        }))
    }
    handleGetDonations();

    return (
        <SafeArea>
            <View style={styles.body}>
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
                
                            <Text style={styles.donatedBy}>{item.data.project}</Text>
                        </View>
                    )
                    }}
                    key={({item}) => item.id}
                    showsVerticalScrollIndicator={false}/>
                </View>
            </View>
        </SafeArea>
    )
}

const styles = StyleSheet.create({
  body:{
    flex:1,
    marginTop:10
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
    color:Theme.colors.lime400
  },
  donatedBy:{
    color:Theme.colors.lime100,
    fontSize:18
  }
})