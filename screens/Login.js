import { useState,useEffect,useCallback,useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { View,TouchableOpacity,Text,StyleSheet,Alert} from "react-native";
import { Theme } from '../utils/theme';
import { SafeArea } from "../components/SafeArea";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { TextInput,Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { auth } from "../settings/firebase.setting";
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';
import { UseActivityIndicator } from "../components/ActivityIndicator";

const validationRules = yup.object({
  email:yup.string().required('you must fill this field').min(5).max(36),
  password:yup.string().required()
});

export function Login ({navigation}) {
  const {setUid} = useContext(AppContext);
  const [appIsReady, setAppIsReady] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

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

return(
  <SafeArea>
    <UseActivityIndicator bool={modalVisible}/>

    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Charity App</Text>
        <Text style={styles.text}>Login to an existing account</Text>
      </View>

      <Formik
        initialValues={{ email: '',password:'' }}
        onSubmit={(values,action) => {
          setModalVisible(true);//start activiyIndicator

          signInWithEmailAndPassword(auth,values.email,values.password)
          .then(() => onAuthStateChanged(auth,(user) => {
            setModalVisible(false);//stop activiyIndicator
            setUid(user.uid);//update the user uid on global variables
            navigation.navigate('My Home');//redirect
          }))
          .catch((error) => {
            setModalVisible(false);//stop activiyIndicator
            console.log(error.code);
            //custom actions for different errors
            if (error.code == 'auth/invalid-email'){
              Alert.alert(
                'Message',
                'Invalid email! Try again.',
                [{text:'Try again'}]
              )
            } else if (error.code == 'auth/wrong-password' || error.code == 'auth/user-not-found') {
              Alert.alert(
                'Message',
                'Incorrect email or password',
                [{text:'Try again'}]
              )
            } else {
              Alert.alert(
                'Message',
                'Something went wrong',
                [{text:'Dismiss'}]
              )
            }
          })
        }}

        validationSchema={validationRules}
      >
          {({ handleChange, handleBlur, handleSubmit, values,errors,touched }) => (
            <View style={styles.formWrapper}>
              <View>
                <TextInput
                  style={{width:'100%'}}
                  outlineColor={Theme.colors.gray100}
                  activeOutlineColor={Theme.colors.gray200}
                  mode="outlined"
                  label='email'
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email} 
                />
                {touched.email && errors.email 
                ? <Text style={{color:'red'}}>{errors.email}</Text> 
                : null}
              </View>
            
              <TextInput
                outlineColor={Theme.colors.gray100}
                activeOutlineColor={Theme.colors.gray200}
                mode="outlined"
                label='password'
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              
              <Button
              buttonColor={Theme.colors.gray200}
              mode="contained"
              onPress={handleSubmit}
              contentStyle={{paddingVertical:6,}}
              style={{borderRadius:6}}>Sign in</Button>
            </View>
          )}
        </Formik>
        
        <View style={styles.row}>
            <Text style={styles.text}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={styles.sign}>Sign up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  )
}

const styles = StyleSheet.create({
  container:{ 
    flex:1,
    alignItems:'center',
    gap:40,
  },
  header:{
    justifyContent:'center',
    alignItems:'center',
    gap:16,
    marginTop:20,
  },
  title:{
    fontSize:35,
    fontFamily:'Pacifico_400Regular'
  },
  formWrapper:{
    width:'100%',
    flexDirection:'column',
    gap:16
  },
  row:{
    flexDirection:'row'
  },
  text:{
    fontSize:20
  },
  sign:{
    fontSize:20,
    color:Theme.colors.blue400
  },
})