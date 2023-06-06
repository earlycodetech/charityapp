import { useState,useEffect,useCallback,useContext } from "react";
import { AppContext } from "../settings/globalVariables";
import { View,TouchableOpacity,Text,StyleSheet,Alert} from "react-native";
import { SafeArea } from "../components/SafeArea";
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { Pacifico_400Regular } from "@expo-google-fonts/pacifico";
import { TextInput,Button } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import { auth } from "../settings/firebase.setting";
import { signInWithEmailAndPassword,onAuthStateChanged } from 'firebase/auth';

const validationRules = yup.object({
  email:yup.string().required('you must fill this field').min(5).max(36),
  password:yup.string().required()
});

export function Login ({navigation}) {
  const {setUid} = useContext(AppContext);
  const [appIsReady, setAppIsReady] = useState(false);

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
    <View style={style.heading}>
      <Text style={style.title}>Charity App</Text>
      <Text style={style.title2}>Login to an existing account</Text>
      
      <Formik
        initialValues={{ email: '',password:'' }}
        onSubmit={(values,action) => {
          signInWithEmailAndPassword(auth,values.email,values.password)
          .then(() => onAuthStateChanged(auth,(user) => {
            setUid(user.uid);//update the user uid on global variables
            navigation.navigate('My Home');//redirect
          }))
          .catch((error) => {
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
            <View>
              <View>
                <TextInput
                  outlineColor="hotpink"
                  mode="outlined"
                  label='email'
                  style={style.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email} 
                />
                {touched.email && errors.email 
                ? <Text style={{color:'red'}}>{errors.email}</Text> 
                : null}
              </View>
            
              <TextInput
                outlineColor="hotpink"
                mode="outlined"
                label='password'
                style={style.input}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                value={values.password}
                secureTextEntry={true}
              />
              
              <Button
              buttonColor="hotpink"
              mode="contained"
              onPress={handleSubmit}
              contentStyle={{paddingVertical:6}}
              style={{marginVertical:12}}>Sign in</Button>
            </View>
          )}
        </Formik>
        <View style={style.account}>
            <Text >Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text style={style.sign}>Sign up</Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeArea>
  )
}

const style = StyleSheet.create({
    heading:{ 
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        marginBottom:280
        },
    title:{
        fontSize:35,
        fontFamily:'Pacifico_400Regular'
         },
    title2:{
        marginTop:15
    },
    input:{
        marginTop:15,
        width:300,
    },
    account:{
      flexDirection:'row'
    },
    sign:{
      color:'blue'
    },
})

//validation:a set rules for controlling form inputs
//height 